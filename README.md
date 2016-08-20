# config-webpack-plugin

> 💫 Merge one or more configuration files together with environment variables too.

## Installation

```sh
npm install config-webpack-plugin --save-dev
```

### How it works?

**`webpack.config.js`:**
```js
const ConfigPlugin = require('config-webpack-plugin')

module.exports = {
    plugins: [
        new ConfigPlugin([
            './config.js',
            './config.local.js'
        ])
    ]
}
```

 1. The `config-webpack-plugin` will merge all specified configuration file contents from _right to left_, thus creating a _‘merged configuration’_.
    ![Merging configuration files](https://github.com/rmariuzzo/config-webpack-plugin/raw/master/img/merging-config-files.png)

 2. If the _‘merged configuration’_ contains a `key` matching a current environment variable then the related `value` will be replaced by the environment variable's value.
    ![Environment variables replacements](https://github.com/rmariuzzo/config-webpack-plugin/raw/master/img/env-vars-replacement.png)

 3. Finally, the `config-webpack-plugin` will intercept the _‘main configuration’_ file (the first specified) during webpack's module resolution and will replace its source with the _‘merged configuration’_.

## Usage

### Single configuration

```js
const ConfigPlugin = require('config-webpack-plugin');

module.exports = {
    plugins: [
        new ConfigPlugin('./config.js')
    ]
}
```

### Multiple configuration

```js
const ConfigPlugin = require('config-webpack-plugin');

module.exports = {
    plugins: [
        new ConfigPlugin([
            './config.js',
            './config.local.js'
        ])
    ]
}
```

## FAQ

### What is a configuration file?

A module that export an object with key/value pairs that looks like:

```js
module.exports = {
    API_BASE_URL: 'http://localhost/',
    NODE_ENV: 'development',
    AUTH_SPOOFED: true,
}
```

### Does my configuration file gets modified?

No.

## Development

If you want to collaborate with the development of `config-webpack-plugin` you need to have installed NodeJS 6 and Gulp. Then follow these instructions to make my life easier:

 1. Fork this repo.
 2. Clone your forked repo.
 3. Create a _feature branch_ with: `git checkout develop; git checkout -b feature/<name-of-feature>`.
 4. Create a pull request **to be merged into `develop` branch**.

 > 💁 Please, do not submit PR to be merged into `master` branch.

### Roadmap

 - [x] [Add test. Please!](https://github.com/rmariuzzo/config-webpack-plugin/issues/4)
 - [x] [Add CI. Please!](https://github.com/rmariuzzo/config-webpack-plugin/issues/5)
 - [x] [Support multiple file](https://github.com/rmariuzzo/config-webpack-plugin/issues/2) (`new ConfigPlugin(['./config.default.js', '.config.local.js'])`).
 - [ ] Support JSON file too ♥️, because they are prettiest for configuration.
 - [ ] [Add a static website using GitHub Pages](https://github.com/rmariuzzo/config-webpack-plugin/issues/3) (why not?).

 > 💁 Do you want to suggest a feature? [Add a suggestion](https://github.com/rmariuzzo/config-webpack-plugin/issues/new).
