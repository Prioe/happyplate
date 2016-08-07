const jQueryNamespace = $ => {

  /* Our jQuery namespace */
  $('#api-consumer-ping').on('click', event => {

    const $input = $('#api-consumer-input');
    const message = $input.val();
    if (message === '') {
      $input.addClass('required');
    }
    else {
      $input.removeClass('required');
      let beforeTime;
      $.ajax({
        url: '/api/ping',
        data: { message },
        beforeSend: () => {
          beforeTime = Date.now();
        },
        success: result => {
          const $response = $('<div></div>')
            .addClass('home__api-response')
            .append(`<h5>${result.message}</h5>`)
            .append(`<h4>${Date.now() - beforeTime}ms</h4>`);
          $('#api-results').append($response);
        }
      });
    }
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
