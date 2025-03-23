# ex-router

A lightweight and flexible file-based routing system for **Express.js, Hono, Diesel**, or any other framework.

## 🚀 Features
- Simple and easy-to-use routing system
- Automatic route loading from a directory
- Works seamlessly with **Express.js, Hono, Diesel**
- Supports defining multiple HTTP methods in a single route file

> **Note:** Fastify requires a workaround using `setTimeout` (100-200ms) to prevent errors.

>**Fastify**
```js
import fastify from "fastify";
import { loadRoutes } from 'ex-router'

const app = new fastify()

setTimeout(() => {
    loadRoutes(app,
        {
            routeDir: process.cwd() + '/src/routes',
            prefixUrl: ''
        })
}, 100);

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
```

## 📦 Installation

### Bun
```sh
bun install ex-router
```

### NPM
```sh
npm install ex-router
```

## 🔥 Usage

Import `loadRoutes` and initialize it with your app:

```js
import express from 'express';
import { loadRoutes } from 'ex-router';

const app = express();
const port = 3000;

// Load routes
loadRoutes(app, {
    routeDir: process.cwd() + '/src/routes',
    prefixUrl: ''
});

app.get('/', (_, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

## 📂 Folder Structure
> **Note:** Ensure your server file is in the root directory and `routes` folder is under `src/`.

```
example/
├── src/
│   ├── controller/
│   ├── routes/
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   ├── register.js
│   │   ├── user/
│   │   │   ├── profile/
│   │   │   │   ├── index.ts
│   │   │   │   ├── delete.ts
│   │   │   │   ├── videos.ts
│   ├── utils/
│   ├── server.ts // root
```

## 📝 API Reference

### `loadRoutes(app, options)`

#### Parameters:
- `app` - The application instance.
- `options.routeDir` - The directory containing route files.
- `options.prefixUrl` *(optional)* - A prefix for all routes.

## 🔗 Example API Endpoints

### Without Prefix (`prefixUrl: ''`)
```
File Path                          | API Route
------------------------------------|-----------
src/routes/hello.ts                | /hello  
src/routes/auth/login.ts           | /auth/login  
src/routes/user/profile/index.ts   | /user/profile  
src/routes/user/profile/videos.ts  | /user/profile/videos  
```

### With Prefix (`prefixUrl: '/api/v1'`)
```js
loadRoutes(app, {
    routeDir: process.cwd() + '/src/routes',
    prefixUrl: '/api/v1'
});
```
```
File Path                          | API Route
------------------------------------|-----------
src/routes/hello.ts                | /api/v1/hello  
src/routes/auth/login.ts           | /api/v1/auth/login  
src/routes/user/index.ts           | /api/v1/user  
src/routes/videos/api.ts           | /api/v1/videos  
src/routes/user/videos.ts          | /api/v1/user/videos  
```

## 🛠 Routing Rules

1. **Folders act as route segments**
   - Example: `routes/user/profile.ts` → `/user/profile`

2. **`index.ts` or `api.ts` acts as the root**
   - Example: `routes/user/index.ts` → `/user`
   - Example: `routes/user/api.ts` → `/user`
   - Example: `routes/user/profile/index.ts` → `/user/profile`
   - Example: `routes/user/profile/api.ts` → `/user/profile`

3. **Multiple HTTP Methods in a Single File**
   - Users can define multiple HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) within the same route file.

### Example
- src/routes/login.ts
```js
export const GET = (req, res) => {
    return res.send("Hello from login GET request.");
};

export const POST = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }
    return res.send("Login successful");
};
```

## 💡 Why Use `import`?
This project is built with modern JavaScript standards. **Use ES Modules (`import` statements) for better compatibility and maintainability.**

## ⚡ Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License
This project is licensed under the **MIT License**.

