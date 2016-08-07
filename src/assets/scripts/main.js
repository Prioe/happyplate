const jQueryNamespace = $ => {

  /* Our jQuery namespace */
  $('#api-consumer-ping').on('click', event => {
    $.ajax({
      url: '/api/ping',
      success: result => {
        const $response = $('<div></div>')
          .addClass('home__api-response')
          .append('<h5>Ping</h5>')
          .append(`<h4>${Date.now() - result.serverTime}ms</h4>`);
        $('#api-results').append($response);
      }
    });
    event.preventDefault();
  });

  $('#api-consumer-index').on('click', event => {
    $.ajax({
      url: '/api',
      success: result => {
        const $response = $('<div></div>')
          .addClass('home__api-response')
          .append(`<h5>${result.response}</h5>`);
        $('#api-results').append($response);
      }
    });
    event.preventDefault();
  });

  $('#api-table-reset').on('click', event => {
    $('#api-results').text('');
    event.preventDefault();
  });

};

(init => {
  init(window.jQuery, window, document);
})(($) => {
  $(() => {
    jQueryNamespace($);
  });
});
