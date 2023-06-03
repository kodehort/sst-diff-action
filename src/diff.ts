import { summary } from '@actions/core'
import {
  CloudFormationClient,
  GetTemplateCommand,
} from '@aws-sdk/client-cloudformation'
import { type Template } from 'aws-cdk-lib/assertions'
import { type Project } from './project'
import { Stacks } from './stacks'

const stackNameToId = (stackName: string) => {
  return stackName
}

export const writeSummary = async (project: Project): Promise<void> => {
  // Build app
  const assembly = await Stacks.loadAssembly(project.paths.dist)

  summary.addHeading(`Summary diff against ${project.config.stage}`)

  // Diff each stack
  let changesAcc = 0
  let changedStacks = 0
  for (const stack of assembly.stacks) {
    // get old template
    const oldTemplate = await getTemplate(stack.stackName)
    if (!oldTemplate) {
      summary.addHeading(`${stackNameToId(stack.stackName)}: New stack`, 2)
      summary.addSeparator()
      continue
    }

    // generate diff
    const { count, diff } = await Stacks.diff(stack, oldTemplate)

    // print diff result
    if (count === 0) {
      summary.addHeading(`${stackNameToId(stack.stackName)}: No changes`, 2)
    } else if (count === 1) {
      summary.addHeading(
        `${stackNameToId(stack.stackName)}: ${count} change`,
        2,
      )
      summary.addCodeBlock(diff as string, 'diff')
      changesAcc += count
      changedStacks++
    } else {
      summary.addHeading(
        `${stackNameToId(stack.stackName)}: ${count} changes`,
        2,
      )
      summary.addCodeBlock(diff as string, 'diff')

      changesAcc += count
      changedStacks++
    }
    summary.addBreak()
    summary.addSeparator()
    summary.addBreak()
  }

  // Handle no changes
  if (changedStacks === 0) {
    summary.addRaw('No changes')
  } else {
    summary.addRaw(
      `${changesAcc === 1 ? '1 change found in' : `${changesAcc} changes in`} ${
        changedStacks === 1 ? '1 stack' : `${changedStacks} stacks`
      }`,
    )
  }

  await summary.write()
}

async function getTemplate(stackName: string): Promise<Template | undefined> {
  const client = new CloudFormationClient({})
  const response = await client.send(
    new GetTemplateCommand({ StackName: stackName }),
  )
  if (!response.TemplateBody) return undefined
  return JSON.parse(response.TemplateBody) as Template
}
