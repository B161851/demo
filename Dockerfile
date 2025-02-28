# Use official Node.js image as the base image
FROM node:16 AS build

# Set environment variable for the public key (using an argument)
ARG PUBLIC_KEY
ENV PUBLIC_KEY=$PUBLIC_KEY

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Inject the environment variable into the Angular build
RUN echo "export PUBLIC_KEY=${PUBLIC_KEY}" >> /etc/environment && \
    npm run build --configuration production

# Use a lightweight server to serve the built Angular app
FROM nginx:alpine

# Copy the built Angular app into the nginx folder
COPY --from=build /app/dist/your-app-name /usr/share/nginx/html

# Expose the port for nginx
EXPOSE 80
