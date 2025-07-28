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

### Features
- Simple static file serving using `serve`
- Automatic restart on failure
- Lightweight Node.js Alpine image
- No complex build process needed

### Local Development
For local development without Docker:
```bash
npm install -g serve
serve -s . -l 3000
``` 