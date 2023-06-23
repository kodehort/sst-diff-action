import core from '@actions/core'
import fsSync from 'fs'
import path from 'path'

const CONFIG_EXTENSIONS = [
  '.config.ts',
  '.config.mts',
  '.config.cts',
  '.config.cjs',
  '.config.mjs',
  '.config.js',
]

interface Options {
  root?: string
  stage: string
}

export interface Project {
  config: { stage: string }
  paths: {
    config: string
    dist: string
    out: string
  }
}

export async function initProject(globals: Options) {
  core.debug('initing project')
  const root = globals.root ?? (await findRoot())
  const out = path.join(root, '.sst')
  let file: string | undefined
  for (const ext of CONFIG_EXTENSIONS) {
    file = path.join(root, `sst${ext}`)
    /* eslint-disable security/detect-non-literal-fs-filename */
    if (!fsSync.existsSync(file)) continue
    /* eslint-enable */
    core.debug('found sst config')
  }

  if (!file) {
    throw new Error('Could not find a config file')
  }

  const stage = globals.stage
  const project: Project = {
    config: {
      stage,
    },
    paths: {
      config: file,
      dist: path.join(out, 'dist'),
      out,
    },
  }

  core.debug('Config loaded')
  core.debug(JSON.stringify(project))

  return project
}

async function findRoot() {
  async function find(dir: string): Promise<string> {
    if (dir === '/') throw new Error('Could not find a config file')

    for (const ext of CONFIG_EXTENSIONS) {
      const configPath = path.join(dir, `sst${ext}`)
      /* eslint-disable security/detect-non-literal-fs-filename */
      if (fsSync.existsSync(configPath)) {
        return dir
      }
      /* eslint-enable */
    }

    return await find(path.join(dir, '..'))
  }

  const result = await find(process.cwd())
  return result
}
