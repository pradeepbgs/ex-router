import expess from 'express'
import { loadRoutes } from '../main'

const app = expess()
const port = 3000

loadRoutes(app,
    {
        routeDir: __dirname + '/src/routes',
        prefixUrl: ''
    });



app.get("/", (_, res) => {
    return res.send("Hello")
})


app.listen(port, () => {
    console.log('server is running')
})