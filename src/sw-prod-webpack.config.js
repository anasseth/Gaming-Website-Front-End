var path = require("path");
module.exports = {
  mode: "production",
  entry: path.join(__dirname, "service-worker.ts"),
  output: {
    path: path.resolve("dist", "game-ui"),
    filename: "service-worker.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".wasm", ".mjs", ".js", ".json"],
  },
};
