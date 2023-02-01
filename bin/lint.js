#!/usr/bin/env node
var shell = require('shelljs');
var argv = process.argv[2];
if (!argv) {
    console.error('Path not provided');
    process.exit(1);
}
var globalNpmInstallationsPath = shell.exec('npm root -g', { silent: true }).stdout.trim();
var executed = `npx solhint -c ${globalNpmInstallationsPath}/solhint-plugin-makerdao/.solhint.json ${argv}`;

shell.exec(executed);
