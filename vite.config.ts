import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['lib'],
      // Storybook `meta` uses `satisfies Meta<typeof Component>` / props that reference
      // unexported or dependency-internal types, which causes TS4023 in emitted .d.ts.
      exclude: ['**/*.stories.tsx', 'node_modules/**'],
      // rollupTypes bundles .d.ts via API Extractor; it was emitting `export {}` only
      // and broke consumer imports like `import { Button } from '…'`.
      rollupTypes: false,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    lib: {
      entry: {
        'malbec-ui': resolve(import.meta.dirname, 'lib/main.ts'),
        icons: resolve(import.meta.dirname, 'lib/icons/index.ts'),
      },
      name: 'malbec-ui',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    emptyOutDir: true,
    rolldownOptions: {
      // vite-plugin-dts runs for several seconds; Rolldown flags high plugin time vs.
      // the native link stage. Not actionable without replacing dts (see
      // https://rolldown.rs/options/checks#plugintimings).
      checks: { pluginTimings: false },
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(import.meta.dirname, "lib"),
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'lucide-react': 'LucideReact',
        },
      },
    },
  }
})
