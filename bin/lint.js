#!/usr/bin/env node
const shell = require('shelljs');
const path = require('node:path');

const argv = process.argv[2];
if (!argv) {
    console.error('Path not provided');
    process.exit(1);
}

const pathToConfig = path.dirname(__dirname) + '/.solhint.json'
const executed = `npx solhint -c ${pathToConfig} ${argv}`;

shell.exec(executed);
