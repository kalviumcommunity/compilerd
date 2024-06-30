// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");
const isProduction = process.env.NODE_ENV == "production";
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");
const APP_DIR = path.resolve(__dirname, "./src");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["javascript", "python", "java", "c", "cpp"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // CSS loader rule for your application
      {
        test: /\.css$/,
        include: APP_DIR,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
      // CSS loader rule for monaco-editor
      {
        test: /\.css$/,
        include: MONACO_DIR,
        use: ["style-loader", "css-loader"],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};

module.exports = function override(config, env) {
  config.plugins.push(
    new MonacoWebpackPlugin({
      languages: ["javascript", "python", "java", "c", "cpp"],
    })
  );
  return config;
};
