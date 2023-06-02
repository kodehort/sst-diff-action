import { debug, getInput, setFailed } from '@actions/core'
import { initProject } from 'sst/project.js'
import { writeSummary } from './diff'

async function run(): Promise<void> {
  try {
    const stage: string = getInput('stage')
    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    debug(`Running diff against stage ${stage}`)
    await initProject({ stage })
    await writeSummary(stage)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
