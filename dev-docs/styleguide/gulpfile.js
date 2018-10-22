var gulp = require("gulp");
var cssimport = require("gulp-cssimport");
var minify = require('gulp-minify-css');

var options = {};
gulp.task("compile", function () {
  return gulp.src("css/main.css")
    .pipe(cssimport(options))
    .pipe(minify({ keepBreaks: false }))
    .pipe(gulp.dest("../../app/static"));
}); 