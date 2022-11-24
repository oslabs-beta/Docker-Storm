/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.cts','.tsx', '.ts', '.js']
  },
  devtool: 'inline-source-map',
  entry: './dist/client/electron/index.cjs',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'StormElectron.js'
  }
};