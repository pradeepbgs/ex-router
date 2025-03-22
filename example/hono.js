import { Hono } from 'hono'
import {loadRoutes} from '../index.js'

const app = new Hono()


loadRoutes(app,
    {
        routeDir: process.cwd()  + '/src/routes',
        prefixUrl: ''
    })

app.get('/', (c) => c.text('Hono!'))

export default app