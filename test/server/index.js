import composer from '../../src/server/index';
import chai from 'chai';

chai.should();

describe('composer', () => {
  it('should compose a server', done => {
    composer((err, composedServer) => {
      composedServer.should.be.an('object');
      done(err);
    });
  });
});
