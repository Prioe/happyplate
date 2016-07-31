import confidence from 'confidence';

const criteria = {
  env: process.env.NODE_ENV
};

const config = {
  $meta: 'This file configures the plot device.',
  projectName: 'prio.one',
  port: {
    web: {
      $filter: 'env',
      test: 9000,
      $default: 8000
    }
  }
};

const store = new confidence.Store(config);

export const get = key => {
  return store.get(key, criteria);
};

export const meta = key => {
  return store.meta(key, criteria);
};
