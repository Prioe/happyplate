import { join } from 'path';
import _ from 'lodash';
import * as pkg from './package';

const paths = {
  root: {
    dist: 'dist'
  },
  mocha: {
    root: 'test',
    tests: 'test/entry.js',
    coverage: ['src/server/**/*.js']
  },
  tasks: [
    'gulp/tasks'
  ],
  eslint: {
    source: [
      'gulpfile.babel.js',
      'gulp.config.js',
      'gulp/**/*.js',
      'test/**/*.js',
      'src/server/**/*.js',
      'src/assets/scripts/**/*.js'
    ]
  },
  assets: {
    scripts: {
      source: ['src/assets/scripts/**/*.js'],
      target: 'dist/public/js'
    },
    styles: {
      watchable: 'src/assets/styles/**/*.scss',
      source: 'src/assets/styles/main.scss',
      target: 'dist/public/css'
    },
    static: {
      source: 'src/assets/static/**/*',
      target: 'dist/public'
    },
    jade: {
      source: 'src/assets/jade/**/*.jade',
      target: 'dist'
    },
    server: {
      source: 'src/server/**/*.js',
      target: 'dist',
      includes: {
        target: 'dist/includes'
      }
    },
    favicon: {
      source: ['src/assets/img/favicon.png'],
      target: 'dist/public/favicons',
      inject: {
        target: ['src/assets/jade/**/*.jade']
      }
    },
    modernizr: {
      source: ['src/assets/**/*.@(js|?(s)css|jade)'],
      target: 'dist/public/js'
    }
  },
  dependencies: {
    normalize: {
      source: 'node_modules/normalize.css/normalize.css',
      target: 'dist/public/vendor/normalize'
    },
    remUnitPolyfill: {
      source: '/node_modules/rem-unit-polyfill/js/rem.js',
      target: 'dist/public/vendor/rem-unit-polyfill'
    },
    jquery: {
      source: [
        '/node_modules/jquery/dist/jquery.min.js',
        '/node_modules/jquery/dist/jquery.min.map'
      ],
      target: 'dist/public/vendor/jquery'
    }
  },
  server: {
    cwd: 'dist'
  },
  browserSync: {
    server: 'src/server/**/*',
    assets: 'src/assets/**/*'
  },
  _test: {
    source: '!src/_test'
  }
};

const config = {
  browserSync: {
    config: {
      proxy: 'localhost:8000'
    }
  },
  concatenadedFileName: 'all',
  headers: {
    full: [
      '/*!',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      '*/'
    ].join('\n'),
    short: [
      '/*! <%= pkg.name %> v<%= pkg.version %> |',
      '<%= pkg.license %> License |',
      '<%= pkg.homepage %> */'
    ].join(' ')
  },
  faviconsOptions: {
    appName: pkg.name,
    appDescription: pkg.description,
    developerName: pkg.author.name,
    developerURL: pkg.author.url,
    background: '#020307',
    path: '/favicons/',
    url: pkg.url,
    display: 'standalone',
    orientation: 'portrait',
    version: pkg.version,
    logging: true,
    online: false,
    html: 'favicons.html',
    pipeHTML: true,
    replace: true
  },
  modernizrOptions: {
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind',
      'testStyles'
    ]
  }
};

{
  const { deepMapValues } = _.mixin(require('lodash-deep'));
  config.paths = deepMapValues(paths, value => join(__dirname, value));
  config.package = pkg;
  config.env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : '';
}

export const get = (...keys) => {
  if (keys.length === 1) {
    return _.get(config, keys[0]);
  }

  const obj = {};
  keys.map((key) => {
    obj[key.match(/\.{0,1}([\w-_]+)$/)[1]] = get(key);
  });
  return obj;
};
