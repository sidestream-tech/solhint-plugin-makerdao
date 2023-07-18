import type { ContractDefinition, Reporter, RuleMeta, StateVariableDeclaration } from 'solhint';
import getStateVariableDeclarationBlocks from './utils/getStateVariableDeclarationBlocks';

const goodCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;

    cutomInterface public item;
}
`;
const badCode = `
pragma solidity 0.4.4;


contract C {
    uint256 public a;
    uint public b;
    MyInterface public interface;
}
`;

export const meta: RuleMeta = {
    ruleId: 'newlines-between-custom-and-native-declarations',
    type: 'miscellaneous',

    docs: {
        description: 'Check that declarations of contract variables have their names aligned vertically.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'Newline between custom interface and native type',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'No newline between custom interface and native type',
                    code: badCode,
                },
            ],
        },
    },

    isDefault: false,
    recommended: false,
    defaultSetup: 'warn',

    schema: null,
};

function validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks: StateVariableDeclaration[][]) {
    const errors = [];
    for (const block of stateVariableDeclarationBlocks) {
        for (let i = 1; i < block.length; i += 1) {
            const currentVariable = block[i].variables[0];
            const previousVariable = block[i - 1].variables[0];
            if (currentVariable.typeName?.type !== previousVariable.typeName?.type) {
                errors.push({ ...block[i] });
            }
        }
    }
    return errors;
}
export class NewlinesBetweenCustomAndNativeDeclarations {
    private ruleId: string;

    private reporter: Reporter;

    private meta: RuleMeta;

    constructor(reporter: Reporter) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.meta = meta;
    }

    ContractDefinition(ctx: ContractDefinition) {
        const stateVariableDeclarationBlocks = getStateVariableDeclarationBlocks(ctx);
        const errors = validateVerticalDeclarationAlignments(stateVariableDeclarationBlocks);
        errors.forEach(error =>
            this.reporter.error(error, this.ruleId, 'Should have newlines between custom and native declarations')
        );
    }
}

export default { NewlinesBetweenCustomAndNativeDeclarations, meta };
