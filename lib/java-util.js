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

const _ = require('./helper');
const JAVA_HOME = require('java-home');

exports.JAVA_HOME = JAVA_HOME;

exports.getVersion = function() {
  var args = Array.prototype.slice.call(arguments);
  var cmd = 'java -version';

  if (args.length) {
    var cb = args[0];

    if (typeof cb === 'function') {
      _.exec(cmd).then(data => {
        cb.call(this, null, _.parseJavaVersion(data));
      }).catch(err => {
        cb.call(this, `exec ${cmd} error with: ${err}`);
      });
    } else {
      logger.warn('exec shell failed');
    }
  } else {
    return new Promise((resolve, reject) => {
      _.exec(cmd).then(data => {
        resolve(_.parseJavaVersion(data));
      }).catch(err => {
        reject(`exec ${cmd} error with: ${err}`);
      });
    });
  }
};
