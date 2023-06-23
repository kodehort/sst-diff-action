import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/main.ts'],
  format: ['cjs'],
  minify: true,
  noExternal: [
    '@actions/core',
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
