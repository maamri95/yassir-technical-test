import { defineConfig } from 'vite';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/contracts/http-client',

  plugins: [nxViteTsPaths()],

  // Uncomment this if you are using workers.
  worker: {
   plugins: () => [ nxViteTsPaths() ],
  },

  test: {
    watch: false,
    globals: true,
    cache: { dir: '../../node_modules/.vitest/contracts/http-client' },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/contracts/http-client',
      provider: 'v8',
      reporter: ['html', "json", "text"],
    },
  },
});
