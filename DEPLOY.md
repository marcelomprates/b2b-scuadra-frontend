# Deploy Guide - B2B Scuadra Frontend

Este guia explica como fazer deploy da aplicação usando build otimizado e GitHub Container Registry.

## 📋 Visão Geral

Para resolver problemas de memória na VPS (4GB RAM), o build agora acontece **fora da VPS**:
- **GitHub Actions**: Faz build automático em cada push para `main`
- **VPS**: Apenas baixa e roda a imagem pronta (uso mínimo de recursos)

## 🚀 Métodos de Deploy

### Método 1: Deploy Automático (Recomendado)

**Como funciona:**
1. Você faz `git push` para a branch `main`
2. GitHub Actions faz build automaticamente
3. Imagem é enviada para GitHub Container Registry
4. Você roda o script de deploy na VPS

**Passo a passo:**

```bash
# 1. No seu computador: faça commit e push
git add .
git commit -m "Update app"
git push origin main

# 2. Aguarde build no GitHub (~2-3 minutos)
# Acompanhe em: https://github.com/marcelomprates/b2b-scuadra-frontend/actions

# 3. Na VPS: faça deploy
ssh seu-usuario@coolify.scuadra.com.br
bash deploy.sh
```

### Método 2: Build Manual Local

Se preferir fazer build no seu computador Windows:

```powershell
# No PowerShell (necessário estar logado no Docker)
.\build-and-push.ps1
```

O script irá:
1. Fazer build da imagem Docker
2. Perguntar se quer fazer push para registry
3. Mostrar próximos passos

Depois rode `deploy.sh` na VPS como no Método 1.

## ⚙️ Configuração Inicial (Uma vez)

### 1. Tornar Imagem Pública no GitHub

Para a VPS conseguir baixar a imagem sem autenticação:

1. Acesse: https://github.com/marcelomprates?tab=packages
2. Encontre `b2b-scuadra-frontend`
3. Clique em **Package settings**
4. Role até **Danger Zone**
5. Clique em **Change visibility** → **Public**

### 2. Preparar VPS

```bash
# SSH na VPS
ssh seu-usuario@coolify.scuadra.com.br

# Copiar script de deploy (primeira vez)
# No seu computador, envie o arquivo:
scp deploy.sh seu-usuario@coolify.scuadra.com.br:~/

# Na VPS, dar permissão de execução
chmod +x deploy.sh

# Editar configurações do script (ajustar REPO_OWNER se necessário)
nano deploy.sh
```

### 3. Login no GitHub Container Registry (Para Build Manual)

Se for usar build local (PowerShell):

```powershell
# Criar token: https://github.com/settings/tokens/new
# Permissões: write:packages, read:packages

docker login ghcr.io -u marcelomprates
# Quando pedir senha, cole o token
```

## 📊 Otimizações Implementadas

### Dockerfile
- ✅ Limite de memória: 512MB para Node.js
- ✅ `npm ci` ao invés de `npm install` (mais rápido)
- ✅ Multi-stage build (imagem final ~50MB)

### GitHub Actions
- ✅ Build em runners do GitHub (grátis)
- ✅ Tagging automático (latest + commit SHA)
- ✅ Cache de layers para builds mais rápidos

### VPS
- ✅ Apenas baixa imagem pronta (~50MB)
- ✅ Zero uso de memória para build
- ✅ Deploy em segundos

## 🔧 Troubleshooting

### Build falha no GitHub Actions

**Erro: `npm ci` falha**
```bash
# Certifique-se que package-lock.json está no repositório
git add package-lock.json
git commit -m "Add package-lock"
git push
```

### VPS não consegue baixar imagem

**Erro: `unauthorized` ou `denied`**
- Verifique se o pacote está **público** (ver seção Configuração Inicial)

**Erro: `connection timeout`**
```bash
# Verificar se Docker está rodando na VPS
sudo systemctl status docker

# Reiniciar se necessário
sudo systemctl restart docker
```

### Container não inicia

```bash
# Ver logs do container
docker logs scuadra-frontend

# Ver status
docker ps -a
```

### Ainda tendo timeout no site

```bash
# Verificar se porta está aberta
sudo netstat -tulpn | grep :80

# Verificar reverse proxy (nginx/caddy)
sudo systemctl status nginx
# ou
sudo systemctl status caddy
```

## 📈 Monitoramento Pós-Deploy

```bash
# Ver uso de recursos
docker stats scuadra-frontend

# Ver logs em tempo real
docker logs -f scuadra-frontend

# Verificar se está respondendo
curl http://localhost
```

## 🔄 Workflow Típico

```bash
# Desenvolvimento local
npm run dev

# Quando pronto para deploy
git add .
git commit -m "Feature: nova funcionalidade"
git push origin main

# Aguardar GitHub Actions (~2min)
# SSH na VPS e fazer deploy
ssh vps
bash deploy.sh

# Verificar
curl http://coolify.scuadra.com.br
```

## 💡 Dicas

- ✅ GitHub Actions é **gratuito** para repositórios públicos
- ✅ Build leva ~2-3 minutos no GitHub
- ✅ Deploy na VPS leva ~10-30 segundos
- ✅ Imagem final ocupa ~50MB
- ✅ Container usa ~20-50MB de RAM (vs 1-2GB do build)

## 🆘 Contato

Se encontrar problemas, verifique:
1. [GitHub Actions logs](https://github.com/marcelomprates/b2b-scuadra-frontend/actions)
2. Logs do container: `docker logs scuadra-frontend`
3. Status da VPS: `htop` ou `free -h`
