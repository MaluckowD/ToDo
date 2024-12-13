# pull official base image
FROM node:18-alpine AS build
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# Silent clean install of npm
# RUN npm ci --silent
RUN npm install
# add app
COPY . /app/

# Build production
RUN npm run build
RUN npm install serve

## Start the app on port 3000
CMD npx serve -s build -l 3000