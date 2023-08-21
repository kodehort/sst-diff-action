import fs from 'fs'
import path from 'path'

import { summary } from '@actions/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { writeSummary } from '../src/diff'

export const SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY'
const testDirectoryPath = path.join(__dirname, 'test')
const testFilePath = path.join(testDirectoryPath, 'test-summary.md')

describe('diff', () => {
  beforeEach(async () => {
    process.env[SUMMARY_ENV_VAR] = testFilePath
    await fs.promises.mkdir(testDirectoryPath, { recursive: true })
    await fs.promises.writeFile(testFilePath, '', { encoding: 'utf8' })
    summary.emptyBuffer()
  })

  afterEach(async () => {
    await fs.promises.unlink(testFilePath)
    vi.restoreAllMocks()
  })

  it('extracts the diff as expected', async () => {
    await writeSummary({
      config: {
        stage: 'production',
      },
      paths: {
        config: '',
        out: '',
        dist: '',
      },
    })
    const file = await fs.promises.readFile(testFilePath, { encoding: 'utf8' })
    expect(file).toMatchSnapshot()
  })
})

vi.mock('@aws-sdk/client-cloudformation', async () => {
  const CloudFormationClient = vi.fn()
  CloudFormationClient.prototype.send = vi.fn().mockReturnValue({
    TemplateBody: '{}',
  })
  const GetTemplateCommand = vi.fn()

  return { CloudFormationClient, GetTemplateCommand }
})

vi.mock('../src/stacks', () => {
  return {
    Stacks: {
      loadAssembly: vi.fn().mockReturnValue({
        stacks: [
          {
            id: 'production-saas-Web',
            stackName: 'production-saas-Web',
            assets: [],
            displayName: 'production-saas-Web',
            name: 'production-saas-Web',
            originalName: 'production-saas-Web',
          },
        ],
      }),
      diff: vi.fn().mockReturnValue({
        count: 2,
        diff:
          '   \x1B[37m\x1B[4m\x1B[1mResources\x1B[22m\x1B[24m\x1B[39m\n' +
          '   \x1B[37m\x1B[33m[~]\x1B[39m\x1B[37m \x1B[36mCustom::SSTBucketDeployment\x1B[39m\x1B[37m app/S3Deployment \x1B[90mappS3Deployment7E67F692\x1B[39m\x1B[37m \x1B[39m\n' +
          '   \x1B[37m ├─ \x1B[33m[~]\x1B[39m\x1B[37m Filenames\x1B[39m\n' +
          '   \x1B[37m │   └─ \x1B[33m[~]\x1B[39m\x1B[37m \x1B[34m.ObjectKey\x1B[39m\x1B[37m:\x1B[39m\n' +
          '   \x1B[37m │       ├─ \x1B[31m[-]\x1B[39m\x1B[37m \x1B[31m40630b963dd7391eecabb1df1dd91a5f99bd6750bc194555a76f1fecb2f4e725.40630b963dd7391eecabb1df1dd91a5f99bd6750bc194555a76f1fecb2f4e725\x1B[39m\x1B[37m\x1B[39m\n' +
          '   \x1B[37m │       └─ \x1B[32m[+]\x1B[39m\x1B[37m \x1B[32m8bb6c67f688d46398545f50eb4f82bdd7236eac57933911dd82820eb40030929.8bb6c67f688d46398545f50eb4f82bdd7236eac57933911dd82820eb40030929\x1B[39m\x1B[37m\x1B[39m\n' +
          '   \x1B[37m └─ \x1B[33m[~]\x1B[39m\x1B[37m Sources\x1B[39m\n' +
          '   \x1B[37m     └─ \x1B[35m@@ -1,6 +1,6 @@\x1B[39m\x1B[37m\x1B[39m\n' +
          '   \x1B[37m        \x1B[90m[ ]\x1B[39m\x1B[37m [\x1B[39m\n' +
          '   \x1B[37m        \x1B[90m[ ]\x1B[39m\x1B[37m   {\x1B[39m\n' +
          '   \x1B[37m        \x1B[90m[ ]\x1B[39m\x1B[37m     "BucketName": "cdk-hnb659fds-assets-194218796960-eu-west-2",\x1B[39m\n' +
          '   \x1B[37m        \x1B[1m\x1B[31m[-]\x1B[39m\x1B[37m \x1B[31m    "ObjectKey": "c355ac0582dbfd2fb3eb30b266a7c8310f1f89f1d85c17411608e247c1f5ce7a.zip"\x1B[39m\x1B[37m\x1B[22m\x1B[39m\n' +
          '   \x1B[37m        \x1B[1m\x1B[32m[+]\x1B[39m\x1B[37m \x1B[32m    "ObjectKey": "4d84f4fea185796a31b799e9ff4dfd98a998414d9cd905f97eb6ed5195d26c92.zip"\x1B[39m\x1B[37m\x1B[22m\x1B[39m\n' +
          '   \x1B[37m        \x1B[90m[ ]\x1B[39m\x1B[37m   }\x1B[39m\n' +
          '   \x1B[37m        \x1B[90m[ ]\x1B[39m\x1B[37m ]\x1B[39m\n' +
          '   \x1B[37m\x1B[33m[~]\x1B[39m\x1B[37m \x1B[36mCustom::CloudFrontInvalidator\x1B[39m\x1B[37m app/CloudFrontInvalidator \x1B[90mappCloudFrontInvalidatorC64AD319\x1B[39m\x1B[37m \x1B[39m\n' +
          '   \x1B[37m └─ \x1B[33m[~]\x1B[39m\x1B[37m assetsHash\x1B[39m\n' +
          '   \x1B[37m     ├─ \x1B[31m[-]\x1B[39m\x1B[37m \x1B[31mdd7c127bf063c0ddc1a7ebc2530bce06\x1B[39m\x1B[37m\x1B[39m\n' +
          '   \x1B[37m     └─ \x1B[32m[+]\x1B[39m\x1B[37m \x1B[32m2842d048ff4082d1785db59e5bad67c3\x1B[39m\x1B[37m\x1B[39m\n',
      }),
    },
  }
})
