import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import sass from 'sass';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const postCssConfig = {
  extract: true,
  minimize: process.env.NODE_ENV === 'production',
  extensions: ['css', 'scss'],
  process: function (context, payload) {
    return new Promise((resolve, reject) => {
      sass.render({
        file: context
      }, function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  }
};

export default {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    postcss(postCssConfig),
    production && terser()
  ]
};
