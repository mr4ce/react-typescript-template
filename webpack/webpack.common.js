const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 1000,
                  name: "static/images/[name].[hash:8].[ext]",
                },
              },
            ],
          },
          {
            test: /\.(eot|ttf|woff)/i,
            loader: "file-loader",
            options: {
              name: "static/fonts/[name].[hash:8].[ext]",
            },
          },
          {
            loader: "file-loader",
            exclude: /\.(js|json|html|mjs|jsx|ts|tsx|less|css)$/i,
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          {
            test: /\.tsx?$/i,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ]
      }
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(process.cwd(), "./src"),
    },
    extensions: [".ts", ".tsx", ".js"],
    modules: [
      path.resolve("node_modules"),
      path.resolve(__dirname, "src"),
    ],
    fallback: {
      "ansi-html-community": require.resolve("ansi-html-community/"),
      "events": require.resolve("events/"),
      "html-entities": require.resolve("html-entities/"),
    }
  },
};
