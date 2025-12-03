# 🚀 Quick Setup - Primeiro Deploy

## ✅ Checklist de Configuração

### 1️⃣ Configurar GitHub Package (Uma vez)

Após fazer o primeiro push, você precisa tornar o package público:

1. Acesse: https://github.com/marcelomprates?tab=packages
2. Encontre: `b2b-scuadra-frontend`
3. **Package settings** → **Change visibility** → **Public**

> **Por quê?** Para a VPS conseguir baixar a imagem sem autenticação.

### 2️⃣ Primeiro Deploy

```bash
# 1. Fazer commit de todas as mudanças
git add .
git commit -m "ci: otimização de deploy com GitHub Actions"
git push origin main

# 2. Acompanhar build no GitHub (~2-3 min)
# https://github.com/marcelomprates/b2b-scuadra-frontend/actions

# 3. Quando o build terminar, preparar VPS
```

### 3️⃣ Configurar VPS (Uma vez)

```bash
# SSH na VPS
ssh seu-usuario@coolify.scuadra.com.br

# Copiar script de deploy
# No seu computador Windows (PowerShell):
scp deploy.sh seu-usuario@coolify.scuadra.com.br:~/

# Na VPS, dar permissão
chmod +x deploy.sh

# IMPORTANTE: Edite o script para ajustar seu username do GitHub
nano deploy.sh
# Mude a linha: REPO_OWNER="marcelomprates"  # Se necessário
```

### 4️⃣ Fazer Deploy na VPS

```bash
# Na VPS
bash deploy.sh
```

Se tudo der certo, você verá:
```
✅ Deployment successful!
🌐 Application is running on port 80
```

### 5️⃣ Verificar

```bash
# Na VPS
curl http://localhost

# No navegador
http://coolify.scuadra.com.br
```

## 🔄 Próximos Deploys

Depois da configuração inicial, deploy é simples:

```bash
# Seu computador
git add .
git commit -m "feat: nova feature"
git push origin main

# Aguardar build (~2min)

# VPS
ssh vps
bash deploy.sh
```

## 📊 Resultado Esperado

**Antes:**
- ❌ Build na VPS consumia ~2GB RAM
- ❌ Deploy causava timeout
- ❌ Sistema travava

**Depois:**
- ✅ Build no GitHub (0GB na VPS)
- ✅ Deploy em ~20 segundos
- ✅ Container usa apenas ~30MB RAM
- ✅ Sistema estável

## 🆘 Problemas?

Ver: [DEPLOY.md](DEPLOY.md) - Seção Troubleshooting

## 🎯 Opcional: Build Local

Se quiser testar build localmente antes de fazer push:

```powershell
# PowerShell (Windows)
.\build-and-push.ps1
```

Esse método **não é necessário** se estiver usando GitHub Actions!
