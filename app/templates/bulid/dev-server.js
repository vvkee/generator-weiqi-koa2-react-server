import webpack from 'webpack'

import convert from 'koa-convert'
import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'
import getWebpackConfig from './webpack.dev.config'

export default (app, readStaticMap) => {
    const webpackConfig = getWebpackConfig()
    const compiler = webpack(webpackConfig)
    if (!compiler.outputPath) compiler.outputPath = '/public/'
    app.use(convert(devMiddleware(compiler, {
        noInfo: false,
        quiet: false,
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })))
    app.use(convert(hotMiddleware(compiler)))

    /**
     * base on assets-webpack-plugin
     * https://github.com/kossnocorp/assets-webpack-plugin
     */
    compiler.plugin('emit', function(compilation, callback) {
        readStaticMap(app)
        callback()
    })
}
