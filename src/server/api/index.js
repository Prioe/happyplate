export const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply({ response: 'Welcome the the REST API!' })
  });

  next();
};

exports.register.attributes = {
  name: 'index'
};
