#!/usr/bin/env node
const path = require('node:path');
const { execSync } = require('node:child_process');

const argv = process.argv[2];
if (!argv) {
    console.error('Path not provided');
    process.exit(1);
}

const pathToConfig = path.join(path.dirname(__dirname), '.solhint.json');
const executedCommand = `npx solhint -c ${pathToConfig} ${argv}`;

try {
    execSync(executedCommand);
} catch (e) {
    console.error(e.stdout.toString());
}
