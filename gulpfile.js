const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const less = require('gulp-less');

gulp.task('minify-js', function() {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
    }
);

gulp.task('minify-images', async function() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', gulp.series('minify-js'));
    gulp.watch('src/images/*', gulp.series('minify-images'));
    gulp.watch('src/less/*.less', gulp.series('less'));
});

gulp.task('default', gulp.parallel('minify-js', 'minify-images', 'less', 'watch'));