const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    exec = require('child_process').exec,
    reload = browserSync.reload;

    gulp.task('sass', () =>
        gulp.src('./static/scss/**/*.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                version: ['last 2 versions']
            }))
            .pipe(gulp.dest('./static/css'))
            .pipe(browserSync.reload({
                stream: true
              }))
    );

    gulp.task('default',  () => {
        browserSync.init({
            notify: false,
            port: 3050,
            proxy: 'localhost:3050'
        });
        gulp.watch(['./**/*.{scss,css,html,py,js}']).on('change', browserSync.reload);
        gulp.watch('./static/scss/**/*.scss', gulp.series('sass'));
    });
