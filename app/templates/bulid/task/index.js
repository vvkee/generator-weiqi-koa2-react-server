import cleanTask from './clean'
import faviconTash from './favicon'
import eslintTash from './eslint'
import serverTash from './server'
import webpackTash from './webpack'
export default (_opt) => {
    const gulp = _opt.gulp
    const path = _opt.path

    // 注册任务
    // 清除文件
    cleanTask(gulp, path)
    // 输出文件
    faviconTash(gulp, path)
    // 代码检查
    eslintTash(gulp, path)
    // 启动
    serverTash(gulp, path)
    // webpack任务
    webpackTash(gulp, path)
}
