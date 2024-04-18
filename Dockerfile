# Use Node.js base image
FROM node:18.13.0
# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Copy .env file
COPY .env ./

# Set NODE_ENV to staging
ENV NODE_ENV=staging

# Expose port
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
