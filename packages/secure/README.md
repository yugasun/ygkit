# @ygkit/secure

[![npm](https://img.shields.io/npm/v/%40ygkit%2Fsecure)](http://www.npmtrends.com/%40ygkit%2Fsecure)
[![NPM downloads](http://img.shields.io/npm/dm/%40ygkit%2Fsecure.svg?style=flat-square)](http://www.npmtrends.com/%40ygkit%2Fsecure)

Node secure scan tool.

## Functions

| Name | Description                 |
| ---- | --------------------------- |
| scan | Scan sensitive information. |

## Install

```bash
$ npm i @ygkit/secure -g
```

## Usage

Run command in your git project:

```bash
$ ygsec
```

> Notice: This command using `git diff` message to check.

## With Husky

If you don't want to run `ygsec` manually, you can use it with [husky](https://github.com/typicode/husky).

Firstly install `husky` and `@ygkit/secure` in your project:

```bash
$ npm i @ygkit/secure husky --save-dev
```

Then config `pre-commit` hook in `package.json`:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "ygsec"
    }
  }
}
```

After that, `ygsec` will run automaticly when you create a new git commit.

## License

MIT
