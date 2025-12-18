# 🚀 Deploy na Vercel - FNB FOUNDERS

## Arquitetura em Produção

```
Frontend (Vercel) → Vercel Serverless Function → Supabase
```

## 📋 Passo a passo para deploy

### 1. Preparar o repositório Git

```bash
# No diretório do projeto
git init
git add .
git commit -m "Initial commit - FNB Founders"
git branch -M main
git remote add origin https://github.com/SalesLandComunicacao/FNB.git
git push -u origin main
```

### 2. Criar tabela no Supabase

Se ainda não criou, execute o SQL de `supabase-schema.sql` no SQL Editor do Supabase.

### 3. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Importe o repositório: `SalesLandComunicacao/FNB`
4. Configure as variáveis de ambiente:

```env
SUPABASE_URL=https://onykaepnlweqpljqlzih.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueWthZXBubHdlcXBsanFsemloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzE0NTk2MiwiZXhwIjoyMDc4NzIxOTYyfQ.uyL-8XoymTtFy9kXPL9rRELNGLGfiQFyXT0fu0x3u14
```

5. Clique em **"Deploy"**

### 4. Pronto! 🎉

Seu site estará no ar em uma URL como: `https://fnb-founders.vercel.app`

## 🔒 Segurança

✅ **Chaves protegidas**
- Service role key fica nas variáveis de ambiente da Vercel
- Nunca exposta no frontend

✅ **Serverless Functions**
- API rodando em `/api/applications`
- Automaticamente escalável

✅ **Rate limiting**
- 10 requisições por IP a cada 15 minutos

## 📂 Estrutura do projeto

```
fnbfounders/
├── api/                    # Vercel Serverless Functions
│   └── applications.js     # Endpoint para salvar aplicações
├── src/                    # Frontend React
│   ├── components/
│   │   ├── application/    # Formulário de aplicação
│   │   └── ...
│   └── ...
├── server/                 # Backend local (dev apenas)
│   ├── index.js
│   └── .env
├── vercel.json            # Config da Vercel
├── supabase-schema.sql    # SQL para criar tabela
└── package.json
```

## 🔄 Desenvolvimento local

### Frontend + Backend local:

```bash
# Terminal 1 - Backend local
cd server
npm install
npm run dev  # http://localhost:3001

# Terminal 2 - Frontend
npm install
npm run dev  # http://localhost:8081
```

### Apenas Frontend (usando API da Vercel em produção):

```bash
npm run dev
# Mude temporariamente o código para usar a URL da Vercel
```

## 🌐 URLs

- **Desenvolvimento**: http://localhost:8081
- **Produção**: https://fnb-founders.vercel.app (ou seu domínio customizado)
- **API**: `/api/applications` (mesma origem)

## ⚡ Comandos Git úteis

```bash
# Fazer push de mudanças
git add .
git commit -m "Sua mensagem"
git push

# A Vercel faz deploy automaticamente após cada push!
```

## 🎯 Verificar deploy

1. Acesse o dashboard da Vercel
2. Veja os logs de build
3. Teste o formulário no site de produção
4. Confira os dados no Supabase (Table Editor > applications)

## 🚨 Troubleshooting

### Erro 500 na API:
- Verifique se as variáveis de ambiente estão corretas na Vercel
- Veja os logs em: Vercel Dashboard > Project > Functions

### Formulário não envia:
- Abra o DevTools (F12)
- Vá na aba Console
- Veja o erro exato

### Build falha:
- Verifique se `npm run build` funciona localmente
- Veja os logs de build na Vercel
