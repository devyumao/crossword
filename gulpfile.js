var gulp = require('gulp');
var amdOptimizer = require('gulp-amd-optimizer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var requireConfig = {
    baseUrl: 'src'
};

var options = {
    umd: false
};

gulp.task('script:src', function () {
    return gulp.src('src/**/*.js', {base: requireConfig.baseUrl})
        .pipe(amdOptimizer(requireConfig, options))
        .pipe(concat('game.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist/asset'));
});

gulp.task('script:dep', function () {
    return gulp.src('dep/*.js')
        .pipe(gulp.dest('dist/dep'));
});

gulp.task('clean:image', function () {
    del.sync(['dist/img/*.png']);
});

gulp.task('image', function () {
    return gulp.src(['img/*.png', 'img/*.ico'])
        .pipe(gulp.dest('dist/img'));
});

gulp.task('default', [
    'script:dep',
    'script:src',
    'clean:image',
    'image'
]);
