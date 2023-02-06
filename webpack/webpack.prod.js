const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
            ],
          },
          {
            test: /\.less$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
              },
              {
                loader: "postcss-loader",
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
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].min.css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ]
  },
  output: {
    filename: "static/js/bundle.[fullhash:8].min.js",
    publicPath: "/",
    path: path.resolve(__dirname, process.cwd(), "build"),
  },
});
