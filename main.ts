import fs from 'fs'
import path from 'path'

async function loadRoutes(
  app: any,
  {
    routeDir = '',
    prefixUrl = ''
  }: {
    routeDir: string,
    prefixUrl?: string
  }

) {
  if (!app) {
    throw new Error('App is not defined')
  }
  if (!routeDir) {
    throw new Error('Route directory is not defined')
  }
  if (!fs.existsSync(routeDir)) {
    throw new Error(`Route directory ${routeDir} does not exist`)
  }
  compile(app, prefixUrl, routeDir, '')
}

async function compile(app: any, prefixUrl: string, dirPath: string, baseRoute: string) {

  const files = await fs.promises.readdir(dirPath);

  for (const file of files) {
    // console.log('does file exist?', file)
    const filePath = path.join(dirPath, file);
    // console.log('file path', filePath)
    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      compile(app, prefixUrl, filePath, baseRoute + '/' + file);
    }
    else if (file.endsWith('.ts')) {
      registerFileRoutes(app, prefixUrl, filePath, baseRoute, '.ts');
    }
    else if (file.endsWith('.js')) {
      registerFileRoutes(app, prefixUrl, filePath, baseRoute, '.js');
    }
  }
}

async function registerFileRoutes(
  app: any,
  prefixUrl: string,
  filePath: string,
  baseRoute: string,
  extension: string
) {
  const module = await import(filePath);
  // console.log(filePath)
  let pathRoute;
  if (extension === '.ts') {
    pathRoute = path.basename(filePath, '.ts');
  }
  else if (extension === '.js') {
    pathRoute = path.basename(filePath, '.js');
  }

  let routePath = baseRoute + '/' + pathRoute;

  // Remove `/index` if present
  if (routePath.endsWith('/index')) {
    routePath = baseRoute
  }
  else if (routePath === 'index') {
    routePath = baseRoute
  }
  else if (routePath === '') {
    routePath = baseRoute
  }
  else if (routePath.endsWith('/api')){
    routePath = baseRoute
  }

  // here we can check if routePath include [] like - user/[id] if yes then remove [] and add user:id
  routePath = routePath.replace(/\[(.*?)\]/g, ':$1');

  const supportedMethods = [
    'GET', 'POST', 'PUT', 'PATCH', 'DELETE',
    'ANY', 'HEAD', 'OPTIONS', 'PROPFIND',
    'PROPPATCH', 'MKCOL', 'COPY', 'MOVE', 'LOCK', 'UNLOCK', 'TRACE', 'SEARCH',
    'ALL', 'USE', // express
    'TRACE', 'CONNECT' // fastify
  ];

  for (const method of supportedMethods) {
    if (module[method] && typeof app[method.toLowerCase()] === 'function') {
      const lowerMethod = method;
      app[lowerMethod.toLocaleLowerCase()](`${prefixUrl}${routePath}`, module[method])
      // console.log(`Registered route ${lowerMethod} ${prefixUrl}${routePath}`)
    }
  }
}


export { loadRoutes }