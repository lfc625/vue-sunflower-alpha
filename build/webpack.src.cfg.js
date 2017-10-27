const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractDarkLess = new ExtractTextPlugin('theme-dark.css');
const ExtractChalkLess = new ExtractTextPlugin('theme-chalk.css');
module.exports = {
  entry: {
    sunflower: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist/sunflower"),
    filename: "[name].js",
    library: "Sunflower",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractDarkLess.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
      new UglifyJSPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        comments: false
      }),
      ExtractDarkLess,
      ExtractChalkLess
  ],
  externals: {
    echarts: "echarts",
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  resolve: {
    extensions: [".js", ".json", ".vue"]
  }
};