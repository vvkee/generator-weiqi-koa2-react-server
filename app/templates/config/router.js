import Router from 'koa-router'
import { home } from '../controllers'

const router = new Router()

router.get('/home', home.index)

router.get(/(\/home\S*)|\S*/, home.test)

export default router
