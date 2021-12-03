## Build Phase
# Specify base image
FROM node:16-alpine as builder

# add working directory
WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .

RUN npm run build

## Run Phase
FROM nginx
EXPOSE 80
COPY --from=builder /usr/app/build /usr/share/nginx/html

# nginx starts up automatically
