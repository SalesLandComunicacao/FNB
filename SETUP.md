# 🚀 Setup Completo - FNB FOUNDERS

## Arquitetura

```
Frontend (Vite + React) → Backend (Express) → Supabase
     :8081                    :3001           (cloud)
```

## 📋 Passo a passo

### 1. Criar tabela no Supabase

1. Acesse [https://onykaepnlweqpljqlzih.supabase.co](https://onykaepnlweqpljqlzih.supabase.co)
2. Vá em **SQL Editor**
3. Copie todo o conteúdo de `supabase-schema.sql`
4. Cole e execute no SQL Editor
5. Confirme que a tabela `applications` foi criada

### 2. Iniciar o Backend

```bash
# Terminal 1 - Backend
cd server
npm install   # (já foi executado)
npm run dev   # (já está rodando em http://localhost:3001)
```

### 3. Iniciar o Frontend

```bash
# Terminal 2 - Frontend
cd ..
npm run dev   # (já está rodando em http://localhost:8081)
```

## ✅ Testar integração

1. Acesse http://localhost:8081
2. Clique em qualquer botão "QUERO APLICAR"
3. Preencha o formulário completo
4. Clique em "Enviar Aplicação"
5. Verifique se aparece "Aplicação enviada com sucesso"

### Confirmar no Supabase

1. Volte ao [Supabase](https://onykaepnlweqpljqlzih.supabase.co)
2. Vá em **Table Editor**
3. Selecione a tabela `applications`
4. Veja os dados salvos!

## 🔒 Segurança implementada

✅ **Backend protege as chaves**
- Service role key está apenas no backend (`.env`)
- Frontend NUNCA vê a chave secreta

✅ **Rate limiting**
- Máximo 10 aplicações por IP a cada 15 minutos

✅ **CORS restrito**
- Apenas localhost permitido

✅ **Validações**
- Email, WhatsApp, campos obrigatórios

✅ **RLS (Row Level Security)**
- Apenas o backend pode inserir/ler dados

## 📊 Estrutura de dados

```sql
applications (
  id UUID PRIMARY KEY,
  experience TEXT,
  business_model TEXT,
  automation_level TEXT,
  goal TEXT,
  investment TEXT,
  email TEXT,
  whatsapp TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## 🔥 Status atual

- ✅ Backend rodando em http://localhost:3001
- ✅ Frontend rodando em http://localhost:8081
- ✅ Supabase conectado
- ✅ Integração funcionando

## 🚨 Importante para produção

Quando fizer deploy:

1. **Backend**: Atualize `ALLOWED_ORIGINS` no `.env` com seu domínio
2. **Frontend**: Atualize a URL da API (substituir `localhost:3001` pela URL do backend em produção)
3. **Nunca commite** o arquivo `.env` no git!
