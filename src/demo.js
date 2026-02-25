// Demo entry point for TinyMCE VR Button Plugin
import './vr-button.css';

// TinyMCE is loaded from CDN in index.html
// VR Button plugin is auto-registered when imported
import './plugin';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize TinyMCE with VR Button plugin
    tinymce.init({
        selector: '#tinymce-editor',
        height: 500,
        theme: 'modern',
        plugins: [
            'vrbutton',
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste'
        ],
        toolbar: 'vrbutton | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        setup: function(editor) {
            // Update preview on content change
            editor.on('change keyup SetContent', function() {
                updatePreview(editor.getContent());
            });
            
            // Initial preview after editor init
            editor.on('init', function() {
                updatePreview(editor.getContent());
            });
        }
    });
    
    function updatePreview(content) {
        const previewEl = document.getElementById('preview');
        if (previewEl) {
            previewEl.innerHTML = content;
            
            // Add click handlers to VR containers in preview
            const containers = previewEl.querySelectorAll('.vr-360-container');
            containers.forEach(function(container) {
                container.addEventListener('click', function(e) {
                    e.preventDefault();
                    const vrUrl = container.getAttribute('data-vr-url');
                    if (vrUrl) {
                        // Same logic as in plugin
                        if (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            window.open(vrUrl, '_blank');
                        } else {
                            showInlineVR(vrUrl);
                        }
                    }
                });
            });
        }
    }
    
    // Inline VR overlay function for preview
    function showInlineVR(vrUrl) {
        var existingOverlay = document.querySelector('.vr-360-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        var overlay = document.createElement('div');
        overlay.className = 'vr-360-overlay';
        overlay.innerHTML = 
            '<div class="vr-360-overlay-backdrop"></div>' +
            '<div class="vr-360-overlay-content">' +
                '<div class="vr-360-overlay-header">' +
                    '<span class="vr-360-overlay-title">VR 360 View</span>' +
                    '<button class="vr-360-overlay-close" title="Close">&times;</button>' +
                '</div>' +
                '<div class="vr-360-overlay-body">' +
                    '<iframe src="' + vrUrl + '" frameborder="0" allowfullscreen></iframe>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);

        overlay.querySelector('.vr-360-overlay-close').addEventListener('click', function() {
            overlay.remove();
        });

        overlay.querySelector('.vr-360-overlay-backdrop').addEventListener('click', function() {
            overlay.remove();
        });

        function onKeyDown(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', onKeyDown);
            }
        }
        document.addEventListener('keydown', onKeyDown);
    }
});
