const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    // workaround for html not reload on change when HMR enabled.
    // ref: https://github.com/webpack/webpack-dev-server/issues/1271#issuecomment-379792541
    before: function (app, server) {
      server._watch("src/**/*.html");
    },
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    open: true,
    writeToDisk: true,
  },
});
