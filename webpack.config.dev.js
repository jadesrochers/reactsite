const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");

// Tells the html plugin where to find the source template.
// The filename is not used if you are running this with webpack-dev-server
// because it does everything in memory.
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/template/index.html",
  filename: "./index.html"
});

// Experimenting with this one; specify packages to load from cdn
// instead of needing them as dependencies. Will specify the same
// version as in your package.json.
const webpackCdnPlugin = new WebpackCdnPlugin({
      modules: [
        {
          name: 'react',
          var: 'React',
          path: 'umd/react.development.js',
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: 'umd/react-dom.development.js',
        },
      ],
      publicPath: '/node_modules'
    })


// The dev server will load the code bundle into the index.html.
// webpack-dev-server does everything in memory so you will not see
// any files output, so no output dir or bundle name needed.
const config = {
  mode: 'development',
  entry: [ './src/index.js', ],

  // The devServer config sets historyApiFallback: true, which directs
  // all request failures to index.html, which is needed for Reach Router.
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    inline: true,
  },

  // Use the htmlWebpackPlugin to attach the code to the html template
  // and then run this with the webpack-dev-server to make things work.
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    htmlWebpackPlugin,
    webpackCdnPlugin,
  ],

  // module specify what to do with different (JS,CSS,HTML) code.
  // Using style/css/html loaders, and babel for JS. 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname ),
          path.resolve(__dirname, '..', 'src'),
        ],
        use: { loader: 'babel-loader',
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
 
  // React as external for the code bundle because it is being loaded
  // from the cdn.
  externals: {
  'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
   },
  'react-dom': 'ReactDOM',
  },

};


module.exports = config
