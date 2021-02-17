# git-ensure

Ensure git status matches with conditions before continuing your workflow.

## Usage

```bash
npx git-ensure --branch main --no-head --no-behind --clean && <your-workflow>
```

or

```bash
npx git-ensure -a && <your-workflow>
```

If the any of the connditions fail, a `process.exit(1)` will be returned and prevent you from continue the workflow.

## License

MIT
