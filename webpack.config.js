var path = require('path')

module.exports = {
  entry: path.join(__dirname, '/index.js'),
  alias: {
    'buffer': 'buffer/' // 确保所有对'buffer'的引用都指向npm包
  },
  externals: {
    crypto: 'crypto'
  },
  output: {
    library: 'radiantjs',
    path: path.join(__dirname, '/'),
    filename: 'radiant.min.js'
  },
  mode: 'production'
}
