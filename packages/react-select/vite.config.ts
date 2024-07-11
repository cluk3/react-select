import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig((configEnv) => ({
  build: {
    //Specifies that the output of the build will be a library.
    cssCodeSplit: true,
    lib: {
      //Defines the entry point for the library build. It resolves
      //to src/index.ts,indicating that the library starts from this file.
      entry: {
        styles: path.resolve(__dirname, 'src/styles.css'),
        main: path.resolve(__dirname, 'src/index.ts'),

        base: path.resolve(__dirname, 'src/base/index.ts'),
        animated: path.resolve(__dirname, 'src/animated/index.ts'),
        async: path.resolve(__dirname, 'src/async/index.ts'),
        creatable: path.resolve(__dirname, 'src/creatable/index.ts'),
        'async-creatable': path.resolve(
          __dirname,
          'src/async-creatable/index.ts'
        ),
      },
      //A function that generates the output file
      //name for different formats during the build
      fileName: (format, entryName) =>
        `react-select${entryName === 'main' ? '' : `-${entryName}`}.${format}.js`,
      formats: ['es', 'cjs'],
      name: 'react-select',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    //Generates sourcemaps for the built files,
    //aiding in debugging.
    sourcemap: configEnv.mode === 'development',
    //Clears the output directory before building.
    emptyOutDir: configEnv.mode !== 'development',
    outDir: 'dist',
  },
  //react() enables React support.
  //dts() generates TypeScript declaration files (*.d.ts)
  //during the build.
  plugins: [react(), dts({ insertTypesEntry: true })],
}));
