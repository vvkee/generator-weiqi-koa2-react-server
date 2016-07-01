'use strict';
import gulp from 'gulp'
import runSequence from 'gulp-sequence'

import path from 'path'

const rootPath = process.cwd()

import task from './bulid/task'

task({
    gulp: gulp,
    path: {
        root: rootPath
    }
})

gulp.task('dev', (cb) => {
    runSequence('clean', ['eslint', 'favicon'], 'server_dev', cb)
})
export default gulp
