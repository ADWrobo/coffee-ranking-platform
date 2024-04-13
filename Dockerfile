# Build the Angular project
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the Angular application
RUN npm run build

# Serve the app using Express
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the built Angular app and server files
COPY --from=build /app/dist /app/dist
COPY server.js ./
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["node", "server.js"]
