# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
# COPY ["package.json" "yarn.lock"] .
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /var/www/api && cd /var/www/api && ln -s /tmp/node_modules
# Copy app
COPY . /usr/src/app
# Expose port
EXPOSE 3000
# Run app
CMD ["yarn","start"]

# Run the command inside your image filesystem.
# RUN yarn install --pure-lockfile

# # Add metadata to the image to describe which port the container is listening on at runtime.
# EXPOSE 3000

# # Run the specified command within the container.
# CMD [ "npm", "start" ]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Set the base image
# FROM ubuntu:latest

# # Define working directory
# WORKDIR /usr/src/app

# # Install node_modules with yarn
# ADD package.json yarn.lock /tmp/
# RUN cd /tmp && yarn
# RUN mkdir -p /var/www/api && cd /var/www/api && ln -s /tmp/node_modules
# # Copy app
# COPY . /usr/src/app
# # Expose port
# EXPOSE 3000
# # Run app
# CMD ["yarn","start"]