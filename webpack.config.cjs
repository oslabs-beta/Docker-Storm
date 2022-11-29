/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './dist/client/index.jsx',
  //entry: './src/client/index.tsx',
  
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  
  plugins: [
    new HTMLWebpackPlugin ({
      template: './src/client/index.html'
    })
  ],
  
  resolve: {
    extensions: ['.js', '.jsx'],    
  },
  
  mode: process.env.NODE_ENV,

  module: {
    rules: [
      {
        test: /\.(js|jsx|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', {'runtime': 'automatic'}]]
          }
        }
      },

      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
      publicPath: '/',
    },
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3001',
    }
  }

};
