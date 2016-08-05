import * as config from '../../src/server/config';
import chai from 'chai';

chai.should();

describe('Config', () => {
  it('should get the config data', () => {
    config.get('/').should.be.a('object');
  });
  it('should get the config meta data', () => {
    config.meta('/').should.match(/this file configures the plot device/i);
  });
});
