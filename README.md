## Install

Install [lerna](https://www.npmjs.com/package/lerna) for access to the `lerna` CLI.

#### Setup

Fork the repo & clone it locally.
`npm install` to install the dev tools.
`npm run bootstrap` (will install package dependencies and link packages
together)
Optionally `npm run link` to make `scaffoldme` and other bin files point to your dev CLI.
`npm run watch` will spin up TypeScript watch scripts for all packages.
TypeScript source files are in `packages/**/src`.