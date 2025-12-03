#!/bin/bash
set -e

# Configuration
REGISTRY="ghcr.io"
REPO_OWNER="marcelomprates"  # Change this to your GitHub username
IMAGE_NAME="b2b-scuadra-frontend"
CONTAINER_NAME="scuadra-frontend"
PORT="80"

echo "🚀 Deploying Scuadra Frontend..."
echo "Registry: $REGISTRY"
echo "Image: $REGISTRY/$REPO_OWNER/$IMAGE_NAME:latest"

# Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "🛑 Stopping existing container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
fi

# Pull latest image
echo "📥 Pulling latest image..."
docker pull $REGISTRY/$REPO_OWNER/$IMAGE_NAME:latest

# Run new container
echo "🏃 Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:80 \
    $REGISTRY/$REPO_OWNER/$IMAGE_NAME:latest

# Wait a moment for container to start
sleep 2

# Check if container is running
if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "✅ Deployment successful!"
    echo "🌐 Application is running on port $PORT"
    docker ps --filter "name=$CONTAINER_NAME" --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
else
    echo "❌ Container failed to start. Checking logs..."
    docker logs $CONTAINER_NAME
    exit 1
fi

# Cleanup old images
echo "🧹 Cleaning up old images..."
docker image prune -f

echo ""
echo "✨ Deployment complete!"
echo "Access your application at: http://coolify.scuadra.com.br"
