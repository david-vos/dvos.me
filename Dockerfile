# Use Node.js Alpine image
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Expose port 4545
EXPOSE 4545

# Start serve
CMD ["serve", "-s", ".", "-l", "4545"] 