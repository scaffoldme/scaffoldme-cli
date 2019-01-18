#!/usr/bin/env node

import * as chalk from 'chalk';

export class ParserData {
  constructor() {

  }

  async getFontEndOptions(data: any): Promise<void> {
    //console.log(data.configuration);
    try {
      for(var i in data.configuration) {
        return data.configuration;
     }
    } catch (err) {
      console.log(err);
    }
  }
}