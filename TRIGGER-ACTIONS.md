# Como Triggar o Primeiro Build Manualmente

Se o package não apareceu, pode ser que o GitHub Actions precise ser ativado manualmente no primeiro uso.

## Opção 1: Via Interface do GitHub

1. Acesse: https://github.com/marcelomprates/b2b-scuadra-frontend/actions
2. Se aparecer **"Workflows"** no menu lateral esquerdo:
   - Clique em **"Build and Push to GitHub Container Registry"**
   - Clique no botão **"Run workflow"** (botão verde)
   - Selecione branch **"main"**
   - Clique em **"Run workflow"**
3. Aguarde ~2-3 minutos para o build completar

## Opção 2: Via Commit Vazio (Force Trigger)

Se o Actions não aparecer ou não der opção de rodar manualmente:

```powershell
# No PowerShell - forçar novo commit
git commit --allow-empty -m "trigger: primeira execução do GitHub Actions"
git push origin main
```

## Opção 3: Verificar se Actions está Habilitado

1. Acesse: https://github.com/marcelomprates/b2b-scuadra-frontend/settings/actions
2. Verifique se está em **"Allow all actions and reusable workflows"**
3. Se não estiver, selecione essa opção e salve

## O que Esperar

Quando o Actions rodar com sucesso, você verá:
- ✅ Check verde no commit
- Package aparecerá em: https://github.com/marcelomprates?tab=packages
- Imagem disponível em: `ghcr.io/marcelomprates/b2b-scuadra-frontend:latest`
