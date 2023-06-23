import { ArtifactMetadataEntryType } from '@aws-cdk/cloud-assembly-schema'

// prettier-ignore
import { type FormatStream, type TemplateDiff, diffTemplate, formatDifferences } from '@aws-cdk/cloudformation-diff';

import { type Template } from 'aws-cdk-lib/assertions'
import {
  CloudAssembly,
  type CloudFormationStackArtifact,
} from 'aws-cdk-lib/cx-api'

export * as Stacks from './stacks'

export function diff(
  stack: CloudFormationStackArtifact,
  oldTemplate: Template,
) {
  // Generate diff
  const diffOutput: TemplateDiff = diffTemplate(
    oldTemplate,
    stack.template as Template,
  )
  if (diffOutput.isEmpty) {
    return { count: 0 }
  }

  // Only display resource and output changes
  // @ts-expect-error
  diffOutput.iamChanges = { hasChanges: false }
  // @ts-expect-error
  diffOutput.securityGroupChanges = { hasChanges: false }
  // @ts-expect-error
  diffOutput.awsTemplateFormatVersion = false
  // @ts-expect-error
  diffOutput.transform = false
  // @ts-expect-error
  diffOutput.description = false
  // @ts-expect-error
  diffOutput.parameters = { differenceCount: 0 }
  // @ts-expect-error
  diffOutput.metadata = { differenceCount: 0 }
  // @ts-expect-error
  diffOutput.mappings = { differenceCount: 0 }
  // @ts-expect-error
  diffOutput.conditions = { differenceCount: 0 }
  // @ts-expect-error
  diffOutput.unknown = { differenceCount: 0 }

  // Filter out SST internal diffs
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // @ts-expect-error
  delete diffOutput.outputs.diffs?.SSTMetadata
  /* eslint-enable */

  // Format diff
  const output: string[] = []
  const stream = {
    write(chunk: string) {
      output.push(`   ${chunk}`)
    },
  } as FormatStream
  const pathMap = buildLogicalToPathMap(stack)
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

function buildLogicalToPathMap(stack: CloudFormationStackArtifact) {
  const map: Record<string, string> = {}
  for (const md of stack.findMetadataByType(
    ArtifactMetadataEntryType.LOGICAL_ID,
  )) {
    map[md.data as string] = md.path
  }

  return map
}

export function loadAssembly(from: string) {
  return new CloudAssembly(from)
}
