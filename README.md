# pdf-text-tools

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

A bunch of tools to help with processing text from a pdf, for use with LLMs. 
For example, finding headers, splitting text at headers, etc. Particularly useful for processing pages of text from a pdf, where the text is not structured in a way that is easy to process. and

## Install

```bash
npm install pdf-text-tools
```

## Usage

```ts
/**
 * Find header titles in a pdf using regex ish 
 */
import { findHeaderTitles } from 'pdf-text-tools';

findHeaderTitles('..some text string from pdf..');
//=> ['header1', 'header2'] 

/**
 * Split text at header titles
 *  - Usefull to grab the last bit of a page
 */ 
import { splitAtHeader } from 'pdf-text-tools';

splitAtHeader('..some text string from pdf..', "last");
//=> ['text before the header', 'text after the heading, including the header'] 

```

## *More tools coming soon!*

[build-img]:https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/typescript-npm-package-template
[downloads-url]:https://www.npmtrends.com/typescript-npm-package-template
[npm-img]:https://img.shields.io/npm/v/typescript-npm-package-template
[npm-url]:https://www.npmjs.com/package/typescript-npm-package-template
[issues-img]:https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template
[issues-url]:https://github.com/ryansonshine/typescript-npm-package-template/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/typescript-npm-package-template
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
