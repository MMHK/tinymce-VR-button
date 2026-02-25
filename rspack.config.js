const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      plugin: './src/plugin.js',
      demo: './src/demo.js'
    },
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].min.js' : '[name].js',
      clean: true,
      publicPath: '/'
    },
    
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        chunks: ['demo']
      })
    ],
    
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist')
        },
        {
          directory: path.join(__dirname, 'src'),
          publicPath: '/'
        }
      ],
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true
      }
    },
    
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    resolve: {
      extensions: ['.js', '.json']
    },
    
    optimization: {
      minimize: isProduction
    }
  };
};
