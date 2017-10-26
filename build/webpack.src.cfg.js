const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractDarkLess = new ExtractTextPlugin('../css/theme-dark.css');
const ExtractChalkLess = new ExtractTextPlugin('../css/theme-chalk.css');
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
        loader: "vue-loader",
        options: {
          loaders: {
            "scss": ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: ["css-loader", "sass-loader"]
            }),
            "css": ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: "css-loader"
            })
          }
        }
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "../src/theme-dark"),
        loader: ExtractDarkLess.extract(["less-loader"])
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "../src/theme-chalk"),
        loader: ExtractChalkLess.extract(["less-loader"])
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
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
      new ExtractTextPlugin("styles.css"),
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