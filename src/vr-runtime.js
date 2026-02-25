/**
 * TinyMCE VR Button Plugin - Runtime
 * 用於前端展示時處理 VR 按鈕點擊
 * 
 * 包含：JS 邏輯 + CSS 樣式（自動注入）
 */

// 自動注入 CSS
import './vr-button.css';

(function() {
    'use strict';

    // Check if mobile
    function isMobile() {
        return window.innerWidth < 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Show inline VR overlay for desktop
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
                    '<span class="vr-360-overlay-title">VR 360° View</span>' +
                    '<button class="vr-360-overlay-close" title="Close" type="button">&times;</button>' +
                '</div>' +
                '<div class="vr-360-overlay-body">' +
                    '<iframe src="' + encodeURI(vrUrl) + '" frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
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

    // Open VR view
    function openVRView(vrUrl) {
        if (isMobile()) {
            window.open(vrUrl, '_blank');
        } else {
            showInlineVR(vrUrl);
        }
    }

    // Handle click on VR containers
    function handleVRClick(e) {
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
                openVRView(vrUrl);
            }
        }
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('click', handleVRClick);
        });
    } else {
        document.addEventListener('click', handleVRClick);
    }

    // Expose API globally
    window.VRButtonRuntime = {
        openVRView: openVRView,
        showInlineVR: showInlineVR,
        isMobile: isMobile
    };

})();
