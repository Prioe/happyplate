// Avoid `console` errors in browsers that lack a console.
{
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  const console = (window.console = window.console || {});
  methods.filter(method => !console[method]).map(method => { console[method] = () => {}; });
}

// Place any jQuery/helper plugins in here.
