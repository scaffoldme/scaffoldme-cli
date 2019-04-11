'use strict';

const shell = require('shelljs');
// Check npm version
const npm = shell.exec('npm -v').stdout;

if (parseFloat(npm) < 5) {
  throw new Error('[ERROR: Strapi] You need npm version @>=5');
}

const nodeVersion = shell.exec('node -v').stdout.replace('v', '');

if (parseFloat(nodeVersion) < 8.6) {
  throw new Error('[ERROR: Strapi] You need to use node version @>=9');
}
