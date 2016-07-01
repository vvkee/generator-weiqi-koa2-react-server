import Koa from 'koa'

import onerror from 'koa-onerror'
import csrf from 'koa-csrf'
import reactView from 'koa-react-view'
import convert from 'koa-convert'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import koaStatic from 'koa-static'
import favicon from 'koa-favicon'
import session from 'koa-session2'

import path from 'path'

import { RedisStore, readStaticMap } from './bootstrap'
import { router } from './config'

import devServer from './bulid/dev-server'

const app = new Koa()

const viewsPath = path.join(__dirname, 'pages')
const staticPath = path.join(__dirname, 'public')

// 开发环境热重启
if (process.env.NODE_ENV === 'development') {
    devServer(app, readStaticMap)
} else {
    // readStaticMap
    readStaticMap(app)
}

// onerror
onerror(app)
// csrf
csrf(app)
// react server render
reactView(app, {
    views: viewsPath
})

// error handle
app.use(logger())
// etag works together with conditional-get
app.use(conditional())
app.use(etag())
// bodyParser
app.use(bodyParser({
    onerror: function (err, ctx) {
        console.log(err)
        ctx.throw('body parse error', 422)
    }
}))
// compress
app.use(compress())
// 静态模板
app.use(convert(koaStatic(staticPath)))
app.use(favicon(`${__dirname}/public/static/favicon.ico`))
// session
app.use(session({
    key: 'SESSIONID',
    store: new RedisStore(),
    maxAge: new Date(60 * 60 * 1000)
}))
// router
app.use(router.routes())
app.use(router.allowedMethods({
    throw: true
}))

export { app }
