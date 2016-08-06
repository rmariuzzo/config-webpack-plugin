export default () => {
    let config = JSON.parse(this.query.slice(1));
    return `module.exports = ${JSON.stringify(config)}`;
};
