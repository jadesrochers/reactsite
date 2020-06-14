const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");

// Tells the html plugin where to find the source template.
// In production mode this will output the html file with the bundle 
// linked to is so that it can be viewed as a webpage.
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/template/index.html",
  filename: "./index.html"
});

// Specify packages to load from cdn
// instead of needing them as dependencies. Will specify the version
// from your package.json.
const webpackCdnPlugin = new WebpackCdnPlugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'umd/react.production.min.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'umd/react-dom.production.min.js',
        },
      ],
      publicPath: '/node_modules'
    })


// Production mode automatically sets usedExports: true
// This config just sets a bundle type (umd)
// and makes sure everything gets run through babel loader.
// WHEN BUNDLING WEBSITE: 
// Since this will be a website bundle, include all dependencies,
// or set them up from CDN.
const config = {
  mode: 'production',
  entry: './src/index.js',

  // Even when you load other assets (images, data files, css, ...)
  // You only need to specify the output path/filename,
  // and then configure your loaders and they will do their own thing.
  // This is not where the output/links for all those assets is handled.
  output: {
    path: path.resolve(__dirname, './prodbuild'),
    filename: 'bundle.js',
  },

  plugins: [
    htmlWebpackPlugin,
    webpackCdnPlugin,
  ],

  // This is where asset loading is handled. It is done with configuration
  // of the specific loader you are working with.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        include: [
          path.resolve(__dirname ),
        ],
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },

  // React as external because it is loaded from a cdn.
  externals: {
  'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
   },
  'react-dom': 'ReactDOM',
  },

}

module.exports = config;
