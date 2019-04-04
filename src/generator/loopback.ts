import { Framework } from './../interface/Framework';


var shell = require("shelljs");

export class Loopback implements Framework{
  async  generator() {
      shell.mkdir('back-end');
   }

   async addstyle(typeStyle: string) {}
}
