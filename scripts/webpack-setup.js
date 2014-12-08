var webpack = require("webpack");
var outputHtml = require('./webpack-html');

/**
 * # Webpack Setup Helpers
 */

function setupWebpack (opts) {
  var env = opts.env;

  var config = {
    // Input files --> Output files
    entry: opts.entries,
    output: {
      filename: "[name]-[chunkhash].js",
      path: opts.dest
    },

    // Dev env
    debug: env.debug,
    devtool: env.debug ? 'eval-source-map' : 'source-map',

    // `require` config
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: opts.alias
    },
    target: 'web',

    // Loaders
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: (env.dev_server ? 'react-hot!' : '') + "jsx-loader?harmony"
        }
      ]
    },

    // Default Post-processing plugins
    plugins: [
      // Define global variables
      new webpack.DefinePlugin({
        "process.env": {
          'NODE_ENV': JSON.stringify(env.name),
          'BROWSER': JSON.stringify(true)
        }
      }),
      // 'Vendor' bundle, containing external dependencies
      new webpack.optimize.CommonsChunkPlugin(
        'vendor', 'vendor-[chunkhash].js', Infinity
      ),
      outputHtml({
        filename: 'index.html',
        template: opts.html.template,
        chunk: 'app',
        env: env
      })
    ]
  };

  if (env.compress) {
    // Append some minification plugins
    config.plugins = config.plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        comments: /@license|@preserv|@copyright/gi
      })
    ]);
  }

  if (env.dev_server) {
    // Run development server, enable hot module replacement
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.entry.hot = [
      "webpack-dev-server/client?http://localhost:" + env.dev_server_port,
      "webpack/hot/dev-server"
    ];
  }

  return webpack(config);
}

function compileScripts (opts, callback) {
  var env = opts.env;
  var compiler = setupWebpack(opts);

  if (env.watch) {
    if (env.dev_server) {
      var DevServer = require("webpack-dev-server");

      var server = new DevServer(compiler, {
        contentBase: opts.dest,
        hot: true,
        watchDelay: env.watch_delay,
        stats: opts.stats_settings
      });

      server.listen(env.dev_server_port, function () {
        console.log(
          "Dev server started on http://localhost:" + env.dev_server_port + "/"
        );
      });
    } else {
      compiler.watch(env.watch_delay, callback);
    }
  } else {
    compiler.run(callback);
  }
}

module.exports = compileScripts;
