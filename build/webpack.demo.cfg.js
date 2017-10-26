const path = require("path");

module.exports = {
  entry: {
    demo: path.resolve(__dirname, "../example/main")
  },
  output: {
    path: path.resolve(__dirname, "../dist/demo"),
    filename: "[name].js",
    publicPath: "/a/b"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".vue"]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 8087
  }
};