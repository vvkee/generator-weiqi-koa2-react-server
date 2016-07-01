import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../routes'

const renderToString = ReactDOMServer.renderToString
export default {
    index: async (ctx, next) => {
        const staticFiles = await ctx.renderStaticFile('index')
        ctx.render('index', {
            title: '韦宗圻-weizongqi-韦其-weiqi-Web前端-专注前端领域实践开发',
            description: '韦宗圻（又名韦其），专注于web前端技术领域实践。对web技术有着灵敏的嗅觉，致力于国内外web新技术试行者。',
            keywords: '韦宗圻、weizongqi、韦其、weiqi、前端、web前端、前端工程师、js、css',
            staticFiles: staticFiles
        })
        await next()
    },
    test: async (ctx, next) => {
        const requestUrl = ctx.req.url
        const staticFiles = await ctx.renderStaticFile('test')
        match({
            routes,
            location: requestUrl
        }, (err, redirectLocation, renderProps) => {
            if (err) {
                ctx.res.status = 500
                ctx.res.send(err.message)
            } else if (redirectLocation) {
                ctx.res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                const html = renderToString(<RouterContext {...renderProps} />)
                ctx.render('test', {
                    title: '韦宗圻-weizongqi-韦其-weiqi-Web前端-专注前端领域实践开发',
                    description: '韦宗圻（又名韦其），专注于web前端技术领域实践。对web技术有着灵敏的嗅觉，致力于国内外web新技术试行者。',
                    keywords: '韦宗圻、weizongqi、韦其、weiqi、前端、web前端、前端工程师、js、css',
                    staticFiles: staticFiles,
                    html: html
                })
            } else {
                ctx.res.status = 404
            }
        })
    }
}
