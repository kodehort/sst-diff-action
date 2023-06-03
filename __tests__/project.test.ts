import * as fs from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { initProject } from '../src/project'

const testDirectoryPath = path.join(__dirname, 'test')
const testConfigFilePath = path.join(testDirectoryPath, 'sst.config.ts')
const testDistDirectoryPath = path.join(testDirectoryPath, '.sst', 'dist')

describe('project', () => {
  beforeEach(async () => {
    await fs.promises.mkdir(testDirectoryPath, { recursive: true })
    await fs.promises.mkdir(testDistDirectoryPath, { recursive: true })
    await fs.promises.writeFile(testConfigFilePath, '', { encoding: 'utf8' })
  })

  afterEach(async () => {
    await fs.promises.unlink(testConfigFilePath)
  })

  it('throws an error if no config file is found', async () => {
    await expect(initProject({ stage: 'test' })).rejects.toThrow(
      'Could not find a config file',
    )
  })

  it('locates the sst project as expected', async () => {
    vi.spyOn(process, 'cwd').mockReturnValue(testDirectoryPath)
    const project = await initProject({ stage: 'test' })
    expect(project).toMatchSnapshot()
  })
})
