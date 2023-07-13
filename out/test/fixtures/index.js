"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assignments_1 = require("./assignments");
const capitalSnakeCase_1 = require("./capitalSnakeCase");
const comments_1 = require("./comments");
const constructors_1 = require("./constructors");
const declarations_1 = require("./declarations");
const functionSignatureNewLines_1 = require("./functionSignatureNewLines");
const maxValue_1 = require("./maxValue");
exports.default = {
    assignments: assignments_1.default,
    capitalSnakeCase: capitalSnakeCase_1.default,
    comments: comments_1.default,
    constructors: constructors_1.default,
    declarations: declarations_1.default,
    functionSignatureNewLines: functionSignatureNewLines_1.default,
    maxValue: maxValue_1.default,
};
