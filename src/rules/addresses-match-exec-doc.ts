import type {
    BaseASTNode,
    ContractDefinition,
    NumberLiteral,
    Reporter,
    RuleMeta,
    StateVariableDeclaration,
    StateVariableDeclarationVariable,
} from 'solhint';
import { writeFileSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { parse, visit } from '@solidity-parser/parser';
import fetch from 'sync-fetch';

const goodCode = `
pragma solidity 0.4.4;


// if the executive document contains an address 0x0000000000000000000000000000000000000000
contract C {
    // Hash: cast keccak -- "$(wget 'https://raw.githubusercontent.com/makerdao/community/e4bf988dd35f82e2828e1ce02c6762ddd398ff92/governance/votes/Executive%20vote%20-%20June%2028%2C%202023.md' -q -O - 2>/dev/null)"
    string public constant override description =
        "some description";
    address public a = 0x0000000000000000000000000000000000000000;
}
`;
const badCode = `
pragma solidity 0.4.4;


// if the executive document contains an address 0x0000000000000000000000000000000000000000
contract C {
    // Hash: cast keccak -- "$(wget 'https://raw.githubusercontent.com/makerdao/community/e4bf988dd35f82e2828e1ce02c6762ddd398ff92/governance/votes/Executive%20vote%20-%20June%2028%2C%202023.md' -q -O - 2>/dev/null)"
    string public constant override description =
        "some description";
    address public a = 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee;
}
`;
export const meta: RuleMeta = {
    ruleId: 'addresses-match',
    type: 'miscellaneous',

    docs: {
        description: 'Addresses mentioned in the executive document have to be present in the source code.',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'The contract code contains the address that is present in the executive document.',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description:
                        'The contract code does not contain the address that is present in the executive document.',
                    code: badCode,
                },
            ],
        },
    },

    isDefault: false,
    recommended: false,
    defaultSetup: 'error',

    schema: null,
};

const lineBreakPattern = /\r\n|[\r\n\u2028\u2029]/u;
const commentPattern = /.*\/\/.*/;
const hashCommentPattern =
    // eslint-disable-next-line no-useless-escape, max-len
    /\s*\/\/ Hash: cast keccak -- "\$\(wget \'https:\/\/raw\.githubusercontent\.com\/makerdao\/community\/.*' -q -O - 2>\/dev\/null\)/;
const githubUrlPattern =
    // eslint-disable-next-line no-useless-escape, max-len
    /^https:\/\/raw\.githubusercontent\.com\/makerdao\/community\/[a-z0-9]{40}\/governance\/votes\/Executive%20vote%20-%20.+\.md$/;
const ethAddressPattern = /0x[a-fA-F0-9]{40}/g;

function extractGithubUrl(line: string): string | null {
    const match = line.match(hashCommentPattern);
    if (match === null) {
        return null;
    }
    const urlBeginning = line.indexOf("'") + 1;
    const urlEnd = line.indexOf("'", urlBeginning);
    const url = line.substring(urlBeginning, urlEnd);
    if (!githubUrlPattern.test(url)) {
        return null;
    }
    return url;
}

function getStateVariableDeclarations(subNodes: BaseASTNode[]): StateVariableDeclaration[] {
    return subNodes.filter((node): node is StateVariableDeclaration => node.type === 'StateVariableDeclaration');
}

