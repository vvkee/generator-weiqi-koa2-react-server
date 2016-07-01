import eslint from 'gulp-eslint'
import eslint_formatter from 'eslint-friendly-formatter'
import runSequence from 'gulp-sequence'
import cache from 'gulp-cached'
export default (gulp, path) => {
    gulp.task('eslint', () => {
        return gulp.src([
            `${path.root}/!(public|static|bulid|log|node_modules)/**/*.?(js|jsx)`,
            `${path.root}/app.?(js|jsx)`,
        ]).pipe(cache())
          .pipe(eslint())
          .pipe(eslint.format(eslint_formatter))
    })
}
