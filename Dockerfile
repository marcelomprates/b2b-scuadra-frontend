# Build stage with memory optimizations
FROM node:20-alpine AS builder

WORKDIR /app

# Limit Node.js memory usage during build (512MB)
ENV NODE_OPTIONS="--max-old-space-size=512"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
