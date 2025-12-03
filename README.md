<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# B2B Scuadra Frontend

Dashboard de produção e logística para Scuadra.

View your app in AI Studio: https://ai.studio/apps/drive/1EQA9NXFs6HODZN9d_0TY0na-lXdfegNg

## 🚀 Deploy

Este projeto usa GitHub Actions para build automático e GitHub Container Registry.

**Deploy rápido:**
```bash
git push origin main  # GitHub Actions faz build automaticamente
# Aguarde ~2min, depois na VPS:
bash deploy.sh
```

📖 **[Guia completo de deploy](DEPLOY.md)**

## 💻 Desenvolvimento Local

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## 🐳 Docker

Build otimizado com limite de memória para VPS:
```bash
docker build -t scuadra-frontend .
docker run -p 80:80 scuadra-frontend
```

## 📦 Estrutura

- **GitHub Actions**: Build automático em cada push
- **Multi-stage Docker**: Build otimizado (512MB) + imagem final leve (~50MB)
- **Nginx**: Servidor web de produção
