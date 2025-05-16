# Angular Demo App (Dockerized)

This project contains an Angular frontend app (`demo`) packaged into a production-ready Docker image using Nginx as a
web server.

---

## 📝 Task Description

### On Profile Page
1. Add a filter text box to filter the grid by **Organization** and **Summary** columns.
   > The filtering must be optimized (handled via Observable + debounce).
2. Add a new button to allow adding new records to the grid.
   > The "Add New" button redirects to a separate form page.

### On Dashboard Page
1. Update the information:
    - Name
    - Total Experience
    - Summary (including technologies like .NET, SQL, Angular, etc.)

---

## 📦 Build the Docker Image

```bash
docker build -t my-angular-app .
```

This will:

- Use Node to install dependencies and build the Angular app (in production mode)
- Use Nginx to serve the compiled static files

## ▶️ Run the Container

```bash
docker run -d -p 8080:80 my-angular-app
```

Visit: [http://localhost:8080](http://localhost:8080)

## 🔧 Project Structure

```
.
├── src/                     # Angular source code
├── dist/demo/               # Compiled output after build
├── nginx.conf               # Custom Nginx config
├── Dockerfile               # Multi-stage Docker build
└── README.md                # You are here
```

## 🔄 Rebuild and Restart

```bash
docker stop my-container-name
docker rm my-container-name
docker build -t my-angular-app .
docker run -d -p 8080:80 --name my-container-name my-angular-app
```

## 📝 Notes

- The Angular app name is `demo` (see `angular.json → outputPath`)
- Make sure `nginx.conf` is saved **UTF-8 without BOM** to avoid `unknown directive "﻿server"` errors.
- Use `ng build --prod` manually if you want to test locally before dockerizing.
