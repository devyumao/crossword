var gulp = require('gulp');
var amdOptimizer = require('gulp-amd-optimizer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var eventStream = require('event-stream');

var requireConfig = {
    baseUrl: 'src'
};

var options = {
    umd: false
};

function depScript() {
    return gulp.src([
        'dep/esl.js',
        'dep/phaser.min.js'
    ]);
}

function srcScript() {
    return gulp.src('src/**/*.js', {base: requireConfig.baseUrl})
        .pipe(amdOptimizer(requireConfig, options))
        .pipe(uglify({mangle: false}));
}

gulp.task('script', function () {
    return eventStream.merge(depScript(), srcScript())
        .pipe(concat('game.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('image', function () {
    return gulp.src(['img/*.png', '!img/psd'])
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', [
    'script',
    'image'
]);
