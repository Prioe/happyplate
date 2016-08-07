import manifest from '../../src/server/manifest';
import chai from 'chai';

chai.should();

describe('manifest', () => {
  it('should get the manifest data', () => {
    manifest.get('/').should.be.a('object');
  });
  it('should get the manifest meta data', () => {
    manifest.meta('/').should.match(/This file defines the plot device./i);
  });
});
