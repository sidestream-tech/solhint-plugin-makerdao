# MakerDAO solidity linter

This repository contains [linting](https://en.wikipedia.org/wiki/Lint_(software)) rules and opinionated configuration for the code style enforced by [MakerDAO](https://github.com/makerdao) protocol engineers. Technically, it's a set of [solhint](https://github.com/protofire/solhint) plugins and a configuration file that can be globally installed in your system and executed on demand of as a pre-commit hook.

### Getting started

#### Add this linter to existing project
1. Install [solhint](https://github.com/protofire/solhint) via `npm i solhint --save-dev`
2. Install this repository via `npm i https://github.com/sidestream-tech/solhint-plugin-makerdao --save-dev`
3. Create a new `.solhint.json` file in the root of your project and add configuration into it:
  {
    "extends": "solhint:default",
    "plugins": ["makerdao"] 
  }
4. Add `lint` script to the `package.json` with `solhint ./**/*.sol`
5. Run `npm run lint` manually, in CI or [before every commit](https://www.npmjs.com/package/pre-commit)

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
