import * as config from '../../../src/server/config';
import manifest from '../../../src/server/manifest';
import hapi from 'hapi';
import inert from 'inert';
import chai from 'chai';
import { join } from 'path';

chai.should();
const staticRoute = require('../../../src/server/routes/static');

const staticPlugin = {
  register: staticRoute,
  options: manifest.get('/registrations').filter((reg) => {
    if (reg.plugin &&
      reg.plugin.register &&
      reg.plugin.register === './routes/static') {
      return true;
    }
    return false;
  }).map((reg) => {
    reg.plugin.options.path = join(__dirname, '../../../dist/public');
    return reg;
  })[0].plugin.options
};

let server;

describe('Routes', () => {

  beforeEach(done => {
    const plugins = [inert, staticPlugin];
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

  describe('Static Assets', () => {

    it('should respond with humans.txt', done => {
      const request = {
        method: 'GET',
        url: '/humans.txt'
      };
      server.inject(request, (response) => {
        response.result.should.match(/# humanstxt.org\//i);
        response.statusCode.should.equal(200);
        done();
      });
    });

    it('should respond with robots.txt', done => {
      const request = {
        method: 'GET',
        url: '/robots.txt'
      };
      server.inject(request, (response) => {
        response.result.should.match(/# www.robotstxt.org\//i);
        response.statusCode.should.equal(200);
        done();
      });
    });

  });

});
