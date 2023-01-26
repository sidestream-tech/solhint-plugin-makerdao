### Solhint plugin Makerdao

This plugin extends the capabilities of the Solhint linter to include the MakerDAO style guide.
Particularly, it is useful for pull request submission in the corresponding smart contract repositories.

### Requirements

- [solhint](https://github.com/protofire/solhint) installation.

### Installation

```bash
npm install --save-dev solhint-plugin-makerdao
```

### Configuration

Add the plugin into your `.solhint.json` file:

```json
{
    "plugins": ["makerdao"]
}
```

Configure the rules. For example

```json
"rules": {
  "makerdao/vertically-aligned-comments": "error",
  "makerdao/vertically-aligned-declarations": "error",
  "makerdao/vertically-aligned-state-var-visibility": "error",
  "makerdao/no-newlines-between-function-signatures": "error",
  "makerdao/capitalized-snake-only-for-const": "error",
  "makerdao/newlines-between-custom-and-native-declarations": "error",
  "makerdao/constructor-arguments-unserscored": "error",
  "makerdao/prefer-type-provided-max": "error"
}
```

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
