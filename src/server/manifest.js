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
  registrations: [
    {
      plugin: 'vision'
    },
    {
      plugin: {
        register: 'visionary',
        options: {
          engines: { jade: 'jade' },
          path: './views'
        }
      }
    },
    {
      plugin: './routes/index'
    }
  ]
};

const store = new confidence.Store(manifest);

exports.get = (key) => store.get(key, criteria);
exports.meta = (key) => store.meta(key, criteria);
