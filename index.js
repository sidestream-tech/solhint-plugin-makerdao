const rules = require('./dist');

module.exports = Object.values(rules.default).map((rule) => rule.rule);
