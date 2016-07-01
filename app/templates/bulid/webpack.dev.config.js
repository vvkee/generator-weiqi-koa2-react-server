import _ from 'lodash'
import webpack from 'webpack'
import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import path from 'path'
import baseConfig from './webpack.base.config'

const rootPath = path.join(__dirname, '..')

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

const entriesFromBaseConfig = baseConfig.entry

import { cssModuleConfig } from './config'

export default () => merge(baseConfig, {
    devtool: '#eval-source-map',
    entry: getHotEntry(entriesFromBaseConfig),
    output: {
        path: path.resolve(`${rootPath}/public/`),
        filename: 'js/[name].js',
        chunkFilename: 'js/[chunkhash:8].chunk.js',
        hotUpdateChunkFilename: 'js/[id].[hash].hot-update.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /static\/style/,
                loaders: ['style-loader', `css-loader?sourceMap&modules&importLoaders=1&localIdentName=${cssModuleConfig}!postcss-loader?sourceMap`]
            }, {
                test: /\.less$/,
                exclude: /static\/style/,
                loaders: ['style-loader', `css-loader?sourceMap&modules&importLoaders=1&localIdentName=${cssModuleConfig}!less-loader!postcss-loader?sourceMap`]
            }, {
                test: /static\/style\/\S*\.css/,
                loaders: ['style-loader', `css-loader?sourceMap!postcss-loader`]
            }, {
                test: /static\/style\/\S*\.less/,
                loaders: ['style-loader', `css-loader?sourceMap!less-loader!postcss-loader`]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new CommonsChunkPlugin({
             name: 'common',
             filename: 'js/common.js',
             chunks: getChunksByEntry(entriesFromBaseConfig)
        })
    ]
})
// getChunksByEntry
function getChunksByEntry (entries) {
    let chunks = []
    _.forEach(entries, (entry, keyName) => {
        chunks.push(keyName)
    })
    return chunks
}
// add hotEntry
function getHotEntry(entries) {
    let files = entries || {}
    if (files.vendor && !Array.isArray(files.vendor)) files.vendor = []
    files.vendor.push('webpack-hot-middleware/client?reload=true&timeout=3000')

    return files
}
