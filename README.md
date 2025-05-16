# Angular Demo App (Dockerized)

This project contains an Angular frontend app (`demo`) packaged into a production-ready Docker image using Nginx as a web server.

## 📦 Build the Docker Image

```bash
  docker build -t profile-experience .
```

This will:
- Use Node to install dependencies and build the Angular app (in production mode)
- Use Nginx to serve the compiled static files

## ▶️ Run the Container

```bash
  docker run -d -p 8080:80 profile-experience
```

Visit: [http://localhost:8080](http://localhost:8080)

## 🔧 Project Structure

```
.
├── src/                      # Angular source code
├── dist/demo/               # Compiled output after build
├── nginx.conf               # Custom Nginx config
├── Dockerfile               # Multi-stage Docker build
└── README.md                # You are here
```

## 📝 Notes

- The Angular app name is `demo` (see `angular.json → outputPath`)
- Make sure `nginx.conf` is saved **UTF-8 without BOM** to avoid `unknown directive "﻿server"` errors.
- Use `ng build --prod` manually if you want to test locally before dockerizing.

## 🔄 Rebuild and Restart

```bash
    docker stop profile-experience
    docker rm profile-experience
    docker build -t profile-experience .
    docker run -d -p 8080:80 --name my-container-name profile-experience
```
