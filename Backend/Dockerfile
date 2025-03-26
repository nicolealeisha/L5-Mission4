# ---------------------------------------
# Development stage
# ---------------------------------------
FROM node:alpine AS build
WORKDIR /node

COPY package*.json ./

RUN npm install

COPY . .

# ---------------------------------------
# Production stage
# ---------------------------------------
FROM nginx:alpine AS production

# Install Node.js and npm in the production stage
RUN apk add --no-cache nodejs npm

WORKDIR /node

COPY package*.json /node/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
