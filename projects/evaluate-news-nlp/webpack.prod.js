const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    entry: './src/client/index.js',
    output: {
      libraryTarget: "var",
      library: "Client",
      // this eliminates the need for the clean webpack plugin
      clean: true,
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
      optimization: {
        minimizer: [
          new TerserPlugin(),new CssMinimizerPlugin()
        ],
      },
      plugins: [
          new HtmlWebPackPlugin({
              template: "./src/client/views/index.html",
              filename: "./index.html",
          }),
          new MiniCssExtractPlugin({
              filename: "[name].css"
          })
      ]
    };
