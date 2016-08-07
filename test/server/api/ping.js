import * as config from '../../../src/server/config';
import hapi from 'hapi';
import chai from 'chai';
import querystring from 'querystring';

chai.should();
const apiPing = require('../../../src/server/api/ping');

let server;

describe('ping', () => {

  before(done => {
    const plugins = [apiPing];
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

  it('should respond with 400 - Bad request', done => {
    const request = {
      method: 'GET',
      url: '/ping'
    };
    server.inject(request, (response) => {
      response.statusCode.should.equal(400);
      done();
    });
  });

  it('should replace `pings` with `pongs`', done => {
    const query = {
      message: 'ping PIng qping pingQ ping'
    };
    const request = {
      method: 'GET',
      url: `/ping?${querystring.stringify(query)}`
    };
    server.inject(request, (response) => {
      response.statusCode.should.equal(200);
      response.result.should.be.an('object');
      response.result.message.should.match(/pong POng qping pingQ pong/);
      done();
    });
  });

  it('should echo the message', done => {
    const query = {
      message: 'qping pingq only echo'
    };
    const request = {
      method: 'GET',
      url: `/ping?${querystring.stringify(query)}`
    };
    server.inject(request, (response) => {
      response.statusCode.should.equal(200);
      response.result.should.be.an('object');
      response.result.message.should.equal(query.message);
      done();
    });
  });

});
