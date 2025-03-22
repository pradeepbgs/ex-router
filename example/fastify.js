import fastify from "fastify";
import {loadRoutes} from '../index.js'


const app = new fastify()



app.get('/', (req, res) => {
    res.send('Hello World!')
})



loadRoutes(app,
    {
        routeDir: process.cwd()  + '/src/routes',
        prefixUrl: ''
    })
    
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})