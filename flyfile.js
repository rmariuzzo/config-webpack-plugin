module.exports.default = function * () {
    yield this
        .source('src/*.js')
        .target('lib');
}
