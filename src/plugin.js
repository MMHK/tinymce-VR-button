/**
 * TinyMCE 4 VR Button Plugin for 720yun.com
 * Version: 1.0.0
 * Author: MMHK
 * 
 * This plugin adds a VR 360° button to TinyMCE toolbar for inserting 720yun.com links.
 * Desktop: Opens inline iframe overlay (800x600)
 * Mobile: Opens in new window
 * 
 * CSS is bundled - no separate CSS file needed for the popup overlay styles.
 */

// Import CSS for popup overlay (injected into page automatically)
import './vr-button.css';

(function(tinymce) {
    'use strict';

    if (!tinymce) {
        console.error('TinyMCE is required for vrbutton plugin');
        return;
    }

    tinymce.PluginManager.add('vrbutton', function(editor, url) {
        // VR Container Icon SVG
        var vrContainerIcon = '<svg viewBox="0 0 64 64" class="vr-360-icon" xmlns="http://www.w3.org/2000/svg">' +
            '<circle cx="32" cy="32" r="30" fill="#1890ff"/>' +
            '</svg>';

        /**
         * Check if current device is mobile
         * @returns {boolean}
         */
        function isMobile() {
            return window.innerWidth < 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        /**
         * Validate 720yun.com URL format
         * @param {string} url - URL to validate
         * @returns {boolean}
         */
        function isValid720yunUrl(url) {
            return /^https?:\/\/(www\.)?720yun\.com\/t\/[a-zA-Z0-9]+/.test(url);
        }

        /**
         * Open VR view based on device type
         * @param {string} vrUrl - The VR URL to open
         * @param {HTMLElement} targetElement - The clicked element
         */
        function openVRView(vrUrl, targetElement) {
            if (isMobile()) {
                window.open(vrUrl, '_blank');
            } else {
                showInlineVR(vrUrl);
            }
        }

        /**
         * Show inline VR overlay for desktop
         * @param {string} vrUrl - The VR URL to display
         */
        function showInlineVR(vrUrl) {
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
                        '<span class="vr-360-overlay-title">360° View</span>' +
                        '<button class="vr-360-overlay-close" title="Close" type="button">&times;</button>' +
                    '</div>' +
                    '<div class="vr-360-overlay-body">' +
                        '<iframe src="' + encodeURI(vrUrl) + '" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
                    '</div>' +
                '</div>';

            document.body.appendChild(overlay);

            // Event listeners
            overlay.querySelector('.vr-360-overlay-close').addEventListener('click', function() {
                overlay.remove();
            });

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

        /**
         * Show dialog to insert/edit VR link
         * @param {string} currentUrl - Current URL for edit mode (optional)
         * @param {Function} callback - Callback with new URL
         */
        function showVRDialog(currentUrl, callback) {
            editor.windowManager.open({
                title: currentUrl ? 'Edit 360° Link' : 'Insert 360° Link',
                body: [
                    {
                        type: 'container',
                        html: '<p style="margin: 0 0 10px 0; color: #666;">Enter your 720yun.com VR link below:</p>'
                    },
                    {
                        type: 'textbox',
                        name: 'vrurl',
                        label: '720yun URL',
                        value: currentUrl || '',
                        placeholder: 'https://720yun.com/t/xxxxx',
                        autofocus: true
                    }
                ],
                onsubmit: function(e) {
                    var vrUrl = e.data.vrurl.trim();
                    
                    if (!vrUrl) {
                        editor.windowManager.alert('Please enter a VR URL');
                        return false;
                    }

                    if (!isValid720yunUrl(vrUrl)) {
                        editor.windowManager.alert(
                            'Invalid URL format.\n\nPlease use:\nhttps://720yun.com/t/xxxxx'
                        );
                        return false;
                    }

                    callback(vrUrl);
                }
            });
        }

        /**
         * Insert VR placeholder into editor
         * @param {string} vrUrl - The VR URL
         */
        function insertVRPlaceholder(vrUrl) {
            var placeholderHtml = 
                '<span class="vr-360-container mceNonEditable" contenteditable="false" data-vr-url="' + tinymce.DOM.encode(vrUrl) + '">' +
                    vrContainerIcon +
                    '<span class="vr-360-label">360°</span>' +
                '</span>&nbsp;';

            editor.insertContent(placeholderHtml);
        }

        // Add button to toolbar
        editor.addButton('vrbutton', {
            icon: false,
            text: '360°',
            tooltip: 'Insert 360° Link',
            onclick: function() {
                showVRDialog(null, insertVRPlaceholder);
            }
        });

        // Add menu item
        editor.addMenuItem('vrbutton', {
            text: '360° Link',
            icon: false,
            context: 'insert',
            onclick: function() {
                showVRDialog(null, insertVRPlaceholder);
            }
        });

        // Handle clicks on VR containers
        editor.on('click', function(e) {
            var target = e.target;
            var container = null;
            
            // Find VR container
            if (target.closest) {
                container = target.closest('.vr-360-container');
            }
            
            // Fallback for SVG elements
            if (!container && target.parentElement) {
                var parent = target.parentElement;
                if (parent.closest) {
                    container = parent.closest('.vr-360-container');
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

        // Handle double-click to edit
        editor.on('dblclick', function(e) {
            var target = e.target;
            var container = null;
            
            if (target.closest) {
                container = target.closest('.vr-360-container');
            }
            
            if (!container && target.parentElement) {
                var parent = target.parentElement;
                if (parent.closest) {
                    container = parent.closest('.vr-360-container');
                }
            }

            if (container) {
                e.preventDefault();
                e.stopPropagation();
                
                var currentUrl = container.getAttribute('data-vr-url') || '';
                showVRDialog(currentUrl, function(newUrl) {
                    container.setAttribute('data-vr-url', newUrl);
                });
            }
        });

        // Add context toolbar for editing (TinyMCE 4.2+)
        if (editor.addContextToolbar) {
            editor.addContextToolbar(function(element) {
                return editor.dom.is(element, '.vr-360-container');
            }, 'vrbutton_edit | remove');

            editor.addButton('vrbutton_edit', {
                icon: 'edit',
                tooltip: 'Edit VR Link',
                onclick: function() {
                    var node = editor.selection.getNode();
                    var container = null;
                    
                    if (node.closest) {
                        container = node.closest('.vr-360-container');
                    }
                    
                    if (container) {
                        var currentUrl = container.getAttribute('data-vr-url') || '';
                        showVRDialog(currentUrl, function(newUrl) {
                            container.setAttribute('data-vr-url', newUrl);
                        });
                    }
                }
            });
        }

        // Inject CSS into editor iframe
        editor.on('init', function() {
            var style = document.createElement('style');
            style.innerHTML = 
                '.vr-360-container { ' +
                    'display: inline-flex !important; ' +
                    'align-items: center; ' +
                    'gap: 8px; ' +
                    'padding: 8px 12px; ' +
                    'background: linear-gradient(135deg, #1890ff 0%, #0050b3 100%); ' +
                    'border-radius: 8px; ' +
                    'cursor: pointer; ' +
                    'color: white; ' +
                    'font-family: Arial, sans-serif; ' +
                    'font-size: 14px; ' +
                    'transition: transform 0.2s, box-shadow 0.2s; ' +
                    'user-select: none; ' +
                    'border: 2px solid transparent; ' +
                '}' +
                '.vr-360-container:hover { ' +
                    'transform: translateY(-2px); ' +
                    'box-shadow: 0 4px 12px rgba(0,0,0,0.3); ' +
                    'border-color: rgba(255,255,255,0.3); ' +
                '}' +
                '.vr-360-container svg { ' +
                    'width: 24px; ' +
                    'height: 24px; ' +
                    'flex-shrink: 0; ' +
                '}' +
                '.vr-360-label { ' +
                    'font-weight: bold; ' +
                    'white-space: nowrap; ' +
                '}' +
                '.vr-360-icon circle { ' +
                    'fill: #1890ff; ' +
                '}';
            
            editor.getDoc().head.appendChild(style);
        });

        // Prevent editing VR containers directly
        editor.on('ObjectSelected', function(e) {
            if (e.target && e.target.classList && e.target.classList.contains('vr-360-container')) {
                e.preventDefault();
            }
        });

        // Return plugin metadata
        return {
            getMetadata: function() {
                return {
                    name: 'VR Button',
                    url: 'https://github.com/MMHK/tinymce-VR-button',
                    version: '1.0.0',
                    author: 'MMHK'
                };
            }
        };
    });
})(tinymce);
