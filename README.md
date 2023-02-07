# MakerDAO solidity linter

This repository contains [linting](https://en.wikipedia.org/wiki/Lint_(software)) rules and opinionated configuration for the code style enforced by [MakerDAO](https://github.com/makerdao) protocol engineers. Technically, it's a set of [solhint](https://github.com/protofire/solhint) plugins and a configuration file that can be globally installed in your system and executed on demand of as a pre-commit hook.

### Getting started

#### Use this package as a standalone cli tool

1. Install [solhint](https://github.com/protofire/solhint) globaly via `npm i -g solhint`
2. Install this repository via `npm i -g solhint-plugin-makerdao@npm:@sidestream/solhint-plugin-makerdao`
3. Lint all solidity files in the current folder via `npx solhint-plugin-makerdao ./**/*.sol`

#### Add this linter to existing project
1. Install [solhint](https://github.com/protofire/solhint) via `npm i --save-dev solhint`
2. Install this repository via `npm i --save-dev solhint-plugin-makerdao@npm:@sidestream/solhint-plugin-makerdao`
3. Create a new `.solhint.json` according to the [documentation](https://github.com/protofire/solhint#configuration) or use the one provided in this repository.
4. Add `lint` script to the `package.json` with `solhint ./**/*.sol`
5. Run `npm run lint` manually, in CI or [before every commit](https://www.npmjs.com/package/pre-commit)


### Rules

| Rule                                            | Description                                                                                                        |
| :-                                             | :-                                                                                                                 |
| vertically-aligned-comments                     | Enforce comments in the same block that start with `//` to start on the same column                                |
| vertically-aligned-declarations                 | Enforce contract scope declarations to have variable names start on the same column                                |
| vertically-aligned-state-var-visibility         | Enforce visibility modifiers such as `public` to start on the same column in the declarations                      |
| no-newlines-between-function-signatures         | Forbid newlines in interface defenitions                                                                           |
| capitalized-snake-only-for-const                | Forbid CAPITALIZED_SNAKE_CASE for variables that are not constants                                                 |
| newlines-between-custom-and-native-declarations | Enforce newlines between variable declarations of custom and native types (e.g. `IExampleContract` and `uint256` ) |
| constructor-arguments-unserscored               | Enforce underscores for constructor argument names                                                                 |
| prefer-type-provided-max                        | enforce using type provided max values over conversions. I.e. `type(uint256).max` over `uint256(-1)`               |


### Publishing to npm

0. Login to npm (if not yet) via `npm login`
1. Update `version` field inside `package.json` according to the [semver](https://semver.org/)
    - Run `npm install` to propagate changes to the `package-lock.json`
2. Open a PR with the changes
3. Publish the new version via `npm publish --access public`
