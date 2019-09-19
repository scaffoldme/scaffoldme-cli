## Install

Install [lerna](https://www.npmjs.com/package/lerna) for access to the `lerna` CLI.

#### Setup

1. `npm install` to install the dev tools.
1. `npm run bootstrap` (will install package dependencies and link packages
   together)
1. Optionally `npm run link` to make `scaffoldme` and other bin files point to your
   dev CLI.
1. `npm run watch` will spin up TypeScript watch scripts for all packages.