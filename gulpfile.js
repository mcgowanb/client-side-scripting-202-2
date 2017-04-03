var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var minifyCSSObject = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('default', function () {
    return [minifyJS, minifyCSS, combineCSS, combineJS];
});


var minifyCSS = gulp.src('css/*.css')
    .pipe(cleanCSS({
        compatibility: 'ie8',
        ext: {
            src: '-debug.css',
            min: '.min.css'
        }
    }))
    .pipe(gulp.dest('dist/css'));

var minifyJS = gulp.src('js/*.js')
    .pipe(minify({
        ext: {
            src: '-debug.js',
            min: '.min.js'
        }
    }))
    .pipe(gulp.dest('dist/js'));

var combineJS = gulp.src('js/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));

var combineCSS = gulp.src('css/*.css')
    .pipe(minifyCSSObject())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('dist/'));

gulp.task('compress-css', function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('compress-js', function () {
    gulp.src('js/*.js')
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            }
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('combine-js', function () {
    gulp.src('js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});

gulp.task('combine-css', function () {
    gulp.src('css/*.css')
        .pipe(minifyCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('dist/'))
});