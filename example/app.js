import expess from 'express'
import {loadRoutes} from '../dist/main.js'


const app = expess()
const port = 3000


loadRoutes(app,
    {
        routeDir: process.cwd()  + '/src/routes',
        prefixUrl: ''
    });



app.get("/", (_, res) => {
    return res.send("Hello")
})


app.listen(port, () => {
    console.log('server is running')
})