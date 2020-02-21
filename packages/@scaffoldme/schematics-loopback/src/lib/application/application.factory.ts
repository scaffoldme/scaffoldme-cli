import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
export function main(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create("hello.js", `consol.log(Hello world);`);
    return tree;
  };
}
