/*
 * Load the polyfills in here. All Modernizr test references (https://modernizr.com/download/) can be used.
 * This file will be crawled by customizr in the modernizr-gulp task and the correct modernizr build will
 * be used.
 */
Modernizr.addTest('hasJquery', 'jQuery' in window);

if (!Modernizr.cssremunit) {
  document.write('<script src="/vendor/rem-unit-polyfill/rem.min.js"><\/script>');
}

if (!Modernizr.hasjquery) {
  console.warn('no response from google cdn. falling back to local jquery');
  document.write('<script src="/vendor/jquery/jquery.min.js"><\/script>');
}
