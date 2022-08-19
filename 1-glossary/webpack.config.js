require("dotenv").config();

const path = require("path");
// const DIST_DIR = path.resolve(__dirname, 'public');
// const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000
          },
          options: {
            outputPath: 'images'
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      loader: 'file-loader'
    }
    ],
  },
};
