import {Diesel} from 'diesel-core'
import {loadRoutes} from 'ex-router'

const app  = new Diesel()


loadRoutes(app,{
    routeDir:process.cwd()+"/src/routes"
})

app.listen(3000)