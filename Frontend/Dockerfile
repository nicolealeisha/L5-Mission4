# A multistage build, with the first stage named AS build
# https://docs.docker.com/build/building/multi-stage/
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Source => . (Current directory) Destination => WORKDIR inside the container
COPY . . 
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]