import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default [
  {
    input: 'src/main.jsx',
    output: {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
    plugins: [

      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      }),
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json'],
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      }),

      postcss({
        plugins: []
      }),

      copy({
        targets: [
          { src: 'src/index.html', dest: 'dist' }
        ]
      }),
      (NODE_ENV == 'production' && terser()),
      (NODE_ENV !== 'production' && serve({ contentBase: 'dist' })),
      (NODE_ENV !== 'production' && livereload()),
    ]
  },
]