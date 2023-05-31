import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dir: './__tests__',
    testTimeout: 30000,
  },
})
