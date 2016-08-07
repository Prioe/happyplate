import joi from 'joi';

export const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/ping',
    config: {
      validate: {
        query: {
          message: joi.string().required()
        }
      }
    },
    handler: (request, reply) => {
      const regex = /(\s|^)ping/gi;
      const message = [];
      let matches;
      let lastIndex = 0;
      while ((matches = regex.exec(request.query.message)) !== null) {
        message.push(matches.input.slice(lastIndex, matches.index));
        message.push(matches[0].replace(/i/, 'o').replace(/I/, 'O'));
        lastIndex = matches.index + matches[0].length;
      }
      message.push(request.query.message.slice(lastIndex));
      reply({ message: message.length === 0 ? request.query.message : message.join('') });
    }
  });

  next();
};

exports.register.attributes = {
  name: 'ping'
};
