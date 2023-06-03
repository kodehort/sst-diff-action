import { ArtifactMetadataEntryType } from '@aws-cdk/cloud-assembly-schema'
import type { FormatStream } from '@aws-cdk/cloudformation-diff'
import { diffTemplate, formatDifferences } from '@aws-cdk/cloudformation-diff'
import { type Template } from 'aws-cdk-lib/assertions'
import type { CloudFormationStackArtifact } from 'aws-cdk-lib/cx-api'
import { CloudAssembly } from 'aws-cdk-lib/cx-api'

export * as Stacks from './stacks'

export async function diff(
  stack: CloudFormationStackArtifact,
  oldTemplate: Template,
) {
  // Generate diff
  const diffOutput = diffTemplate(oldTemplate, stack.template)
  if (diffOutput.isEmpty) {
    return { count: 0 }
  }

  // Only display resource and output changes
  // @ts-ignore
  diffOutput.iamChanges = { hasChanges: false }
  // @ts-ignore
  diffOutput.securityGroupChanges = { hasChanges: false }
  // @ts-ignore
  diffOutput.awsTemplateFormatVersion = false
  // @ts-ignore
  diffOutput.transform = false
  // @ts-ignore
  diffOutput.description = false
  // @ts-ignore
  diffOutput.parameters = { differenceCount: 0 }
  // @ts-ignore
  diffOutput.metadata = { differenceCount: 0 }
  // @ts-ignore
  diffOutput.mappings = { differenceCount: 0 }
  // @ts-ignore
  diffOutput.conditions = { differenceCount: 0 }
  // @ts-ignore
  diffOutput.unknown = { differenceCount: 0 }

  // Filter out SST internal diffs
  // @ts-ignore
  delete diffOutput.outputs.diffs?.['SSTMetadata']

  // Format diff
  const output: string[] = []
  const stream = {
    write(chunk: string) {
      output.push(`   ${chunk}`)
    },
  } as FormatStream
  const pathMap = await buildLogicalToPathMap(stack)
  formatDifferences(stream, diffOutput, pathMap)

  // Remove trailing newline
  while (true) {
    if (output[output.length - 1]?.match(/^\s*$/)) {
      output.pop()
    } else {
      break
    }
  }

  return {
    count:
      diffOutput.outputs.differenceCount + diffOutput.resources.differenceCount,
    diff: output.join(''),
  }
}

async function buildLogicalToPathMap(stack: CloudFormationStackArtifact) {
  const map: { [id: string]: string } = {}
  for (const md of stack.findMetadataByType(
    ArtifactMetadataEntryType.LOGICAL_ID,
  )) {
    map[md.data as string] = md.path
  }
  return map
}

export async function loadAssembly(from: string) {
  return new CloudAssembly(from)
}
