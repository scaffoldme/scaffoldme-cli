var fs = require("fs");
const os = require("os");
import * as chalk from "chalk";

export class Helper {
  public static async createDirectory(name: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        fs.mkdir(name, (err:any) => {
            if (err) reject(err);
            else resolve();
        });
    }).then(() => true, err => {
        if (err.code == "EEXIST") return false;
        else throw err;
    });
}
}
