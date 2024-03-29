import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['cjs'],
  minify: false,
  noExternal: [
    '@actions/core',
    '@actions/exec',
    '@actions/github',
    '@aws-sdk/client-cloudformation',
    '@aws-cdk/cloudformation-diff',
    '@aws-cdk/cloud-assembly-schema',
    'aws-cdk-lib/cx-api',
  ],
  platform: 'node',
  sourcemap: false,
  splitting: false,
  target: 'node16',
})
