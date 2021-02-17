<h1 align="center">git-ensure</h1>


<p align="center">
Ensure git status before continuing.
</p>
<p align="center">
<a href="https://www.npmjs.com/package/git-ensure"><img src="https://img.shields.io/npm/v/git-ensure?color=a1b858&label=" alt="NPM version"></a>
</p>

![image](https://user-images.githubusercontent.com/11247099/108178559-88630080-713f-11eb-92b5-fbd47d39f202.png)

## Usage

```bash
npx git-ensure --branch main --no-head --no-behind --clean && <your-commands>
```

or

```bash
npx git-ensure -a && <your-commands>
```

If any of the conditions fail, a `process.exit(1)` will be returned and prevent you from continuing the following workflows.

## License

MIT
