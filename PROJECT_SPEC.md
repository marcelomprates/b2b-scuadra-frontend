# Especificação do Projeto B2B Scuadra

## 1. Contexto e Objetivo

### Situação Atual
A Scuadra Embalagens utiliza atualmente a plataforma **Flexy Sistemas** (SaaS terceirizado) para seu e-commerce B2B:
- **URL atual:** https://scuadraembalagens.com.br/flexyadmin/
- **Fornecedor:** https://www.flexy.com.br

### Objetivo do Projeto
Desenvolver uma **solução própria e customizada** para substituir a plataforma Flexy, garantindo:
- ✅ Maior controle sobre as funcionalidades
- ✅ Flexibilidade para implementar melhorias específicas
- ✅ Redução de dependência de fornecedor terceirizado
- ✅ Experiência otimizada para os clientes da Scuadra

### Novo Sistema
- **URL loja:** https://b2b.scuadra.com.br
- **URL admin:** https://b2b.scuadra.com.br/admin

---

## 2. Arquitetura e Integrações

### 2.1 Sistema ERP - Alterdata BIMER

O **Alterdata** é o sistema core (fonte da verdade) da Scuadra:

- **Localização:** Servidor local da Scuadra
- **Banco de dados:** SQL Server (local)
- **API:** Alterdata BIMER
  - **Documentação:** https://bimer-api-docs.alterdata.com.br/api_alterdata_bimer_11_01_05_00.html
  - **Status:** Já configurada no servidor
  - **Uso:** O novo B2B usará a mesma API existente

**Dados gerenciados no Alterdata:**
- ✅ Produtos (catálogo completo)
- ✅ Clientes e perfis
- ✅ Preços personalizados por perfil
- ✅ Formas de pagamento por cliente
- ✅ Estoque
- ✅ Processamento de pedidos
- ✅ Envio de e-mails de confirmação

### 2.2 Fluxo de Dados

```
┌──────────────────────────────────────────────────────────┐
│         ALTERDATA ERP (SQL Server Local)                 │
│  • Produtos (catálogo master)                            │
│  • Clientes com perfis específicos                       │
│  • Preços personalizados por perfil                      │
│  • Formas de pagamento por cliente                       │
│  • Controle de estoque                                   │
│  • Processamento de pedidos                              │
│  • Envio de e-mails                                      │
└──────────────────────────────────────────────────────────┘
                        ↕ ↕ ↕
            API Alterdata BIMER (REST)
                        ↕ ↕ ↕
┌──────────────────────────────────────────────────────────┐
│         NOVO B2B SCUADRA (Aplicação Web)                 │
│  • Sincronização automática de produtos                  │
│  • Sincronização automática de clientes                  │
│  • Catálogo filtrado por perfil                          │
│  • Carrinho de compras                                   │
│  • Checkout e finalização                                │
│  • Envio de pedidos via API                              │
│  • Painel administrativo                                 │
└──────────────────────────────────────────────────────────┘
                        ↓
                  Cliente final
```

**Sincronização:**
- **Produtos:** Automática (Alterdata → B2B)
- **Clientes:** Automática (Alterdata → B2B)
- **Pedidos:** API (B2B → Alterdata)
- **E-mails:** Enviados pelo Alterdata após receber pedido

---

## 3. Funcionalidades Core (Paridade com Flexy)

### 3.1 Autenticação e Gestão de Usuários

**Login de Clientes:**
- ✅ E-mail: vem do cadastro principal no Alterdata
- ✅ Senha: gerenciada no B2B (não no Alterdata)
- ✅ Recuperação de senha: via e-mail (enviado pelo B2B)
- ✅ Alteração de senha: pelo próprio cliente no frontend

**Tipos de usuário:**
1. **Cliente direto:** acessa apenas seu próprio perfil
2. **Representante:** acessa múltiplos clientes (redes de lojas)
3. **Administrador:** acesso total ao painel admin

### 3.2 Sistema de Perfis

Cada cliente possui um **perfil específico** que define:
- ✅ Produtos visíveis (catálogo filtrado)
- ✅ Preços personalizados
- ✅ Formas de pagamento disponíveis

**Regra crítica:** Um cliente **NUNCA** vê produtos ou preços de outro perfil.

### 3.3 Representantes (Redes de Lojas)

**Cenário:** Cliente com múltiplas lojas (ex: rede de restaurantes)

