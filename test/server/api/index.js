import * as config from '../../../src/server/config';
import hapi from 'hapi';
import chai from 'chai';

chai.should();
const apiIndex = require('../../../src/server/api/index');

let server;

describe('index', () => {

  before(done => {
    const plugins = [apiIndex];
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

  it('should respond with links', done => {
    const request = {
      method: 'GET',
      url: '/'
    };
    server.inject(request, (response) => {
      response.statusCode.should.equal(200);
      response.result.should.be.an('object');
      response.result._links.should.be.an('object');
      response.result._links.ping.should.match(/\/api\/ping/);
      done();
    });
  });

});
