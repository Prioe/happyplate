import composer from './index';

composer((err, server) => {

  if (err) {
    throw err;
  }

  server.start(() => {
    console.log('Started the plot device on port ' + server.info.port);
  });
});
