# 📋 Mapeamento API Alterdata BIMER para B2B Scuadra

**Versão API:** 11.01.05.00  
**Base URL Local:** `http://localhost:8085`  
**Documentação:** https://bimer-api-docs.alterdata.com.br/api_alterdata_bimer_11_01_05_00.html

---

## 1. Autenticação (JWT)

### POST `/api/autenticacao/token`
Cria o token JWT para autenticação em todas as requisições.

**Content-Type:** `application/x-www-form-urlencoded`

**Body:**
```
grant_type=password&username=SEU_USUARIO&password=SUA_SENHA
```

**Response:**
```json
{
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "df11fb7117264120a71b65311c943789",
  "expires_in": 899,
  "token_type": "bearer"
}
```

**⚠️ Importante:**
- Token expira em 899 segundos (~15 minutos)
- Usar header `Authorization: Bearer {accessToken}` em todas as requisições
- Usuário deve ter acesso ao módulo "Bimer API" no cadastro de usuários

---

## 2. Endpoints para o B2B

### 2.1 Clientes/Pessoas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pessoa/{identificador}` | Consultar pessoa por ID |
| GET | `/api/pessoa/cpfcnpj/{cpfcnpj}` | Consultar pessoa por CPF/CNPJ |
| POST | `/api/cliente` | Cadastrar pessoa como cliente |

**Campos importantes da Pessoa:**
- `Identificador` - ID único (10 caracteres alfanuméricos)
- `Nome` - Nome completo
- `Email` - E-mail principal
- `CpfCnpj` - CPF ou CNPJ
- `Enderecos[]` - Lista de endereços
- `FormaPagamento` - Forma de pagamento vinculada

---

### 2.2 Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produto` | Listar todos os produtos |
| GET | `/api/produto/{identificador}` | Consultar produto por ID |
| GET | `/api/produto/codigo/{codigo}` | Consultar produto por código |
| GET | `/api/produto/nome/{nome}` | Buscar produtos por nome |

---

### 2.3 Estoque

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/estoque/{codigoEmpresa}/{identificadorProduto}` | Consultar estoque de um produto |
| POST | `/api/estoque/produtos` | Consultar estoque de vários produtos |

**Query Parameters:**
- `identificadorSetor` - ID do setor
- `dataReferencia` - Data de referência (opcional, padrão: data atual)

**Response:**
```json
{
  "QuantidadeDisponivel": 100,
  "QuantidadeReservada": 10,
  "QuantidadeTotal": 110
}
```

---

### 2.4 Formas de Pagamento

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/formapagamento` | Listar todas as formas de pagamento |
| GET | `/api/formapagamento/{identificador}` | Consultar forma de pagamento por ID |

**Response:**
```json
{
  "Codigo": "000001",
  "Identificador": "00A0000001",
  "Nome": "Dinheiro",
  "TipoFormaPagamento": "Dinheiro",
  "SituacaoAdministrativa": {
    "Codigo": "000001",
    "Nome": "LIBERAÇÃO"
  }
}
```

---

### 2.5 Pedidos de Venda

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/pedidovenda` | Criar novo pedido de venda |
| GET | `/api/pedidovenda/{identificador}` | Consultar pedido por ID |
| GET | `/api/pedidovenda/codigo/{codigo}` | Consultar pedido por código |
| GET | `/api/pedidovenda/pessoa/{identificadorPessoa}` | Listar pedidos de uma pessoa |

**Estrutura do Pedido de Venda (POST):**
```json
{
  "IdentificadorCliente": "00A0000001",
  "IdentificadorEmpresa": "00A0000001",
  "IdentificadorOperacao": "00A0000001",
  "IdentificadorVendedor": "00A0000001",
  "IdentificadorFormaPagamento": "00A0000001",
  "Observacao": "Pedido via B2B",
  "DataEntrega": "2025-12-15T00:00:00Z",
  "Itens": [
    {
      "IdentificadorProduto": "00A0000002",
      "Quantidade": 10,
      "ValorUnitario": 25.50,
      "Observacao": "Item do pedido"
    }
  ],
  "Pagamentos": [
    {
      "IdentificadorFormaPagamento": "00A0000001",
      "Valor": 255.00,
      "NumeroDias": 30
    }
  ]
}
```

---

### 2.6 Grupo/Família de Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/grupoproduto` | Listar todos os grupos |
| GET | `/api/familiaproduto` | Listar todas as famílias |
| GET | `/api/familiaproduto/{identificador}` | Consultar família por ID |

---

### 2.7 Preços

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/preco` | Listar todas as tabelas de preços |
| GET | `/api/preco/{identificador}` | Consultar tabela de preço por ID |

---

### 2.8 Empresa

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/empresa` | Listar empresas |
| GET | `/api/empresa/codigo/{codigo}` | Consultar empresa por código |

---

### 2.9 Imagens de Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/imagemproduto/{identificadorProduto}` | Consultar imagens do produto |

---

## 3. Headers Padrão

Todas as requisições (exceto autenticação) devem incluir:

```
Content-Type: application/json
Authorization: Bearer {accessToken}
```

---

## 4. Testes no Postman

### Passo 1: Configurar Variáveis de Ambiente

| Variável | Valor |
|----------|-------|
| `base_url` | `http://localhost:8085` |
| `username` | (seu usuário Bimer) |
| `password` | (sua senha Bimer) |
| `token` | (será preenchido automaticamente) |

### Passo 2: Collection - Autenticação
```
POST {{base_url}}/api/autenticacao/token
Body (x-www-form-urlencoded):
  grant_type: password
  username: {{username}}
  password: {{password}}
```

**Script pós-requisição para salvar token:**
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.accessToken);
```

### Passo 3: Testar Endpoints

**Healthcheck:**
```
GET {{base_url}}/healthcheck
```

**Listar Produtos:**
```
GET {{base_url}}/api/produto
Authorization: Bearer {{token}}
```

**Listar Clientes:**
```
GET {{base_url}}/api/pessoa?tipoPessoa=J
Authorization: Bearer {{token}}
```

---

## 5. Erros Comuns

| Código | Descrição | Solução |
|--------|-----------|---------|
| 401 | Token expirado ou inválido | Gerar novo token |
| 403 | Sem permissão | Liberar acesso no cadastro de usuários |
| 400 | ID incorreto | Verificar se ID tem 10 caracteres |
| 405 | Método não suportado | Verificar versão da API |

---

## 6. Próximos Passos de Testes

1. **Autenticar** na API e obter token
2. **Listar clientes** para verificar estrutura de dados
3. **Listar produtos** para verificar catálogo
4. **Verificar estoque** de um produto específico
5. **Listar formas de pagamento** disponíveis
6. **Criar um pedido de teste** (ambiente de homologação)

---

## 7. Observações Importantes

- **Identificadores BIMER:** Sempre 10 caracteres alfanuméricos
- **Datas:** Formato ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
- **HTTPS:** Recomendado em produção para segurança do token
- **Rate Limiting:** Verificar limites de requisições por minuto

---

**Documento criado em:** 04/12/2024  
**Responsável:** Marcelo Prates
