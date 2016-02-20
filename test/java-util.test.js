/* ================================================================
 * java-util by xdf(xudafeng[at]126.com)
 *
 * first created at : Sat Feb 20 2016 16:33:03 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

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
