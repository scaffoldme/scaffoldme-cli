"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function main(_options) {
    return (tree, _context) => {
        tree.create("hello.js", `consol.log(Hello world);`);
        return tree;
    };
}
exports.main = main;
