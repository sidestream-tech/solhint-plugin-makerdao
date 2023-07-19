import type {
    BaseASTNode,
    ContractDefinition,
    Reporter,
    RuleMeta,
    StateVariableDeclaration,
    StateVariableDeclarationVariable,
    VariableDeclaration,
} from 'solhint';
import {writeFileSync, readFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path'
import fetch from 'sync-fetch'

// TODO
const goodCode = `
AUF
`;
// TODO
const badCode = `
AUF
`;
// TODO
export const meta: RuleMeta = {
    ruleId: 'addresses-match-exec-doc',
    type: 'miscellaneous',

    // TODO
    docs: {
        description: 'ASDF',
        category: 'Miscellaneous',
        examples: {
            good: [
                {
                    description: 'ASDF',
                    code: goodCode,
                },
            ],
            bad: [
                {
                    description: 'ASDF',
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
const hashCommentPattern = /\s*\/\/ Hash: cast keccak -- "\$\(wget \'https:\/\/raw\.githubusercontent\.com\/makerdao\/community\/.*' -q -O - 2>\/dev\/null\)/
const githubUrlPattern = /^https:\/\/raw\.githubusercontent\.com\/makerdao\/community\/[a-z0-9]{40}\/governance\/votes\/Executive%20vote%20-%20.+\.md$/

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

function compareAddresses(what_: string[], where_: string[]): Set<string> {
    const what = new Set(what_)
    const where = new Set(where_)
    const diff = new Set([...what].filter(x => !where.has(x)));
    return diff;
}

function extractAddressesFromFile(filePath: string) {
    const fileText = readFileSync(filePath, 'utf8');
    const addresses = fileText.match(/0x[a-fA-F0-9]{40}/g);
    return addresses === null ? [] : addresses;
}

function extractAddressesFromSourceCode(sourceCode: string) {
    const addresses = sourceCode.match(/0x[a-fA-F0-9]{40}/g);
    return addresses === null ? [] : addresses;
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
            return
        }
        const filePath = downloadTextFile(githubUrl, 'executive.md')
        const addresssesExecDoc = extractAddressesFromFile(filePath);
        const addressesSpell = extractAddressesFromSourceCode(this.inputSrc);
        // compare the two
        const execAddressesInSpell = compareAddresses(addresssesExecDoc, addressesSpell);
        const spellAddressesInExec = compareAddresses(addressesSpell, addresssesExecDoc);
        if (execAddressesInSpell.size !== 0) {
            this.reporter.error(
                { type: 'SourceUnit', loc },
                this.ruleId,
                'Expected addresses in the source code to match addresses in the executive document. Missing addresses: ' + Array.from(execAddressesInSpell).join(', ')
            );
        }
        if (spellAddressesInExec.size !== 0) {
            this.reporter.error(
                { type: 'SourceUnit', loc },
                this.ruleId,
                'Expected addresses in the exec to match addresses in the spell. Missing addresses: ' + Array.from(spellAddressesInExec).join(', ')
            );
        }
    }
}
export default { rule: ExecDocAddressesMatchSourceCode, meta };
