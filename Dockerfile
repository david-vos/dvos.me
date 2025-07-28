# Use Node.js Alpine image
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start serve
CMD ["serve", "-s", ".", "-l", "3000"] 