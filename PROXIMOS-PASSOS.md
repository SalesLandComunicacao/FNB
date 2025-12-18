# 🎯 PRÓXIMOS PASSOS - Deploy Vercel

## ✅ Git - CONCLUÍDO
- Repositório: https://github.com/SalesLandComunicacao/FNB
- Código enviado com sucesso!

## 📋 Agora faça:

### 1. Criar tabela no Supabase (SE AINDA NÃO FEZ)

1. Acesse: https://onykaepnlweqpljqlzih.supabase.co
2. Vá em **SQL Editor**
3. Copie todo o conteúdo de `supabase-schema.sql`
4. Cole e clique em **Run**

### 2. Deploy na Vercel

1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Selecione: **SalesLandComunicacao/FNB** (ou **fnbfounders**)
4. Em **Environment Variables**, adicione:

```
SUPABASE_URL
[Cole sua URL do Supabase aqui]

SUPABASE_SERVICE_ROLE_KEY
[Cole sua chave service_role aqui]
```

5. Clique em **"Deploy"**

### 3. Testar

Quando o deploy terminar:

1. Clique no link do site (ex: `fnb-founders.vercel.app`)
2. Clique em "QUERO APLICAR"
3. Preencha e envie o formulário
4. Verifique no Supabase se os dados foram salvos!

---

## 🚀 Comandos Git para futuras atualizações:

```bash
cd "C:\Users\silva\OneDrive\Área de Trabalho\FNB\fnbfounders"
git add .
git commit -m "Sua mensagem de update"
git push
```

A Vercel fará deploy automático após cada push! 🎉

---

## 📚 Documentação criada:

- `DEPLOY.md` - Guia completo de deploy
- `SETUP.md` - Setup de desenvolvimento local
- `server/README.md` - Documentação do backend
- `supabase-schema.sql` - SQL para criar tabela

## 🔥 Status:

- ✅ Frontend otimizado para Vercel
- ✅ API Serverless criada (`/api/applications`)
- ✅ Backend local para desenvolvimento
- ✅ Integração com Supabase
- ✅ Código no GitHub
- ⏳ **AGUARDANDO: Deploy na Vercel**