function downloadTextFile(url: string, fileName: string): string {
    const response = fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch the file from ${url}. Status: ${response.status}`);
    }

    const text = response.text();
    const tempDir = tmpdir();
    const filePath = join(tempDir, fileName);
    writeFileSync(filePath, text, 'utf8');
    return filePath;
}

function compareAddresses(whatExpected_: string[], whereExpected_: string[]): Set<string> {
    const what = new Set(whatExpected_.map(i => i.toLowerCase()));
    const where = new Set(whereExpected_.map(i => i.toLowerCase()));
    const diff = new Set([...what].filter(x => !where.has(x)));
    return diff;
}

function extractAddressesFromFile(filePath: string) {
    const fileText = readFileSync(filePath, 'utf8');
    const addresses = fileText.match(ethAddressPattern);
    return addresses === null ? [] : addresses;
}

function extractAddressesFromSourceCode(sourceCode: string) {
    const ast = parse(sourceCode);
    const ret: string[] = [];
    visit(ast, {
        NumberLiteral(node: NumberLiteral) {
            const value = node.number;
            if (value.match(ethAddressPattern)) {
                ret.push(value);
            }
        },
    });
    return ret;
}

export class ExecDocAddressesMatchSourceCode {
    private ruleId: string;

    private reporter: Reporter;

    private inputSrc: string;

    private meta: RuleMeta;

    constructor(reporter: Reporter, _config: any, inputSrc: string) {
        this.ruleId = meta.ruleId;
        this.reporter = reporter;
        this.inputSrc = inputSrc;
        this.meta = meta;
    }

    ContractDefinition(ctx: ContractDefinition) {
        if (ctx.name !== 'DssSpellAction') {
            return;
        }
        const svds = getStateVariableDeclarations(ctx.subNodes);
        const dvs = svds
            .map(svd =>
                svd.variables.filter((v): v is StateVariableDeclarationVariable => v.type === 'VariableDeclaration')
            )
            .reduce(
                (acc: StateVariableDeclarationVariable[], curr: StateVariableDeclarationVariable[]) =>
                    acc.concat(curr),
                []
            );
        const descriptionVar = dvs.find(dv => dv.name === 'description');
        const descriptionVarLocStart = descriptionVar?.loc?.start;
        if (descriptionVar === undefined || descriptionVarLocStart === undefined) {
            this.reporter.error(
                ctx,
                this.ruleId,
                'Expected `description` variable to be defined on the contract top level.'
            );
            return;
        }
        if (descriptionVarLocStart.line - 1 < 0) {
            this.reporter.error(
                descriptionVar,
                this.ruleId,
                'Expected line above `description` variable to contain a comment with hash command.'
            );
            return;
        }

        const targetLine = this.inputSrc.split(lineBreakPattern)[descriptionVarLocStart.line - 2] || undefined;
        if (targetLine === undefined || !commentPattern.test(targetLine)) {
            this.reporter.error(
                descriptionVar,
                this.ruleId,
                'Expected line above `description` variable to contain a comment with hash command.'
            );
            return;
        }
        const githubUrl = extractGithubUrl(targetLine);
        const loc = {
            start: { line: descriptionVarLocStart.line - 2, column: targetLine.indexOf('//') },
            end: { line: descriptionVarLocStart.line - 2, column: targetLine.indexOf('//') + targetLine.length },
        };
        if (githubUrl === null) {
            this.reporter.error(
                { type: 'SourceUnit', loc },
                this.ruleId,
                'Expected line above `description` variable to contain a github url.'
            );
            return;
        }
        const filePath = downloadTextFile(githubUrl, 'executive.md');
        const addressesSpell = extractAddressesFromSourceCode(this.inputSrc);
        const addresssesExecDoc = extractAddressesFromFile(filePath);
        // compare the two
        const missingExecAddressesInSpell = compareAddresses(addresssesExecDoc, addressesSpell);
        const missingSpellAddressesInExec = compareAddresses(addressesSpell, addresssesExecDoc);
        if (missingExecAddressesInSpell.size !== 0) {
            this.reporter.error(
                { type: 'SourceUnit', loc },
                `${this.ruleId}-source-code`,
                // eslint-disable-next-line max-len
                `Expected addresses in the source code to match addresses in the executive document. Missing addresses:\n${Array.from(
                    missingExecAddressesInSpell
                ).join(',\n')}`
            );
        }
        if (missingSpellAddressesInExec.size !== 0) {
            this.reporter.warn(
                { type: 'SourceUnit', loc },
                `${this.ruleId}-exec-doc`,
                // eslint-disable-next-line max-len
                `Not all addresses in the source code are present in the executive document. Missing addresses:\n${Array.from(
                    missingSpellAddressesInExec
                ).join(',\n')}`
            );
        }
    }
}
export default { rule: ExecDocAddressesMatchSourceCode, meta };
