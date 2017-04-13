import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import typescript      from 'rollup-plugin-typescript'
import uglify      from 'rollup-plugin-uglify'
//paths are relative to the execution path
export default {
  entry: 'src/main-aot.js',
  dest: 'dist/build.js', // output a single application bundle
  sourceMap: true,
  sourceMapFile: 'aot/dist/build.js.map',
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings
    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // intercepts in some rollup versions
    if ( typeof warning === 'string' && warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }
    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
    nodeResolve({jsnext: true, module: true, extensions: [ '.ts', '.js', '.json' ]}),
    typescript({
      typescript: require("typescript")
    }),
    commonjs({
      include: ['node_modules/rxjs/**'],
    }),
    uglify()
  ]
}
