#!/usr/bin/env node
'use strict';

var shell = require("shelljs");

export class Loopback {
  async  generator() {
      shell.mkdir('back-end');
   }
}
