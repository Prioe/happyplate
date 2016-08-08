/*
 * Load the polyfills and custom Modernizr tests in here. All Modernizr test
 * references (https://modernizr.com/download/) can be used. This file will be
 * crawled by customizr in the modernizr-gulp task and the correct modernizr
 * build will be used.
 */

const loadScript = file => {
  document.write(`<script src="${file}"><\/script>`);
};

// Custom tests
Modernizr.addTest('hasJquery', 'jQuery' in window);

// Load polyfills
if (!Modernizr.cssremunit) {
  loadScript('/vendor/rem-unit-polyfill/rem.min.js');
}

if (!Modernizr.hasjquery) {
  console.warn('no response from google cdn. falling back to local jquery');
  loadScript('/vendor/jquery/jquery.min.js');
}
