import webpack from 'webpack'
import gutil from 'gulp-util'

import webpackDevConfig from '../webpack.dev.config'
import webpackProConfig from '../webpack.pro.config'
export default (gulp, path) => {
    gulp.task('webpack_pro', () => {
        webpack(webpackProConfig(), (err, stats) => {
            if (err) throw new gutil.PlugingError('webpack',
                err)
            process.stdout.write(stats.toString({
                colors: true,
                modules: true,
                children: true,
                chunks: false,
                chunkModules: false
            }) + '\n')
        })
    })
}
