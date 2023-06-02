import { summary } from '@actions/core'
// import {
//   CloudFormationClient,
//   GetTemplateCommand,
// } from '@aws-sdk/client-cloudformation'
// import { stackNameToId } from 'sst/cli/ui/stack.js'
import { useProject } from 'sst/project.js'
import { Stacks } from 'sst/stacks/index.js'

export const writeSummary = async (stage: string): Promise<void> => {
  // Build app
  const project = useProject()
  const [_metafile, _sstConfig] = await Stacks.load(project.paths.config)
  // const assembly = await Stacks.synth({
  //   fn: sstConfig.stacks,
  //   mode: 'deploy',
  // })

  summary.addHeading(`Summary diff against ${stage}`)

  // Diff each stack
  // let changesAcc = 0
  // let changedStacks = 0
  // for (const stack of assembly.stacks) {
  //   // get old template
  //   const oldTemplate = await getTemplate(
  //     stack.stackName,
  //     project.config.region,
  //   )
  //   if (!oldTemplate) {
  //     summary.addHeading(`${stackNameToId(stack.stackName)}: New stack`, 2)
  //     summary.addSeparator()
  //     continue
  //   }
  //
  //   // generate diff
  //   const { count, diff } = await Stacks.diff(stack, oldTemplate)
  //
  //   // print diff result
  //   if (count === 0) {
  //     summary.addHeading(`${stackNameToId(stack.stackName)}: No changes`, 2)
  //   } else if (count === 1) {
  //     summary.addHeading(
  //       `${stackNameToId(stack.stackName)}: ${count} change`,
  //       2,
  //     )
  //     summary.addCodeBlock(diff as string, 'diff')
  //     changesAcc += count
  //     changedStacks++
  //   } else {
  //     summary.addHeading(
  //       `${stackNameToId(stack.stackName)}: ${count} changes`,
  //       2,
  //     )
  //     summary.addCodeBlock(diff as string, 'diff')
  //
  //     changesAcc += count
  //     changedStacks++
  //   }
  //   summary.addBreak()
  //   summary.addSeparator()
  //   summary.addBreak()
  // }

  // Handle no changes
  // if (changedStacks === 0) {
  //   summary.addRaw('No changes')
  // } else {
  //   summary.addRaw(
  //     `${changesAcc === 1 ? '1 change found in' : `${changesAcc} changes in`} ${
  //       changedStacks === 1 ? '1 stack' : `${changedStacks} stacks`
  //     }`,
  //   )
  // }

  await summary.write()
}

// type ErrorWithMessage = {
//   message: string
// }

// function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'message' in error &&
//     typeof (error as Record<string, unknown>).message === 'string'
//   )
// }
//
// function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
//   if (isErrorWithMessage(maybeError)) return maybeError
//
//   try {
//     return new Error(JSON.stringify(maybeError))
//   } catch {
//     // fallback in case there's an error stringifying the maybeError
//     // like with circular references for example.
//     return new Error(String(maybeError))
//   }
// }
//
// function getErrorMessage(error: unknown) {
//   return toErrorWithMessage(error).message
// }

// async function getTemplate(
//   stackName: string,
//   region: string | undefined,
// ): Promise<unknown> {
//   try {
//     const client = new CloudFormationClient({ region })
//     const response = await client.send(
//       new GetTemplateCommand({ StackName: stackName }),
//     )
//     return JSON.parse(response.TemplateBody || '')
//   } catch (e) {
//     setFailed(getErrorMessage(e))
//   }
// }
