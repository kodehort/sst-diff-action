import core from '@actions/core'
import { writeSummary } from './diff'
import { initProject } from './project'

async function run(): Promise<void> {
  try {
    const stage: string = core.getInput('stage')
    // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Running diff against stage ${stage}`)
    const project = await initProject({ stage })
    await writeSummary(project)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
