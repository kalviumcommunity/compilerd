# Use the official Node.js image as the base image
FROM node:14

# Install necessary packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    openjdk-11-jdk \
    python3 \
    python3-pip \
    && apt-get clean

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
