import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    //Specifies that the output of the build will be a library.
    lib: {
      //Defines the entry point for the library build. It resolves
      //to src/index.ts,indicating that the library starts from this file.
      entry: path.resolve(__dirname, 'src/main.ts'),
      //A function that generates the output file
      //name for different formats during the build
      fileName: (format) => `index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    //Generates sourcemaps for the built files,
    //aiding in debugging.
    sourcemap: false,
    //Clears the output directory before building.
    emptyOutDir: true,
    outDir: 'dist/styles',
  },
  //react() enables React support.
  //dts() generates TypeScript declaration files (*.d.ts)
  //during the build.
  plugins: [react()],
});
