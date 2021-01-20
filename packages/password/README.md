# @ygkit/password

[![npm](https://img.shields.io/npm/v/%40ygkit%2Fpassword)](http://www.npmtrends.com/%40ygkit%2Fpassword)
[![NPM downloads](http://img.shields.io/npm/dm/%40ygkit%2Fpassword.svg?style=flat-square)](http://www.npmtrends.com/%40ygkit%2Fpassword)

Node password tool.

## Functions

| Name     | Description        |
| -------- | ------------------ |
| generate | Generate password. |

## Install

```bash
$ npm i @ygkit/password -g
```

## Usage

Run command in your git project:

```bash
$ yp -t h -l 8
```

> Default to generate strong password in `8` length.

support type:

> **h** - Strong password, with alphabet(include upper case), number and special characters.
> **m** - Middle password, with alphabet(include upper case) and number
> **l** - Middle password, with alphabet(exclue upper case) and number
> **n** - Number password, only with number

## License

MIT
