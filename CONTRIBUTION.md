# Project layout

1. Root `index.js` exports everything from `dist` directory after converting the exports from object into an array.
2. `dist` directory is generated via `npm run compile`, it should not be edited.
    - Content of `/src/rules` ends up in the `dist/`
3. `src/rules` contains one file per linting rule. `src/rules/index.ts` should export all the rules from the directory.

# Adding a new rule

1. Create a file in `src/rules` that defines the rule's logic according to the [Writing plugins solhint page](https://github.com/protofire/solhint/blob/master/docs/writing-plugins.md)
2. File should by default export an object of the following structure:

```js
{
    rule: SolhintRuleClass,
    meta: metadata
}
```

3. import the object from (2) into `src/rules/index.ts` and reexport it there (`export default`)
4. Add the tests for the rule
