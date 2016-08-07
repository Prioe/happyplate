export const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      const uri = request.connection.info.uri;
      reply({
        _links: {
          ping: `${uri}/api/ping`
        }
      });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'index'
};
