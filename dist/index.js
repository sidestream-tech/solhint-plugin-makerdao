"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const capitalized_snake_only_for_const_1 = __importDefault(require("./capitalized-snake-only-for-const"));
const constructor_arguments_unserscored_1 = __importDefault(require("./constructor-arguments-unserscored"));
const newlines_between_custom_and_native_declarations_1 = __importDefault(require("./newlines-between-custom-and-native-declarations"));
const no_newlines_between_function_signatures_1 = __importDefault(require("./no-newlines-between-function-signatures"));
const prefer_type_provided_max_1 = __importDefault(require("./prefer-type-provided-max"));
const vertically_aligned_comments_1 = __importDefault(require("./vertically-aligned-comments"));
const vertically_aligned_assignments_1 = __importDefault(require("./vertically-aligned-assignments"));
const vertically_aligned_declarations_1 = __importDefault(require("./vertically-aligned-declarations"));
const vertically_aligned_state_var_visibility_1 = __importDefault(require("./vertically-aligned-state-var-visibility"));
const addresses_match_exec_doc_1 = __importDefault(require("./addresses-match-exec-doc"));
exports.default = {
    capitalizedSnakeOnlyForConst: capitalized_snake_only_for_const_1.default,
    constructorArgumentsUnserscored: constructor_arguments_unserscored_1.default,
    newlinesbetweencustomandnativedeclarations: newlines_between_custom_and_native_declarations_1.default,
    noNewlinesBetweenFunctionSignatures: no_newlines_between_function_signatures_1.default,
    preferTypeProvidedMax: prefer_type_provided_max_1.default,
    verticallyAlignedComments: vertically_aligned_comments_1.default,
    verticallyAlignedAssignments: vertically_aligned_assignments_1.default,
    verticallyAlignedDeclarations: vertically_aligned_declarations_1.default,
    verticallyAlignedStateVarVisibility: vertically_aligned_state_var_visibility_1.default,
    addressesMatchExecDoc: addresses_match_exec_doc_1.default,
};
