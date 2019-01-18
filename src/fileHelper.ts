import {
  statSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  accessSync,
  constants,
  mkdirSync
} from 'fs';
import { join } from 'path';
const os = require('os');

export class FileHelper {
  /**
   * Replace tilde by home path
   * @param {string} path
   * @return {boolean}
   */
  public checkDirectory(pathDir: string): boolean {
    pathDir = this.renamePath(pathDir);
    try {
      accessSync(pathDir, constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  public createDirectory(pathDir: string): string {
    try {
        mkdirSync(pathDir);
      return "Folder create";
    } catch (error) {
        console.log(error);
      return "Error create folder";
    }
  }

  /**
   * Returns all files in directory
   * @param {string} path
   * @return {string[]}
   */
  getFiles(pathDir: string): string[] {
    const files = readdirSync(pathDir).filter(function(file) {
      return statSync(pathDir + '/' + file).isDirectory();
    });
    return files;
  }

  /**
   * Replace tilde by home path
   * @param {string} pathDir
   * @returns {string}
   */
  renamePath(pathDir: string): string {
    if (pathDir[0] === '~') {
      return join(os.homedir(), pathDir.slice(1));
    } else {
      return pathDir;
    }
  }

  /**
   * Get content file
   * @param {string} pathDir
   * @param {string} fileName
   * @returns {string}
   */
  getContentByFile(pathDir: string, fileName: string): string {
    return readFileSync(pathDir + fileName, 'utf8');
  }

  /**
   * Get content file
   * @param pathDir 
   * @param fileName 
   * @param content
   */
  writeGenerateFile(pathDir: string, fileName: string, content: string) {
    return writeFileSync(pathDir + '/' + fileName, content);
  }
}