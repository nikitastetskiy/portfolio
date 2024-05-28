FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Install build tools for node-sass
RUN apk add --no-cache make gcc g++ python3

# Install dependencies separately
COPY ./app/package*.json ./
RUN npm install

# Copy the rest of the application files
COPY ./app ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]