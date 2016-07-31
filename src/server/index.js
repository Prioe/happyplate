import glue from 'glue';
import manifest from './manifest';

const composeOptions = {
  relativeTo: __dirname
};

module.exports = glue.compose.bind(glue, manifest.get('/'), composeOptions);
