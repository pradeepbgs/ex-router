import { Diesel } from "diesel-core";
import {loadRoutes} from '../index'


const app = new Diesel();


loadRoutes(app,
    {
        routeDir: process.cwd()  + '/src/routes',
        prefixUrl: ''
    })
app.get('/', (c) => c.text('Hono!'))


app.listen(3000)