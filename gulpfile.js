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
var stylesSrc = 'app/assets/stylesheets',
  stylesDest = 'app/dist/stylesheets';

var javascriptSrc = 'app/assets/javascript',
  javascriptDest = 'app/dist/javascript';


// Tasks
// ----------------------------------------

// Lint Task
gulp.task('lint', function() {
  return gulp.src(javascriptSrc + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile and Source Map our Sass
gulp.task('sass', function() {
  return gulp.src(stylesSrc + '/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: false,
      onError: function(err) {
        return notify({
          title: "Gulp Sass Error",
          sound: "Basso"
        }).write(err);
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(stylesDest))
    .pipe(connect.reload())
    .pipe(notify({
      title: "Gulp Sass",
      sound: "Pop",
      message: "Sass compiled successfully!"
    }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src(javascriptSrc + '/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest(javascriptDest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(javascriptDest))
    .pipe(connect.reload());
});

// Refresh when HTML changes
gulp.task('html', function () {
  gulp.src('app/**/*.html')
    .pipe(connect.reload());
});

// Start Webserver
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

// Watch files for changes
gulp.task('watch', function () {

  // Watch .html files
  gulp.watch(['app/**/*.html'], ['html']);

  // Watch .scss files
  gulp.watch(['app/**/*.scss'], ['sass']);

  // Watch .js files
  gulp.watch(['app/**/*.js'], ['scripts']);

});


// Default Task
gulp.task('default', ['sass', 'scripts', 'connect', 'watch']);
