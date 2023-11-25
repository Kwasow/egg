FROM node:20-bookworm

# Setup working directory
WORKDIR /egg/app
ENV PATH /egg/app/node_modules/.bin:$PATH

# Install missing packages
RUN apt update && apt install -y yarnpkg php php-pgsql

# Run the webapp
EXPOSE 3000
COPY . .
RUN yarn install
CMD [ "yarn", "start" ]
