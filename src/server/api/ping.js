export const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/ping',
    handler: (request, reply) => reply({ serverTime: Date.now() })
  });

  next();
};

exports.register.attributes = {
  name: 'ping'
};
