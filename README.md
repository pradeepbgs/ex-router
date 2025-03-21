# ex-router

**Note** - Use `Import` statement
```cmd
import { loadRoutes } from 'file-routing';
```

A lightweight and flexible file-based routing system for Express.js.

## 🚀 Features
- Simple and easy-to-use routing system
- Automatic route loading from a directory
- Works seamlessly with Express.js

## 📦 Installation

```sh
npm install ex-router
```

## 🔥 Usage

Import `loadRoutes` and initialize it with your Express app:

```js
import express from 'express';
import { loadRoutes } from 'file-routing';

const app = express();
const port = 3000;

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

```
project-root/
│── src/
│   ├── routes/
│   │   ├── users.js
│   │   ├── posts.js
│
│── server.js
│── package.json
```

## 📝 API Reference

### `loadRoutes(app, options)`

#### Parameters:
- `app` - The Express application instance.
- `options.routeDir` - The directory containing route files.
- `options.prefixUrl` (optional) - A prefix for all routes.

## 🔗 Example API Endpoints

### Without Prefix
If `prefixUrl` is set to an empty string (`''`):
```
GET /users
GET /posts
```

### With Prefix
If `prefixUrl` is set to `'/api'`:
```js
loadRoutes(app, {
    routeDir: process.cwd() + '/src/routes',
    prefixUrl: '/api'
});
```
The API endpoints will now look like this:
```
GET /api/users
GET /api/posts
```

## 💡 Why Use Import?
This project is built with modern JavaScript standards. **Use ES Modules (`import` statements) for better compatibility and maintainability.**

## ⚡ Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License
This project is licensed under the MIT License.

