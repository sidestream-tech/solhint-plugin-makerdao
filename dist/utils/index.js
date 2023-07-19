"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMaxArrayValueOrNull_1 = __importDefault(require("./getMaxArrayValueOrNull"));
const getStateVariableDeclarationBlocks_1 = __importDefault(require("./getStateVariableDeclarationBlocks"));
exports.default = { getMaxArrayValueOrNull: getMaxArrayValueOrNull_1.default, getStateVariableDeclarationBlocks: getStateVariableDeclarationBlocks_1.default };
