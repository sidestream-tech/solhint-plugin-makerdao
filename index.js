const rules = require('./out');

module.exports = Object.values(rules.default).map((rule) => rule.rule);
