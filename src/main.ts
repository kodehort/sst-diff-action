import core from '@actions/core'
import { writeSummary } from './diff'
import { initProject } from './project'

process.on('unhandledRejection', handleError)
// eslint-disable-next-line github/no-then
main().catch(handleError)

async function main() {
  const stage: string = core.getInput('stage', { required: true })
  // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
  core.debug(`Running diff against stage ${stage}`)
  const project = await initProject({ stage })
  await writeSummary(project)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(err: any) {
  // eslint-disable-next-line no-console
  console.error(err)
  if (err instanceof Error) {
    core.setFailed(err.message)
  } else {
    core.setFailed(`Unhandled Error: ${err}`)
  }
}
