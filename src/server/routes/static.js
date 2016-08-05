export const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: options.path
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'static',
  dependencies: 'inert'
};
