// Import all gulp plugins
var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var styleguide = require('sc5-styleguide');

// Paths
var dist = 'assets';
var source = 'src';

// Gulp Tasks
// Compile SCSS to CSS
gulp.task('styles', function(){
	return gulp.src([
		`${source}/scss/*.scss`,
	])
	.pipe(sass().on('error', notify.onError()))
	.pipe(cleanCss())
	.pipe(gulp.dest(`${dist}/css/`));
});

// Generate Styleguide
gulp.task('styleguide:generate', function() {
  return gulp.src([`${source}/scss/*.scss`])
  .pipe(styleguide.generate({
    title: 'Styleguide',
    rootPath: `${dist}'`,
    appRoot: './',
    overviewPath: 'styleguide-overview.md',
    disableEncapsulation: true,
  }))
  .pipe(gulp.dest(`${dist}/styleguide`));
});

// Build Tasks
gulp.task('styleguide', ['styleguide:generate']);

gulp.task('default', function(){
  gulp.watch(`${source}/scss/*.scss`, ['styles', 'styleguide']);
});