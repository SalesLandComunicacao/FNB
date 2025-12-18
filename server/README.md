# Backend FNB FOUNDERS

Backend seguro para armazenar aplicações no Supabase.

## 🚀 Setup

### 1. Criar tabela no Supabase

Execute o SQL que está em `../supabase-schema.sql` no SQL Editor do Supabase.

### 2. Instalar dependências

```bash
cd server
npm install
```

### 3. Configurar variáveis de ambiente

O arquivo `.env` já está configurado com suas credenciais.

### 4. Rodar o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

## 🔒 Segurança

- ✅ Helmet para headers de segurança
- ✅ CORS restrito a origens específicas
- ✅ Rate limiting (10 requisições por 15min)
- ✅ Chave service_role apenas no backend
- ✅ Validação de dados
- ✅ RLS (Row Level Security) no Supabase

## 📡 API

### POST `/api/applications`

Envia uma nova aplicação.

**Body:**
```json
{
  "experience": "string",
  "businessModel": "string",
  "automationLevel": "string",
  "goal": "string",
  "investment": "string",
  "email": "string",
  "whatsapp": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Aplicação recebida com sucesso",
  "id": "uuid"
}
```

## 🛠️ Produção

Para deploy em produção:

1. Configure as variáveis de ambiente no seu host
2. Atualize `ALLOWED_ORIGINS` com seu domínio de produção
3. Rode `npm start`
