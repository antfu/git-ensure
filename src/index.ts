import Git from 'simple-git'

export async function gitEnsure() {
  const git = Git()
  const status = await git.status()
  console.log(status)
}

gitEnsure()
