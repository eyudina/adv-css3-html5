const { series, parallel, src, dest, watch } = require('gulp');

const pug            = require('gulp-pug');
const scss           = require('gulp-sass');
const sourcemaps     = require('gulp-sourcemaps');
const autoprefixer   = require('gulp-autoprefixer');
const htmlValidation = require('gulp-w3c-html-validator');
const del            = require('del');
const browserSync    = require('browser-sync').create();

function clean() {
    return del(['dist/*', '!dist/.git']);
}

function pugToHtml() {
    return src('app/index.pug')
        .pipe(pug({doctype: 'html', pretty: true}))
        .pipe(dest('dist'));
}

function styles() {
    return src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('maps'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

function validateHtml() {
    return src('dist/*.html')
        .pipe(htmlValidation())
        .pipe(htmlValidation.reporter());
}

exports.clean = clean;
exports.validate = validateHtml;
exports.build = series(clean, parallel(styles, pugToHtml, validateHtml));
exports.watch = function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
    watch('app/scss/*.scss', {ignoreInitial: false}, styles);
    watch('app/index.pug', {ignoreInitial: false}, pugToHtml).on('change', browserSync.reload);
}
