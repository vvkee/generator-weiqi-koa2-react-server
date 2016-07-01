import Redis from 'ioredis'
import { Store } from 'koa-session2'

import { redisConfig } from '../config'

class RedisStore extends Store {
    constructor () {
        super()
        this.redis = new Redis(redisConfig)

        this.redis.on('connect', () => {
            console.log('connecting...')
        })
        this.redis.on('ready', () => {
            console.log('redis ready')
            // debug('redis host: %s', this.redis.host);
            // debug('redis port: %s', this.redis.port);
            // debug('redis parser: %s', this.redis.reply_parser.name);
            // debug('redis server info: %j', this.redis.server_info);
        })

        this.redis.on('reconnect', () => {
            console.log('redis is reconnecting')
        })

        this.redis.on('error', err => {
            console.log('redis encouters error: %j', err.stack || err)
        })

        this.redis.on('end', () => {
            console.log('redis connection ended')
        })
    }

    async get (sid) {
        let _session = await this.redis.get(`SESSION:${sid}`)

        let getSession = JSON.parse(_session)
        return getSession
    }

    async set (session, opts) {
        if (!opts.sid) {
            opts.sid = this.getID(24)
        }
        if (typeof session === 'object') {
            session = JSON.stringify(session)
        }
        await this.redis.set(`SESSION:${opts.sid}`, session)
        return opts.sid
    }

    async destory (sid) {
        return await this.redis.del(sid)
    }
}
export default RedisStore
