# --- Étape 1 : Build Angular ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copier tout le projet (ts, angular.json, etc.)
COPY . .

# Build de prod (devDependencies nécessaires dans cette étape)
RUN npm run build

# --- Étape 2 : Serveur Nginx ---
FROM nginx:1.29.2-alpine
WORKDIR /usr/share/nginx/html

# Copier le build Angular (Angular 20)
# Ajuste 'frontend' si ton nom de projet diffère dans angular.json
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

# Config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]