'use strict';

var JAVA = require('..');

describe('lib/java-util.js', function() {

  it('getVersion callback', function(done) {
    JAVA.getVersion(function(err, data) {
      if (err) {
        console.log(err);
        done();
        return;
      }
      data.should.be.a.String;
      console.log(`version: ${data}`);
      done();
    });
  });

  it('getVersion promise', function(done) {
    JAVA.getVersion().then(function(data) {
      data.should.be.a.String;
      console.log(`version: ${data}`);
      done();
    }).catch(function(err) {
      console.log(err);
      done();
    });
  });
});
