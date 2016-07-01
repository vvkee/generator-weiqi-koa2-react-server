import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'
import autoprefixer from 'autoprefixer'
import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import glob from 'glob'

const rootPath = path.join(__dirname, '..')

const entries = getEntry()

export default  {
    entry: entries,
    resolve: {
        root: [rootPath, `${rootPath}/node_modules`],
        extensions: ['', '.js', '.jsx', '.json']
    },
    resolveLoader: {
        root: path.join(rootPath, 'node_modules')
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                include: rootPath,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                    // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                    // 否则则调用file-loader，参数直接传入
                    'url?limit=10000&name=img/[hash:8].[name].[ext]',
                ],
                query: {
                    limit: 10000,
                    name: 'images/[hash:7].[name].[ext]'
                }
            }, {
                test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[hash:7].[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // create assets.js
        new AssetsPlugin({
            filename: 'assets.js',
            update: true,
            prettyPrint: true,
            fullPath: true,
            path: `${rootPath}/`,
            processOutput: x => `module.exports = ${JSON.stringify(x)}`,
        })
    ],
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    postcss: [
        autoprefixer
    ]
}

// 获取所有的view页面路径
function getEntry () {
    const viewsPath = path.join(rootPath, '/pages')
    const entryPath = path.join(rootPath, '/static/js/entries')

    const pagesFiles = glob.sync(`${viewsPath}/*.jsx`)
    const entryFiles = glob.sync(`${entryPath}/*.js`)

    let map = {}
    pagesFiles.forEach(pagePath => {
        let pageFileName = pagePath.substring(pagePath.lastIndexOf('\/') + 1, pagePath.lastIndexOf('.'))
        entryFiles.forEach(function(entryPath) {
            let entryFileName = entryPath.substring(entryPath.lastIndexOf('\/') + 1, entryPath.lastIndexOf('.'))
            if (pageFileName === entryFileName) {
                map[pageFileName] = entryPath
            }
        })
    })

    return Object.assign(map, {
        vendor: ['react', 'react-dom']
    })
}
