const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  // const campaignID = process.env.npm_config_campaignid;
  // npm run buildtest --campaignid=1
  const campaignID = argv.campaignid;
  console.log("Campaign ID: ", campaignID)


  let distFolder = `dist/${campaignID ? campaignID : ""}`;

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      // path: path.resolve(__dirname, "dist/"),
      path: path.resolve(__dirname, distFolder),
      filename: "assets/js/react-wheels.js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "static/media/[name].[ext]"
            }
          }
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          loader: require.resolve("file-loader"),
          options: {
            name: "static/media/[name].[ext]"
          }
        },
        {
          test: /\.mp3$/,
          loader: require.resolve("file-loader"),
          query: {
            name: 'static/media/[name].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].css",
          chunkFilename: "assets/css/[name].css"
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        inject: true
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        )
      })
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false
            },
            mangle: {
              safari10: true
            },
            output: {
              comments: false,
              ascii_only: true
            },
            warnings: false
          }
        }),
        new OptimizeCssAssetsPlugin()
      ],
      // splitChunks: {
      //   chunks: "all",
      //   minSize: 0,
      //   maxInitialRequests: 10,
      //   maxAsyncRequests: 10,
      //   cacheGroups: {
      //     vendors: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name(module, chunks, cacheGroupKey) {
      //         const packageName = module.context.match(
      //           /[\\/]node_modules[\\/](.*?)([\\/]|$)/
      //         )[1];
      //         return `${cacheGroupKey}.${packageName.replace("@", "")}`;
      //       }
      //     },
      //     common: {
      //       minChunks: 2,
      //       priority: -10
      //     }
      //   }
      // },
      // runtimeChunk: "single"
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
      overlay: true
    }
  };
};
