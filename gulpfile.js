const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const less = require('gulp-less');



// Minify JavaScript
gulp.task('minify-js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'));
});

// Minify Images
gulp.task('minify-images', async function() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Compile LESS files and minify
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});
// Default task
gulp.task('default', gulp.series('minify-js', 'minify-images', 'less'));