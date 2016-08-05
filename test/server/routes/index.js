import * as config from '../../../src/server/config';
import manifest from '../../../src/server/manifest';
import hapi from 'hapi';
import vision from 'vision';
import visionary from 'visionary';
import chai from 'chai';
import { join } from 'path';

chai.should();
const homePlugin = require('../../../src/server/routes/index');

const visionaryPlugin = {
  register: visionary,
  options: manifest.get('/registrations').filter((reg) => {
    if (reg.plugin &&
      reg.plugin.register &&
      reg.plugin.register === 'visionary') {
      return true;
    }
    return false;
  }).map((reg) => {
    reg.plugin.options.path = join(__dirname, '../../../dist/views');
    return reg;
  })[0].plugin.options
};

let request;
let server;

describe('Server', () => {

  beforeEach(done => {
    const plugins = [vision, visionaryPlugin, homePlugin];
    server = new hapi.Server();
    server.connection({ port: config.get('/port/web') });
    server.register(plugins, (err) => {
      if (err) {
        return done(err);
      }
      server.initialize(done);
      return void 0;
    });
  });

  describe('Home Page View', () => {

    beforeEach(done => {
      request = {
        method: 'GET',
        url: '/'
      };
      done();
    });

    it('should render the home page properly', done => {
      server.inject(request, (response) => {
        console.log(response.result);
        response.result.should.match(/Hidden message for testing! @index ~/i);
        response.statusCode.should.equal(200);
        done();
      });
    });

  });

});
