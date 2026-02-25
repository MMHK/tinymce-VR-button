/**
 * TinyMCE 4 VR Button Plugin for 720yun.com
 * Version: 1.0.0
 * Author: MMHK
 */

(function() {
    'use strict';

    tinymce.PluginManager.add('vrbutton', function(editor, url) {
        // SVG VR Icon
        var vrIconSvg = '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';

        // VR Container Icon SVG
        var vrContainerIcon = '<svg viewBox="0 0 64 64" class="vr-360-icon"><circle cx="32" cy="32" r="30" fill="#2196F3"/><text x="32" y="38" text-anchor="middle" fill="white" font-size="14" font-weight="bold">VR 360</text></svg>';

        // Check if mobile
        function isMobile() {
            return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // Validate 720yun URL
        function isValid720yunUrl(url) {
            return /^https?:\/\/720yun\.com\/t\/[a-zA-Z0-9]+/.test(url);
        }

        // Open VR view
        function openVRView(vrUrl, targetElement) {
            if (isMobile()) {
                // Mobile: open in new window
                window.open(vrUrl, '_blank');
            } else {
                // Desktop: inline overlay
                showInlineVR(vrUrl, targetElement);
            }
        }

        // Show inline VR overlay
        function showInlineVR(vrUrl, targetElement) {
            // Remove existing overlay
            var existingOverlay = document.querySelector('.vr-360-overlay');
            if (existingOverlay) {
                existingOverlay.remove();
            }

            // Create overlay
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

            // Close button event
            overlay.querySelector('.vr-360-overlay-close').addEventListener('click', function() {
                overlay.remove();
            });

            // Backdrop click to close
            overlay.querySelector('.vr-360-overlay-backdrop').addEventListener('click', function() {
                overlay.remove();
            });

            // ESC key to close
            function onKeyDown(e) {
                if (e.key === 'Escape') {
                    overlay.remove();
                    document.removeEventListener('keydown', onKeyDown);
                }
            }
            document.addEventListener('keydown', onKeyDown);
        }

        // Add button to toolbar
        editor.addButton('vrbutton', {
            text: '',
            icon: false,
            image: url + '/img/vr-icon.png',
            tooltip: 'Insert VR 360 Link',
            onclick: function() {
                editor.windowManager.open({
                    title: 'Insert VR 360 Link',
                    body: [
                        {
                            type: 'textbox',
                            name: 'vrurl',
                            label: '720yun URL',
                            value: '',
                            placeholder: 'https://720yun.com/t/xxxxx'
                        }
                    ],
                    onsubmit: function(e) {
                        var vrUrl = e.data.vrurl.trim();
                        
                        if (!vrUrl) {
                            editor.windowManager.alert('Please enter a VR URL');
                            return false;
                        }

                        if (!isValid720yunUrl(vrUrl)) {
                            editor.windowManager.alert('Please enter a valid 720yun URL (e.g., https://720yun.com/t/xxxxx)');
                            return false;
                        }

                        // Insert placeholder
                        var placeholderHtml = 
                            '<span class="vr-360-container mceNonEditable" contenteditable="false" data-vr-url="' + tinymce.DOM.encode(vrUrl) + '">' +
                                vrContainerIcon +
                                '<span class="vr-360-label">VR 360°</span>' +
                            '</span>&nbsp;';

                        editor.insertContent(placeholderHtml);
                    }
                });
            }
        });

        // Handle click on VR containers (event delegation)
        editor.on('click', function(e) {
            var target = e.target;
            
            // Find closest VR container
            var container = target.closest ? target.closest('.vr-360-container') : null;
            if (!container) {
                // Try parent for SVG elements
                var parent = target.parentElement;
                if (parent) {
                    container = parent.closest ? parent.closest('.vr-360-container') : null;
                }
            }

            if (container) {
                e.preventDefault();
                e.stopPropagation();
                
                var vrUrl = container.getAttribute('data-vr-url');
                if (vrUrl) {
                    openVRView(vrUrl, container);
                }
            }
        });

        // Add context menu item (optional)
        editor.addMenuItem('vrbutton', {
            text: 'Edit VR Link',
            icon: false,
            onclick: function() {
                var node = editor.selection.getNode();
                var container = node.closest ? node.closest('.vr-360-container') : null;
                
                if (container) {
                    var currentUrl = container.getAttribute('data-vr-url') || '';
                    
                    editor.windowManager.open({
                        title: 'Edit VR 360 Link',
                        body: [
                            {
                                type: 'textbox',
                                name: 'vrurl',
                                label: '720yun URL',
                                value: currentUrl
                            }
                        ],
                        onsubmit: function(e) {
                            var vrUrl = e.data.vrurl.trim();
                            
                            if (!vrUrl || !isValid720yunUrl(vrUrl)) {
                                editor.windowManager.alert('Please enter a valid 720yun URL');
                                return false;
                            }

                            container.setAttribute('data-vr-url', vrUrl);
                        }
                    });
                }
            },
            context: 'insert',
            prependToContext: true
        });

        // Content CSS for editor
        editor.on('init', function() {
            // Add custom styles to editor
            var style = document.createElement('style');
            style.innerHTML = 
                '.vr-360-container { ' +
                    'display: inline-flex; ' +
                    'align-items: center; ' +
                    'gap: 8px; ' +
                    'padding: 8px 12px; ' +
                    'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); ' +
                    'border-radius: 8px; ' +
                    'cursor: pointer; ' +
                    'color: white; ' +
                    'font-family: Arial, sans-serif; ' +
                    'font-size: 14px; ' +
                    'transition: transform 0.2s, box-shadow 0.2s; ' +
                    'user-select: none; ' +
                '}' +
                '.vr-360-container:hover { ' +
                    'transform: translateY(-2px); ' +
                    'box-shadow: 0 4px 12px rgba(0,0,0,0.3); ' +
                '}' +
                '.vr-360-container svg { ' +
                    'width: 24px; ' +
                    'height: 24px; ' +
                    'fill: currentColor; ' +
                '}' +
                '.vr-360-label { ' +
                    'font-weight: bold; ' +
                '}';
            
            editor.getDoc().head.appendChild(style);
        });

        // Prevent editing of VR containers
        editor.on('ObjectSelected', function(e) {
            var target = e.target;
            if (target && target.classList && target.classList.contains('vr-360-container')) {
                e.preventDefault();
            }
        });

        // Return plugin info
        return {
            getMetadata: function() {
                return {
                    name: 'VR Button',
                    url: 'https://github.com/MMHK/tinymce-VR-button',
                    version: '1.0.0'
                };
            }
        };
    });
})();
