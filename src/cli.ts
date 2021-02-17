import cac from 'cac'

const cli = cac('git-ensure')

cli
  .option('-b, --branch <branch>', 'Ensure on branch')
  .option('-c, --clean', 'No uncommitted files', { default: false })
  .option('-s, --synced', 'In synced with remote, short head for --no-ahead and --no-behind', { default: false })
  .option('--no-ahead', 'No commits ahead remote')
  .option('--no-behind', 'No commits behind remote')
  .help()

console.log(cli.globalCommand.options)

const parsed = cli.parse()

if (parsed.options.synced) {
  parsed.options.ahead = false
  parsed.options.behind = false
}

console.log(JSON.stringify(parsed, null, 2))
