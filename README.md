# config-webpack-plugin

> 💫 Merge a configuration file with environment variables.

## How it works?

![How it works?](https://github.com/rmariuzzo/config-webpack-plugin/raw/master/img/how-it-works.png)

The `config-webpack-plugin` will **intercept a JS configuration file** during webpack's compilation time. The specified configuration file will be modified with any matching **environment variables**.

## Installation

```sh
npm install config-webpack-plugin --save-dev
```

## Usage

```js
const ConfigPlugin = require('config-webpack-plugin');

module.exports = {
    // ...
    plugins: [
        new ConfigPlugin('./config')
    ]
    // ...
}
```

*That's it!* The first and unique parameter is a string containing the relative path of the configuration file you want for `config-webpack-plugin` to intercept.

### What is a configuration file?

Currently, `config-webpack-plugin` support a simple type of JS configuration file that export an object where key-value pairs represents key-value configurations:

```js
module.exports = {
    API_BASE_URL: 'http://localhost/',
    NODE_ENV: 'development',
    AUTH_SPOOFED: true,
}
```

 > 💁 `config-webpack-plugin` will replace any of these values if the key has a match in the **environment variables**.

## Development

If you want to collaborate with the development of `config-webpack-plugin` you need to have installed NodeJS 6 and Gulp. Then follow these instructions to make my life easier:

 1. Fork this repo.
 2. Clone your forked repo.
 3. Create a _feature branch_ with: `git checkout -b feature/<name-of-feature>`.
 4. Create a pull request **to be merged into `develop` branch**.

 > 💁 Please, do not submit PR to be merged into `master` branch.

### Roadmap

 - [ ] Add test. Please!
 - [ ] Add CI. Please!
 - [ ] Support multiple file (`new ConfigPlugin(['./config.default.js', '.config.local.js'])`).
 - [ ] Support JSON file too ♥️, because they are prettiest for configuration.
 - [ ] Add a static website using GitHub Pages (why not?).

 > 💁 Do you want to suggest a feature? [➕ Add a suggestion](https://github.com/rmariuzzo/config-webpack-plugin/issues/new).
