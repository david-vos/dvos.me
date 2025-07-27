# Dvos.me - Personal Website

David Vos's personal website built with HTML, CSS, and JavaScript using P5.js for interactive graphics.

## Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Quick Start

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Or build and run manually:**
   ```bash
   # Build the Docker image
   docker build -t dvos-me .
   
   # Run the container
   docker run -d -p 3000:3000 --name dvos-me dvos-me
   ```

3. **Access the website:**
   - Open your browser and go to `http://localhost:3000`

### Build Process

The Docker build process includes:
- Minification of HTML, CSS, and JavaScript files
- Conversion of CDN script references to local files
- Optimization for production deployment

### Local Development

For local development without Docker:
```bash
# Install dependencies
npm install

# Run build process
npm run build

# Start development server
npm run dev
```

### Health Check

The container includes a health check endpoint at `/health` that returns a simple "healthy" response.

### Port Configuration

The website runs on port 3000 by default. You can change this by modifying the `docker-compose.yml` file or using the `-p` flag with docker run.

### Nginx Proxy Manager Integration

Since this container exposes port 3000, you can easily integrate it with Nginx Proxy Manager by:
1. Adding a new proxy host
2. Setting the upstream to `http://your-server-ip:3000`
3. Configuring your domain and SSL certificates as needed 