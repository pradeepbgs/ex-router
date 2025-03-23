import {Elysia} from 'elysia'
import {loadRoutes} from '../index.js'

const app = new Elysia()

setTimeout(() => {
    
    loadRoutes(app,{
        routeDir: process.cwd() + "/src/routes"
    })
}, 200);


app.get('/', () => 'Hello Elysia')

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})