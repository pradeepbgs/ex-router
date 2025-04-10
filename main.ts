/**
 * ex-router
 * 
 * @license MIT
 * (c) 2025 Pradeep Kumar
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction...
 */


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
  await compile(app, prefixUrl, routeDir, '')
}

async function compile(app: any, prefixUrl: string, dirPath: string, baseRoute: string) {

  const files = await fs.promises.readdir(dirPath);
  files.sort()

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.promises.stat(filePath);
    
    if (stat.isDirectory()) {
      await compile(app, prefixUrl, filePath, baseRoute + '/' + file);
    }
    else if (file.endsWith('.ts') || file.endsWith('.js')) {
      await registerFileRoutes(app, prefixUrl, filePath, baseRoute, path.extname(file));
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
  let pathRoute = path.basename(filePath, extension);

  let routePath = baseRoute + '/' + pathRoute;

  if (routePath.endsWith('/index') || routePath.endsWith('/api')) {
    routePath = baseRoute;
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
      app[method.toLocaleLowerCase()](prefixUrl + routePath, module[method])
    }
  }
}


export { loadRoutes }