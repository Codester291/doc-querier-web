# Use an appropriate base image that supports Node.js
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Install dependencies
RUN npm install

# # Build the project
RUN npm run build

# Expose the desired port (change '3000' to the port used by your Vite React app)
EXPOSE 5173

# Set the command to start the app (change 'serve' to the command that runs your app)
CMD ["npm", "run", "dev"]