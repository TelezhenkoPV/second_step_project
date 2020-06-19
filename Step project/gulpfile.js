const {src, dest, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');
const del = require('del');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');

function emptyDist () {
    return del('./dist/**');
}

function emptyAssets () {
    return del('./dist/assets/**');
}

function copyHtml() {
    return src('./src/index.html')
        .pipe(dest('./dist'))
        .pipe(browserSync.reload({ stream: true }));
}

function copyJs() {
    return src('./src/js/*.js')
        .pipe(minify({noSource: true}))
        .pipe(dest('./dist/js'))
        .pipe(browserSync.reload({ stream: true }));
}

function buildScss () {
    return src('./src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(postcss([
            uncss({html: ['./dist/index.html']})
        ]))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 20 versions']
        }))
        .pipe(dest('./dist/styles'))
        .pipe(browserSync.reload({ stream: true }));
}

function copyAssets () {
    return src('./src/assets/**')
        .pipe(imagemin())
        .pipe(dest('./dist/assets'))
        .pipe(browserSync.reload({ stream: true }));
}

function serve() {
    browserSync.init({
        server: './dist'
    });

    watch(['./src/index.html'], copyHtml);
    watch(['./src/scss/*.scss'], buildScss);
    watch(['./src/js/*.js'], copyJs);
    watch(['./src/assets/img/'], addNewAssets);
}

const build = series(emptyDist, parallel(
    series(copyHtml, buildScss),
    copyAssets, copyJs
    )
);

const addNewAssets = series(emptyAssets, copyAssets, copyHtml);

exports.html = copyHtml;
exports.scss = buildScss;
exports.assets = copyAssets;
exports.clear = emptyDist;
exports.clearAssets = emptyAssets;
exports.js = copyJs;
exports.build = build;

exports.dev = series(build, serve);
