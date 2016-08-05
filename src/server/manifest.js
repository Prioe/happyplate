import confidence from 'confidence';
import * as config from './config';

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'This file defines the plot device.',
  server: {
    debug: {
      request: ['error']
    },
    connections: {
      routes: {
        security: true
      }
    }
  },
  connections: [{
    port: config.get('/port/web'),
    labels: ['web']
  }],
  registrations: [{
    plugin: 'inert'
  }, {
    plugin: 'vision'
  }, {
    plugin: {
      register: 'visionary',
      options: {
        engines: {
          jade: 'jade'
        },
        path: './views',
        context: {
          env: process.env.NODE_ENV
        }
      }
    }
  }, {
    plugin: {
      register: 'good',
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              log: '*',
              response: '*'
            }]
          }, {
            module: 'good-console',
            args: [{
              format: 'MM.DD.YY HH:mm:ss.SSS'
            }]
          }, 'stdout']
        }
      }
    }
  }, {
    plugin: './routes/index'
  }, {
    plugin: {
      register: './routes/static',
      options: {
        path: './public'
      }
    }
  }]
};

const store = new confidence.Store(manifest);

exports.get = (key) => store.get(key, criteria);
exports.meta = (key) => store.meta(key, criteria);
