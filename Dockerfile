FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application using nodemon
CMD ["npm", "run", "dev"]
