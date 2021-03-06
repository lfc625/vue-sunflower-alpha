const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractDarkLess = new ExtractTextPlugin('theme-dark.css');
const ExtractChalkLess = new ExtractTextPlugin('theme-chalk.css');

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
        test: /theme-dark[\s\S]*\.(less|css)$/,
        loader: ExtractDarkLess.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader", "less-loader"]
        })
      },
      {
        test: /theme-chalk[\s\S]*\.(less|css)$/,
        loader: ExtractChalkLess.extract({
          fallback: "style-loader",
          use: ["css-loader", "autoprefixer-loader", "less-loader"]
        })
      },
      {
        test: /\.(svg|png)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    ExtractDarkLess,
    ExtractChalkLess
  ],
  resolve: {
    extensions: [".js", ".json", ".vue"]
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: 8087
  }
};