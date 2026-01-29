# whosit

[![Build Status](https://github.com/stores-com/whosit/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/stores-com/whosit/actions?query=workflow%3Abuild+branch%3Amain)
[![Coverage Status](https://coveralls.io/repos/github/mediocre/whosit/badge.svg?branch=main)](https://coveralls.io/github/mediocre/whosit?branch=main)

A personal name parser for Node.js: http://en.wikipedia.org/wiki/Personal_name

```js
const whosit = require('whosit');

const name = whosit.parse('Mr. Shawn Michael Miller Sr.');

console.log(name.salutation); // Mr.
console.log(name.first); // Shawn
console.log(name.middle); // Michael
console.log(name.last); // Miller
console.log(name.suffix); // Sr.
```

## Support for all kinds of names

```js
let name = whosit.parse('Shawn Miller');
console.log(name.first); // Shawn
console.log(name.last); // Miller

name = whosit.parse('Dr. Dre');
console.log(name.salutation); // Dr.
console.log(name.last); // Dre

name = whosit.parse('Prince');
console.log(name.first); // Prince
```

## Automatic detection of lexical formats

```js
let name = whosit.parse('Miller,Shawn');
console.log(name.first); // Shawn
console.log(name.last); // Miller

name = whosit.parse('Miller, Shawn Michael');
console.log(name.first); // Shawn
console.log(name.middle); // Michael
console.log(name.last); // Miller
```

## Support for many complex surnames
```js
let name = whosit.parse('Michael Ó Conchúir');
console.log(name.first); // Michael
console.log(name.last); // Ó Conchúir

name = whosit.parse('Michael O Connor');
console.log(name.first); // Michael
console.log(name.middle); // O
console.log(name.last); // Connor

name = whosit.parse('Fintan Mac Néill');
console.log(name.first); // Fintan
console.log(name.last);  // Mac Néill

name = whosit.parse('Joost van der Meer');
console.log(name.first); // Joost
console.log(name.last); // van der Meer

name = whosit.parse('Maria de la Cruz');
console.log(name.first); // Maria
console.log(name.last); // de la Cruz
```
