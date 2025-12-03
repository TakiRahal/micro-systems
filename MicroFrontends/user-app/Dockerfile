# ---------- BUILD STAGE ----------
FROM node:20.19-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN yarn install && yarn add -D esbuild@latest

COPY . .

RUN yarn rebuild esbuild || yarn add -D esbuild@latest

RUN yarn run build-prod

# ---------- PRODUCTION STAGE ----------
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built dist folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
