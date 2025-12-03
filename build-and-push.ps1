# PowerShell script for local build and push (Windows)

# Configuration
$REGISTRY = "ghcr.io"
$REPO_OWNER = "marcelomprates"  # Change this to your GitHub username
$IMAGE_NAME = "b2b-scuadra-frontend"
$FULL_IMAGE = "$REGISTRY/$REPO_OWNER/$IMAGE_NAME"

Write-Host "🔨 Building Docker image..." -ForegroundColor Cyan
Write-Host "Image: $FULL_IMAGE" -ForegroundColor Gray

# Build the image
docker build -t ${FULL_IMAGE}:latest .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Ask if user wants to push
$push = Read-Host "Do you want to push to registry? (y/n)"
if ($push -eq "y" -or $push -eq "Y") {
    Write-Host "📤 Pushing image to registry..." -ForegroundColor Cyan
    
    # Login to GitHub Container Registry (if not already logged in)
    docker login $REGISTRY
    
    # Push the image
    docker push ${FULL_IMAGE}:latest
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Push failed!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Push successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "1. SSH into your VPS" -ForegroundColor Gray
    Write-Host "2. Run: bash deploy.sh" -ForegroundColor Gray
} else {
    Write-Host "⏭️  Skipping push" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ Done!" -ForegroundColor Green
