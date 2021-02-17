import cac from 'cac'
import _debug from 'debug'
import { red, yellow, blue, bgRed } from 'chalk'
import { gitEnsure } from './index'

const debug = _debug('git-ensure:cli')

const cli = cac('git-ensure')

cli
  .option('-b, --branch, --branches [...branches]', 'Ensure on branch', { default: 'main,master' })
  .option('-c, --clean', 'No uncommitted files', { default: false })
  .option('-s, --synced', 'In synced with remote, short head for --no-ahead and --no-behind', { default: false })
  .option('-a, --all', 'All conditions', { default: false })
  .option('--no-ahead', 'No commits ahead remote')
  .option('--no-behind', 'No commits behind remote')
  .help()

const parsed = cli.parse()

if (parsed.options.all) {
  parsed.options.synced = true
  parsed.options.clean = true
  parsed.options.branch = parsed.options.branch || 'main,master'
}

if (parsed.options.synced) {
  parsed.options.ahead = false
  parsed.options.behind = false
}

async function run() {
  debug('args', parsed.options)
  const checks = await gitEnsure(parsed.options)

  if (!checks.length) {
    process.exit(0)
  }
  else {
    checks.forEach(({ name, received, expected }) => {
      const expectedFormatted = Array.isArray(expected) && expected.length > 1
        ? `one of ${JSON.stringify(expected)}`
        : Array.isArray(expected)
          ? `"${expected[0]}"`
          : `"${expected}"`
      console.error(
        bgRed.black`  Git Ensure  `
        + yellow` ${name} `
        + red`is expected to be ${blue(expectedFormatted)} but got ${yellow`"${received}"`}`)
    })
    process.exit(1)
  }
}

run()
