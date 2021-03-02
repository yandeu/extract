# Extract

Extract package.json properties.

## Installation

```console
npm install @yandeu/extract
```

## Usage

```json
"name": "awesomepackage",
"version": "1.2.0",
"keywords": [
  "awesome",
  "fast"
],
"scripts": {
  "extract-version": "extract version VERSION.js",
  "test": "jest --coverage"
},
```

`npm run extract-version` will generate:

```js
// VERSION.js
exports.VERSION = '1.2.0'
```

## Another Example

```json
"scripts": {
  "extract": "extract name keywords scripts.test src/const.ts",
},
```

`npm run extract` will generate:

```ts
// src/const.ts
export const NAME = 'awesomepackage'
export const KEYWORDS = ['awesome', 'fast']
export const TEST = 'jest --coverage'
```

## License

[MIT](LICENSE)
