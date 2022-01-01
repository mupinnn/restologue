const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozJpeg = require("imagemin-mozjpeg");
const ImageminPngquant = require("imagemin-pngquant");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozJpeg({
          quality: 50,
          progressive: true,
        }),
        ImageminPngquant({
          quality: [0.5, 0.6],
        }),
      ],
    }),
  ],
});
