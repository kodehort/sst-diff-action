import * as core from '@actions/core'
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
  const assembly = Stacks.loadAssembly(project.paths.dist)

  core.summary.addHeading(
    `Changes that will be deployed to ${project.config.stage}`,
    2,
  )

  // Diff each stack
  let changesAcc = 0
  let changedStacks = 0
  for (const stack of assembly.stacks) {
    // get old template
    const oldTemplate = await getTemplate(stack.stackName)
    if (!oldTemplate) {
      core.summary.addHeading(`${stackNameToId(stack.stackName)}: New stack`, 3)
      continue
    }

    // generate diff
    const { count, diff } = Stacks.diff(stack, oldTemplate)

    // print diff result
    if (count === 0) {
      core.summary.addHeading(
        `${stackNameToId(stack.stackName)}: No changes`,
        3,
      )
    } else if (count === 1) {
      core.summary.addHeading(
        `${stackNameToId(stack.stackName)}: ${count} change`,
        3,
      )
      if (diff) {
        core.summary.addCodeBlock(diff)
      }

      changesAcc += count
      changedStacks++
    } else {
      core.summary.addHeading(
        `${stackNameToId(stack.stackName)}: ${count} changes`,
        3,
      )
      if (diff) {
        core.summary.addCodeBlock(diff, 'diff')
      }

      changesAcc += count
      changedStacks++
    }

    core.summary.addBreak()
  }

  core.summary.addSeparator()
  // Handle no changes
  if (changedStacks === 0) {
    core.summary.addRaw('No changes')
  } else {
    core.summary.addRaw(
      `${changesAcc === 1 ? '1 change found in' : `${changesAcc} changes in`} ${
        changedStacks === 1 ? '1 stack' : `${changedStacks} stacks`
      } to be deployed.`,
    )
  }

  await core.summary.write()
}

async function getTemplate(stackName: string): Promise<Template | undefined> {
  const client = new CloudFormationClient({})
  const response = await client.send(
    new GetTemplateCommand({ StackName: stackName }),
  )
  if (!response.TemplateBody) return undefined
  return JSON.parse(response.TemplateBody) as Template
}
