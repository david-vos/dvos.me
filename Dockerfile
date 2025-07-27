# Use Node.js for build process
FROM node:18-alpine AS builder

# Install build tools
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package files for build dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy source files
COPY . .

# Build and minify the website
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 for local access
EXPOSE 3000

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"] 