# Testcafe/ts-node interoperability issues

This repository illustrates a problem that arise when intermixing ts/js files for testcafe fixtures. 
There're 2 problems essentially

1. Inability to resolve ts file from js fixure

2. Transpilation issues with ts classes being transpiled to prototypes making them incompatible to extends js es6 classes

```bash
 1) TypeError: Class constructor BasePage cannot be invoked without 'new'
```

The use case is a TestCafe fixture which uses a POM as a TypeScript class extending a JavaScript one.
The reason is we are migrating our code so we have in that intermediate period both JavaScript/TypeScript files.

## Installing

```bash
npm install
```

## Commands

### Broken

```bash
npm run broken:class:1
npm run broken:class:2
npm run broken:module:1
npm run broken:module:2
```

### Working

```bash
npm run fine:1
npm run fine:2
npm run fine:3
```

Working without TestCafe

```bash
npm run fine:without-testcafe
```