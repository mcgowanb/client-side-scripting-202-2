var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var minify = require('gulp-minify');
var minifyCSSObject = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var jsonminify = require('gulp-jsonminify');

var paths = {
    src: '*',
    srcHTML: '*.html',
    srcCSS: 'css/*.css',
    srcJS: '*.js',
    srcJSON: 'json/*.json',
    dist: 'dist',
    distCSS: 'dist/css',
    distCSSmin: 'dist/css.min',
    distJS: 'dist/js',
    distJSmin: 'dist/js.min',
    fonts: 'fonts/*',
    distFonts: 'dist/fonts'
};


gulp.task('default', function () {
    return [minifyJSON, htmlCopy, fontCopy, minifyJS, minifyCSS, combineCSS, combineJS];
});

//minify json files
var minifyJSON = gulp.src([paths.srcJSON])
    .pipe(jsonminify())
    .pipe(gulp.dest(paths.dist));

//copy html files to dist folder
var htmlCopy = gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.dist));

//copy fonts
var fontCopy = gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));

//minify css folder
var minifyCSS = gulp.src([paths.srcCSS])
    .pipe(cleanCSS({
        compatibility: 'ie8',
        ext: {
            src: '-debug.css',
            min: '.min.css'
        }
    }))
    .pipe(gulp.dest(paths.distCSSmin));


//minify js folders
var minifyJS = gulp.src([paths.srcJSON, 'jquery.jflow/*.js'])
    .pipe(minify({
        ext: {
            src: '-debug.js',
            min: '.min.js'
        }
    }))
    .pipe(gulp.dest(paths.distJSmin));


//combine js into single file
var combineJS = gulp.src('js/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));


//combine css into single file
var combineCSS = gulp.src('css/*.css')
    .pipe(minifyCSSObject())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(paths.dist));