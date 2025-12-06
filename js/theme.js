// Auto-detect and apply user's system appearance preference
(function() {
    'use strict';

    // Function to apply theme
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Function to get system theme preference
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Initialize theme based on system preference or saved preference
    function initTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Use saved preference
            applyTheme(savedTheme);
        } else {
            // Auto-detect system preference
            const systemTheme = getSystemTheme();
            applyTheme(systemTheme);
        }
    }

    // Listen for system theme changes and update automatically
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Add listener for theme changes (modern browsers)
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', (e) => {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        } else if (darkModeQuery.addListener) {
            // Fallback for older browsers
            darkModeQuery.addListener((e) => {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        }
    }

    // Initialize on page load
    initTheme();
})();
