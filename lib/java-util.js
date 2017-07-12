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
