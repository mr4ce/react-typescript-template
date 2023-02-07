const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    static: "./public",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
            ],
          },
          {
            test: /\.module.less$/i,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    mode: 'local',
                    auto: true,
                    exportGlobals: true,
                    localIdentName: "[local]--[hash:base64:5]",
                  },
                }
              },
              { loader: "postcss-loader" },
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
            test: /\.less$/i,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" },
              { loader: "postcss-loader" },
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
      minify: false,
      template: "public/index.html",
    }),
  ]
});
