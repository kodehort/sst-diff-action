import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  target: 'node16',
  format: ['esm'],
  platform: 'node',
  minify: true,
  noExternal: [/(.*)/],
  splitting: false,
  sourcemap: false,
  clean: true,
})