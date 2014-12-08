/**
 * # Build Frontend Modules
 */

var path = require('path');
var gulp = require('gulp');
var _ = require('lodash');
var compileScripts = require('./scripts/webpack-setup');

/**
 * ## Configuration
 */

var PATH = {
  src: path.resolve('./src'),
  dest: path.resolve('./build'),
  entries: {
    styles: './src/index.scss',
    app: './src/index.jsx',
    vendor: './src/vendor.js'
  },
  compressFiletypes: ['js', 'html', 'css', 'svg']
};

var ENTRIES = {
  // App entry point
  app: PATH.entries.app,
  // The vendor file is just a JS file that exports an array of names of
  // external depencies, e.g, `require(PATH.entries.vendor) == ['lodash']`.
  vendor: require(PATH.entries.vendor)
};

var ALIAS = {
  'lodash': 'lodash/dist/lodash.js',
  'jsPlumb': path.join(PATH.src, '/jsPlumb.js')
};

var DEFAULT_OPTS = {
  entries: ENTRIES,
  dest: PATH.dest,
  env: {
    name: 'development',
    debug: true,
    compress: false,
    watch: true,
    dev_server: true,
    dev_server_port: 3000,
    watch_delay: 200
  },
  alias: ALIAS,
  stats_settings: {
    chunks: false,
    colors: true,
    warnings: false,
    children: false
  },
  html: {
    template: path.join(PATH.src, 'index.html')
  }
};

/**
 * ## Gulp Tasks
 */

// ### Helper Tasks

gulp.task('clean', function (callback) {
  require('del')([PATH.dest + "/**/*"], callback);
});

gulp.task('gzip', ['compile:all'], function () {
  var exts = PATH.compressFiletypes.join(',');

  return gulp.src(PATH.dest + "/*.{" + exts + "}")
  .pipe(require('gulp-gzip')({
    gzipOptions: { level: 9 }
  }))
  .pipe(gulp.dest(PATH.dest));
});

// ### Assets

gulp.task('assets:build', ['clean'], function () {
  return gulp.src(PATH.src + "/**/*.{png,jpg,jpeg,svg,otf,woff,ttf,eot}")
  .pipe(gulp.dest(PATH.dest));
});

gulp.task('assets:compile', ['assets:build']);

gulp.task('assets:watch', ['assets:build'], function () {
  return gulp.watch(PATH.src + "/**/*.html", ['assets:build']);
});

// ### SCSS

function buildSass (opts) {
  return gulp.src(PATH.entries.styles)
  .pipe(require('gulp-sass')(opts))
  .pipe(require('gulp-autoprefixer')(
    "last 1 version", "> 1%", "ie 9"
  ))
  .pipe(gulp.dest(PATH.dest));
}

gulp.task('sass:build', ['clean'], buildSass.bind(null));

gulp.task('sass:build:catchErrors',
  buildSass.bind(null, {errLogToConsole: true})
);

gulp.task('sass:compile', ['sass:build']);

gulp.task('sass:watch', ['sass:build'], function () {
  return gulp.watch(PATH.src + "/**/*.scss", ['sass:build:catchErrors']);
});

// ### Webpack

gulp.task('webpack:build', ['clean'], function (callback) {
  var opts = _.merge({}, DEFAULT_OPTS, {env: {
    debug: false, watch: false, dev_server: false
  }});

  compileScripts(opts, callback);
});

gulp.task('webpack:compile', ['clean'], function (callback) {
  var opts = _.merge({}, DEFAULT_OPTS, {env: {
    name: 'production', debug: false, compress: true,
    watch: false, dev_server: false
  }});

  compileScripts(opts, callback);
});

gulp.task('webpack:watch', function (callback) {
  var opts = _.merge({}, DEFAULT_OPTS, {
    env: {watch: true, dev_server: true}
  });

  compileScripts(opts, callback);
});

/**
 * ### 'Root Level' Tasks
 */

gulp.task('build', ['assets:build', 'sass:build', 'webpack:build']);
gulp.task('watch', ['assets:watch', 'sass:watch', 'webpack:watch']);

gulp.task('compile:all', ['assets:compile', 'sass:compile', 'webpack:compile']);
gulp.task('compile', ['compile:all', 'gzip']);

gulp.task('default', ['build']);
