'use strict';

const EOL = require('os').EOL;
const childProcess = require('child_process');

var _ = {};

_.merge = function (r, s) {
  for (var i in s) {
    r[i] = s[i];
  }
  return r;
};

_.exec = function(cmd, opts) {
  return new Promise(function(resolve, reject) {
    childProcess.exec(cmd, _.merge({
      maxBuffer: 1024 * 512,
      wrapArgs: false
    }, opts || {}), function(err, stdout, stderr) {
      if (err) {
        return reject(err);
      }
      resolve(stderr.trim());
    });
  });
};

_.spawn = function() {
  var args = Array.prototype.slice.call(arguments);
  return new Promise(function(resolve, reject) {
    var stdout = '';
    var stderr = '';
    var child = childProcess.spawn.apply(childProcess, args);

    child.on('error', function(error) {
      reject(error);
    });

    child.stdout.on('data', function(data) {
      stdout += data;
    });

    child.stderr.on('data', function(data) {
      stderr += data;
    });

    child.on('close', function(code) {
      var error;
      if (code) {
        error = new Error(stderr);
        error.code = code;
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
};

_.parseJavaVersion = function(stderr) {
  var lines = stderr.split(EOL);

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (new RegExp('java version').test(line)) {
      return line.split(' ')[2].replace(/"/g, '');
    } else if (new RegExp('openjdk version').test(line)) {
      return line.split(' ')[2].replace(/"/g, '');
    }
  }
  return null;
};

module.exports = _;
