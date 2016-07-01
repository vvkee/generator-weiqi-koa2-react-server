import 'shelljs/global'

export default (gulp, path) => {
    gulp.task('clean', () => {
        rm('-R', `${path.root}/public`)
    })
}
