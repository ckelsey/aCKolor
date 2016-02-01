var gulp = require('gulp'),
    compass = require('gulp-compass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    path = require('path'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyHtml = require('gulp-minify-html'),
    embedTemplates = require('gulp-angular-embed-templates'),
    ngHtml2Js = require('gulp-ng-html2js');

var notifyInfo = {
    title: 'Gulp',
    icon: path.join(__dirname, 'gulp.png')
};

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: "Error: <%= error.message %>"
    })
};



var stylesToDo = [
    'style/*.scss',
];

gulp.task('styles', function() {
    return gulp.src(stylesToDo)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest('dist/css/build/sass'))
        .pipe(compass({
            css: 'dist/css/build/css',
            sass: 'dist/css/build/sass',
            image: 'app/css/images'
        }))
        .pipe(autoprefixer('last 2 version', 'Safari', 'ie', 'opera', 'ios', 'android', 'chrome', 'firefox'))
        .pipe(concat('app.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});


var vendor_scripts = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-loader/angular-loader.js',
    'bower_components/angular-animate/angular-animate.min.js'
];

gulp.task('vendor_scripts', function() {
    return gulp.src(vendor_scripts)
        .pipe(plumber(plumberErrorHandler))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'))
});


var app_scripts = [
    'scripts/*.js'
];

gulp.task('app_scripts', function() {
    return gulp.src(app_scripts)
        .pipe(plumber(plumberErrorHandler))
        .pipe(ngAnnotate({
            // true helps add where @ngInject is not used. It infers.
            // Doesn't work with resolve, so we must be explicit there
            add: true
        }))
        .pipe(embedTemplates())
        .pipe(uglify('app.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('dist/js'))
});



gulp.task('live', function() {
    livereload.listen();
    gulp.watch(stylesToDo, ['styles']);
    gulp.watch(vendor_scripts, ['vendor_scripts']);
    gulp.watch(app_scripts, ['app_scripts']);
});

gulp.task('default', [
    'styles',
    'vendor_scripts',
    'app_scripts',
    'live'
], function() {});
