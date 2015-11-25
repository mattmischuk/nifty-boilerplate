// Include gulp
var gulp = require('gulp');


// Include Our Plugins
var sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  connect = require('gulp-connect'),
  sourcemaps = require('gulp-sourcemaps');

// Paths
var SRC = 'src';
var DEST = 'dist';

var STYLES_SRC = SRC + '/stylesheets';
var STYLES_DEST = DEST + '/stylesheets';

var JAVASCRIPT_SRC = SRC + '/javascript';
var JAVASCRIPT_DEST = DEST + '/javascript';

var HTML_SRC = SRC;
var HTML_DEST = DEST;

var ROOT = DEST;

// Tasks
// ----------------------------------------

// Lint Task
gulp.task('lint', function() {
  return gulp.src(JAVASCRIPT_SRC + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile and Source Map our Sass
gulp.task('dev:scss', function() {
  return gulp.src(STYLES_SRC + '/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError({
      title: 'Sass Compile Error',
      sound: 'Basso'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(STYLES_DEST))
    .pipe(connect.reload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src(JAVASCRIPT_SRC + '/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(JAVASCRIPT_DEST))
    .pipe(connect.reload());
});

// Refresh when HTML changes
gulp.task('html', function () {
  gulp.src(HTML_SRC + '/**/*.html')
    .pipe(gulp.dest(HTML_DEST))
    .pipe(connect.reload());
});

// Start Webserver
gulp.task('connect', function() {
  connect.server({
    root: ROOT,
    livereload: true
  });
});

// Watch files for changes
gulp.task('watch', function () {

  // Watch .html files
  gulp.watch([HTML_SRC + '/**/*.html'], ['html']);

  // Watch .scss files
  gulp.watch([STYLES_SRC + '/**/*.scss'], ['dev:scss']);

  // Watch .js files
  gulp.watch([JAVASCRIPT_SRC + '/**/*.js'], ['scripts']);

});


// Default Task
gulp.task('default', ['html', 'dev:scss', 'scripts', 'connect', 'watch']);
