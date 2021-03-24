console.log('process.versions.node', process.versions.node)
console.log('process.versions.v8', process.versions.v8)

require('bytenode').compileFile({
  filename: './dist-obf/main.js',
  output: './dist-obf/main.jsc'
});


process.exit(0)