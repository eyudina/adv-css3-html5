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
    return src(['app/*.pug', '!app/_*.pug'])
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

function scripts() {
    return src('app/js/*.js')
        .pipe(dest('dist/js'));
}

function processAssets() {
    return src(['app/assets/**', '!app/assets/src/**'])
        .pipe(dest('dist/assets'));
}

function validateHtml() {
    return src('dist/*.html')
        .pipe(htmlValidation())
        .pipe(htmlValidation.reporter());
}

exports.clean = clean;
exports.processAssets = processAssets;
exports.validate = validateHtml;
exports.build = series(clean, parallel(styles, pugToHtml, scripts, processAssets, validateHtml));
exports.watch = function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
    watch('app/scss/*.scss', {ignoreInitial: false}, styles);
    watch(['app/*.pug', '!app/_*.pug'], {ignoreInitial: false}, pugToHtml).on('change', browserSync.reload);
    watch('app/js/*.js', {ignoreInitial: false}, scripts).on('change', browserSync.reload);
    watch(['app/assets', '!app/assets/src'], {ignoreInitial: false}, processAssets).on('change', browserSync.reload);
}
