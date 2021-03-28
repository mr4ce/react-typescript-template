const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.less$/i,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    strictMath: true,
                  },
                },
              },
            ],
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ]
      }
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(process.cwd(), './src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' })
  ]
};
