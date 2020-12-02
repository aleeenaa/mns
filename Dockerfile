# Use the official image as a parent image.
FROM node:current-slim

# Set the working directory.
WORKDIR /usr/src/app

# Copy over package and yarn to tmp
ADD package.json yarn.lock /tmp/

# Initialise using yarn within tmp
RUN cd /tmp && yarn
RUN mkdir -p /var/www/api && cd /var/www/api && ln -s /tmp/node_modules

# Copy app
COPY . /usr/src/app

# Expose port
EXPOSE 3000

# Run app
CMD ["yarn","start"]

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .