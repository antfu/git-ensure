import Git from 'simple-git'
import _debug from 'debug'

const debug = _debug('git-ensure:check')

export interface EnsureOptions {
  branches?: string
  clean?: boolean
  ahead?: boolean
  behind?: boolean
}

export interface Check {
  name: string
  expected: string | string[]
  received: string
}

export async function gitEnsure(options: EnsureOptions = {}) {
  const checks: Check[] = []
  const git = Git()
  const status = await git.status()

  debug('status', status)

  if (options.branches) {
    const branches = options.branches.split(',').map(i => i.trim()).filter(Boolean)
    if (!branches.includes(status.current || 'unknown')) {
      checks.push({
        name: 'branch',
        expected: branches,
        received: `${status.current}`,
      })
    }
  }

  if (options.ahead === false && status.ahead !== 0) {
    checks.push({
      name: 'commits ahead',
      expected: '0',
      received: `${status.ahead}`,
    })
  }

  if (options.behind === false && status.behind !== 0) {
    checks.push({
      name: 'commits behind',
      expected: '0',
      received: `${status.behind}`,
    })
  }

  if (options.clean && status.files.length) {
    checks.push({
      name: 'uncommitted files',
      expected: 'none',
      received: `${status.files.length} changes`,
    })
  }

  debug('checks', checks)

  return checks
}
