<a href="https://www.npmjs.com/~scaffoldme"><img src="https://img.shields.io/npm/v/@scaffoldme/cli.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~scaffoldme"><img src="https://img.shields.io/npm/l/@scaffoldme/cli.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~scaffoldme"><img src="https://img.shields.io/npm/dm/@scaffoldme/cli.svg" alt="NPM Downloads" /></a>

## Description

descripton

## Installation

```
$ npm install -g @scaffoldme/cli
```


## Local installation
Locate  inside this directory. 
````shell script
cd /Path/to/go/scaffoldme-cli/packages/@scaffoldme/cli
````

and execute this commande

```shell script
npm i -g 
```
in your package.json you have this line

````json
{
 "bin": {
    "sc": "./bin/scaffoldme",
    "scaffoldme": "./bin/scaffoldme"
  }
}
````
these lines above will create a symbolic link to the commands in your path. 
these lines will make the creation of a symbolic link to the commands in your path, so all the modifications made will be added directly after the last registration. 

## Usage

```
$ init | i

$ start | str <container_name>

$ stop | stp <container_name>
```

Learn more in the [official documentation](https://github.com/scaffoldme/scaffoldme-cli).

## Stay in touch

- Website - [https://scaffoldme.com](https://github.com/scaffoldme/scaffoldme-cli)
