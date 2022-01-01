const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/scripts/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              emitFile: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/templates/index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new WebpackPwaManifest({
      name: "Restologue - A minimalist restaurants catalogue",
      short_name: "Restologue",
      description:
        "Restaurants catalogue. Find a place to bring happines for your tummy",
      background_color: "#ffffff",
      theme_color: "#e48900",
      inject: true,
      display: "standalone",
      start_url: "/",
      fingerprints: false,
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, "src/public/icons/favicon.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          purpose: "maskable",
          ios: true,
          destination: "icons",
        },
        {
          src: path.resolve(__dirname, "src/public/icons/favicon.png"),
          size: "144x144",
          purpose: "any",
          destination: "icons",
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, "src/scripts/sw.js"),
    }),
  ],
  resolve: {
    alias: {
      "~/data": path.resolve(__dirname, "src/scripts/data"),
      "~/globals": path.resolve(__dirname, "src/scripts/globals"),
      "~/styles": path.resolve(__dirname, "src/styles"),
      "~/routes": path.resolve(__dirname, "src/scripts/routes"),
      "~/utils": path.resolve(__dirname, "src/scripts/utils"),
      "~/views": path.resolve(__dirname, "src/scripts/views"),
    },
  },
};