**Funcionalidade:**
- ✅ Criar representante principal
- ✅ Vincular múltiplas lojas pelo código de cliente
- ✅ Representante faz pedidos em nome das lojas vinculadas
- ✅ Cada loja tem seu próprio código de cliente no Alterdata

**Campos do representante:**
- Nome
- E-mail
- Telefone
- Senha
- Token de autenticação
- Lista de clientes vinculados (código + nome da loja)
- Percentual de comissão (opcional)

**Opção:** "Desbloquear automaticamente clientes cadastrados pelo representante"

### 3.4 Catálogo de Produtos

**Menu principal:**
- Categorias
- Higiene e Limpeza
- EPI, Calçados e Vestimentas
- Novidades
- Como montar
- **SUAS EMBALAGENS** ⭐ (catálogo personalizado)

**"Suas Embalagens":**
- Saudação personalizada: "Olá [NOME DO CLIENTE]!"
- Mostra apenas produtos do perfil do cliente
- Preços personalizados já aplicados
- Categorias de embalagens específicas do cliente:
  - Bowl
  - Divisória
  - Click Box
  - Fast Lock
  - Maleta
  - Kits
  - Padrão
  - Para Montar
  - Seladas
  - Linha Básica
  - Linha Prática
  - Bandeja

**Busca:**
- Barra de busca no topo
- Filtros por categoria

### 3.5 Carrinho e Checkout

**Carrinho:**
- Adicionar/remover produtos
- Alterar quantidades
- Visualizar subtotal
- Aplicar descontos (se aplicável)

**Checkout:**
- Confirmar endereço de entrega
- Selecionar forma de pagamento (baseado no perfil)
- Selecionar data de entrega via calendário
- Revisar pedido
- Finalizar

**Tela de sucesso:**
- Número do pedido
- Confirmação visual
- Informações do pedido

### 3.6 Minha Conta

- Histórico de pedidos
- Detalhes de cada pedido
- Status do pedido
- Dados cadastrais
- Alterar senha

### 3.7 Painel Administrativo

**Funcionalidades:**
- Visualizar todos os pedidos
- Filtrar pedidos por status, cliente, data
- Ver detalhes completos do pedido
- Gerenciar calendário de entrega (bloquear/desbloquear datas)
- Configurações do sistema

---

## 4. Novas Funcionalidades (Melhorias sobre Flexy)

### 4.1 Notificações de Estoque Baixo (MVP)

**Problema atual:** Na Flexy, o estoque não é mostrado aos clientes.

**Solução proposta:**
- ✅ Monitorar estoque via API Alterdata
- ✅ Notificar cliente quando produtos do seu portfólio estiverem com estoque baixo
- ✅ Sugerir quantidade de reposição baseada em histórico
- ✅ Botão de "Aprovar pedido rápido" direto da notificação

**Canais de notificação (fase 1):**
- E-mail
- Notificação no sistema (ao fazer login)

### 4.2 Notificações WhatsApp - Status do Pedido (Futuro)

**Objetivo:** Manter cliente informado sobre o andamento do pedido via WhatsApp.

**Status a notificar:**
- ✅ Pedido recebido
- ✅ Pedido em produção
- ✅ Pedido saiu para entrega
- ✅ Pedido entregue

**Implementação:** Integração com API WhatsApp Business

---

## 5. Fluxos Principais

### 5.1 Fluxo de Novo Pedido

```
1. Cliente faz login no B2B
   ↓
2. Acessa "Suas Embalagens" (catálogo personalizado)
   ↓
3. Adiciona produtos ao carrinho
   ↓
4. Vai para checkout
   ↓
5. Seleciona forma de pagamento (opções do seu perfil)
   ↓
6. Seleciona data de entrega (calendário)
   ↓
7. Revisa pedido
   ↓
8. Finaliza pedido
   ↓
9. B2B envia pedido via API Alterdata
   ↓
10. Alterdata processa e envia e-mail de confirmação
    ↓
11. Cliente visualiza pedido em "Minha Conta"
```

### 5.2 Fluxo de Sincronização de Produtos

```
1. Produtos são atualizados no Alterdata
   ↓
2. Sincronização automática: Alterdata → B2B
   ↓
3. B2B atualiza catálogo
   ↓
4. Clientes veem produtos atualizados
```

### 5.3 Fluxo de Representante (Rede de Lojas)

