import { summary } from '@actions/core'
import {
  CloudFormationClient,
  GetTemplateCommand,
} from '@aws-sdk/client-cloudformation'
import { stackNameToId } from 'sst/cli/ui/stack'
import { useAWSClient } from 'sst/credentials'
import { useProject } from 'sst/project'
import { Stacks } from 'sst/stacks'

export const writeSummary = async (): Promise<void> => {
  const project = useProject()
  const assembly = await Stacks.synth({
    fn: project.stacks,
    mode: 'deploy',
  })

  // Diff each stack
  let changesAcc = 0
  let changedStacks = 0
  for (const stack of assembly.stacks) {
    // get old template
    const oldTemplate = await getTemplate(stack.stackName)
    if (!oldTemplate) {
      summary.addHeading(`${stackNameToId(stack.stackName)}: New stack`)
      summary.addSeparator()
      continue
    }

    // generate diff
    const { count, diff } = await Stacks.diff(stack, oldTemplate)

    // print diff result
    if (count === 0) {
      summary.addHeading(`${stackNameToId(stack.stackName)}: No changes`)
      summary.addSeparator()
    } else if (count === 1) {
      summary.addHeading(`${stackNameToId(stack.stackName)}: ${count} change`)
      summary.addCodeBlock(diff as string, 'diff')
      summary.addSeparator()
      changesAcc += count
      changedStacks++
    } else {
      summary.addHeading(`${stackNameToId(stack.stackName)}: ${count} changes`)
      summary.addCodeBlock(diff as string, 'diff')
      summary.addSeparator()
      changesAcc += count
      changedStacks++
    }
  }

  // Handle no changes
  if (changedStacks === 0) {
    summary.addHeading(`No changes`)
  } else {
    summary.addHeading(
      `${changesAcc === 1 ? '1 change found in' : `${changesAcc} changes in`} ${
        changedStacks === 1 ? '1 stack' : `${changedStacks} stacks`
      }`,
    )
  }
}

async function getTemplate(stackName: string) {
  try {
    const cfn = useAWSClient(CloudFormationClient)
    const response = await cfn.send(
      new GetTemplateCommand({ StackName: stackName }),
    )
    return JSON.parse(response.TemplateBody!)
  } catch (e: any) {
    if (e.name === 'ValidationError' && e.message.includes('does not exist')) {
      return
    }
    throw e
  }
}
