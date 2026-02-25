const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CopyRspackPlugin, BannerPlugin } = require('@rspack/core');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const outputDir = isProduction ? path.resolve(__dirname, 'docs') : path.resolve(__dirname, 'dist');
  
  return {
    entry: {
      plugin: './src/plugin.js',              // TinyMCE plugin (JS only)
      'vr-runtime': './src/vr-runtime.js',   // Frontend runtime (JS + CSS bundled)
      demo: './src/demo.js'
    },
    
    output: {
      path: outputDir,
      filename: isProduction ? '[name].min.js' : '[name].js',
      clean: true,
      publicPath: '/'
    },
    
    externals: {
      tinymce: 'tinymce'
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
      }),
      // Copy CSS file directly for easy use
      new CopyRspackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'node_modules/tinymce/skins'),
            to: path.resolve(outputDir, 'skins')
          },
          {
            from: path.resolve(__dirname, 'src/vr-button.css'),
            to: path.resolve(outputDir, isProduction ? 'vr-button.min.css' : 'vr-button.css')
          },
          {
            from: path.resolve(__dirname, 'src/vr-button.css'),
            to: path.resolve(outputDir, 'vr-button.css')
          }
        ]
      }),
      // Add banner to plugin file
      new BannerPlugin({
        banner: 'TinyMCE VR Button Plugin v1.0.0 | MIT License | github.com/MMHK/tinymce-VR-button',
        include: /plugin\.(min\.)?js$/
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
      port: 3030,
      hot: true,
      open: true,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true
      },
      hot: false,
      open: false
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