```
1. Representante faz login no B2B
   ↓
2. Visualiza lista de lojas vinculadas
   ↓
3. Seleciona loja para fazer pedido
   ↓
4. Acessa catálogo da loja selecionada
   ↓
5. Monta pedido
   ↓
6. No checkout, confirma que o pedido é para a loja X
   ↓
7. Finaliza pedido
   ↓
8. Pedido é enviado ao Alterdata com código da loja
```

---

## 6. Tecnologias e Arquitetura Técnica

### Frontend (Atual)
- **Framework:** React + Vite
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS (ou CSS vanilla)
- **Hospedagem:** VPS (servidor próprio)
- **CI/CD:** GitHub Actions + Docker

### Backend (A definir)
- **Opção 1:** Node.js + Express
- **Opção 2:** Next.js (API Routes)
- **Banco de dados:** PostgreSQL ou MySQL (para dados do B2B)
- **Integração:** API REST Alterdata BIMER

### Infraestrutura
- **VPS:** Servidor próprio da Scuadra
- **Docker:** Containerização
- **GitHub Container Registry:** Armazenamento de imagens Docker
- **Deploy:** Via script `deploy.sh`

---

## 7. Fases de Desenvolvimento

### Fase 1: MVP (Atual)
- ✅ Login/Logout
- 🚧 Catálogo básico
- 🚧 Carrinho
- 🚧 Checkout
- 🚧 Painel admin básico

### Fase 2: Homologação Interna
- Validação completa pela equipe Scuadra
- Correção de bugs
- Ajustes de UX

### Fase 3: Beta com Clientes Selecionados
- Liberação para grupo pequeno de clientes
- Coleta de feedback
- Ajustes finos

### Fase 4: Produção
- Migração oficial de todos os clientes
- Desativação da Flexy

### Fase 5: Novas Funcionalidades
- Notificações de estoque baixo
- Notificações WhatsApp
- Relatórios avançados
- APP mobile (futuro)

---

## 8. Referências Visuais

### Sistema Flexy Atual

**Cadastro de Representante:**
![Cadastro de Representante](file:///C:/Users/mprates/.gemini/antigravity/brain/f7c30c0b-7837-4082-87c6-f48fb2d5e003/uploaded_image_0_1764852132344.png)

**Lista de Clientes Vinculados:**
![Lista de Clientes](file:///C:/Users/mprates/.gemini/antigravity/brain/f7c30c0b-7837-4082-87c6-f48fb2d5e003/uploaded_image_1_1764852132344.png)

**Catálogo "Suas Embalagens":**
![Home Personalizada](file:///C:/Users/mprates/.gemini/antigravity/brain/f7c30c0b-7837-4082-87c6-f48fb2d5e003/uploaded_image_0_1764852495480.png)

**Produtos com Preços Personalizados:**
![Catálogo Embalagens](file:///C:/Users/mprates/.gemini/antigravity/brain/f7c30c0b-7837-4082-87c6-f48fb2d5e003/uploaded_image_1_1764852495480.png)

---

## 9. Considerações Importantes

### Segurança
- ✅ Autenticação JWT
- ✅ HTTPS obrigatório
- ✅ Isolamento total entre perfis de clientes
- ✅ Validação de permissões no backend

### Performance
- ✅ Cache de produtos
- ✅ Lazy loading de imagens
- ✅ Paginação de produtos
- ✅ Otimização de queries ao Alterdata

### UX/UI
- ✅ Design moderno e responsivo
- ✅ Navegação intuitiva
- ✅ Feedback visual de todas as ações
- ✅ Mensagens de erro claras

### Manutenibilidade
- ✅ Código limpo e documentado
- ✅ Testes automatizados
- ✅ Logs de erros e operações
- ✅ Monitoramento de uptime

---

## 10. Próximos Passos

1. ✅ Especificação completa (este documento)
2. 🚧 Desenvolvimento do catálogo funcional
3. 🚧 Desenvolvimento do carrinho
4. 🚧 Desenvolvimento do checkout
5. 🚧 Integração completa com API Alterdata
6. 🚧 Painel administrativo
7. 🚧 Sistema de representantes
8. 🚧 Testes internos
9. 🚧 Beta com clientes
10. 🚧 Produção

---

**Documento criado em:** 04/12/2024  
**Versão:** 1.0  
**Responsável:** Marcelo Prates
