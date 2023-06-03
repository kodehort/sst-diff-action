import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  target: 'node16',
  format: ['cjs'],
  platform: 'node',
  minify: false,
  noExternal: [
    '@actions/core',
    '@aws-sdk/client-cloudformation',
    '@aws-cdk/cloudformation-diff',
    '@aws-cdk/cloud-assembly-schema',
    'aws-cdk-lib/cx-api',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
})
