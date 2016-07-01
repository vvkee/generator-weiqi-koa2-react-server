export default (gulp, path) => {
    gulp.task('favicon', () => {
        return gulp.src(`${path.root}/static/favicon.ico`)
            .pipe(gulp.dest(`${path.root}/public`))
    })
}
