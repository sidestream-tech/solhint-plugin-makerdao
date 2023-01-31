# MakerDAO solidity linter

This repository contains [linting](https://en.wikipedia.org/wiki/Lint_(software)) rules and opinionated configuration for the code style enforced by [MakerDAO](https://github.com/makerdao) protocol engineers. Technically, it's a set of [solhint](https://github.com/protofire/solhint) plugins and a configuration file that can be globally installed in your system and executed on demand of as a pre-commit hook.

### Getting started

- Install [node.js](https://nodejs.org/en/download/package-manager/)
- Install [solhint](https://github.com/protofire/solhint)
- Install [npx](https://www.npmjs.com/package/npx) if you only use local solhint installation
- Install this plugin
- Create a `.solhint.json` file in the root of your project and add configuration into it.
- Run solhint:
    - if installed globally: `solhint ./path/to/file`
    - if installed locallly for the project: `npx solhint ./path/to/file`

### Configuration

1. Add the plugin into your `.solhint.json` file:

```json
{
    "plugins": ["makerdao"]
}
```

2. Configure the rules. For example [this file](./.solhint.json)

### Rules

| Rule                                            | Description                                                                                                        |
| :-:                                             | :-                                                                                                                 |
| vertically-aligned-comments                     | Enforce comments in the same block that start with `//` to start on the same column                                |
| vertically-aligned-declarations                 | Enforce contract scope declarations to have variable names start on the same column                                |
| vertically-aligned-state-var-visibility         | Enforce visibility modifiers such as `public` to start on the same column in the declarations                      |
| no-newlines-between-function-signatures         | Forbid newlines in interface defenitions                                                                           |
| capitalized-snake-only-for-const                | Forbid CAPITALIZED_SNAKE_CASE for variables that are not constants                                                 |
| newlines-between-custom-and-native-declarations | Enforce newlines between variable declarations of custom and native types (e.g. `IExampleContract` and `uint256` ) |
| constructor-arguments-unserscored               | Enforce underscores for constructor argument names                                                                 |
| prefer-type-provided-max                        | enforce using type provided max values over conversions. I.e. `type(uint256).max` over `uint256(-1)`               |
