(function() {
  'use strict';

  // Set theme immediately to prevent flash
  var theme = localStorage.getItem('theme');
  if (!theme) {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);

  // Attach click handler when DOM is ready
  function initToggle() {
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        try {
          localStorage.setItem('theme', newTheme);
        } catch (e) {}
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }
})();
