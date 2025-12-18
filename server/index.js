import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase client com service_role key (backend apenas)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Segurança
app.use(helmet());

// CORS - apenas origens permitidas
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rate limiting - máximo 10 requisições por 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint para submeter aplicação
app.post('/api/applications', limiter, async (req, res) => {
  try {
    const { experience, businessModel, automationLevel, goal, investment, email, whatsapp } = req.body;

    // Validação básica
    if (!experience || !businessModel || !automationLevel || !goal || !investment || !email || !whatsapp) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Validação de WhatsApp (apenas números, mínimo 10 dígitos)
    const whatsappNumbers = whatsapp.replace(/\D/g, '');
    if (whatsappNumbers.length < 10) {
      return res.status(400).json({ error: 'WhatsApp inválido' });
    }

    // Inserir no Supabase
    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          experience,
          business_model: businessModel,
          automation_level: automationLevel,
          goal,
          investment,
          email,
          whatsapp
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return res.status(500).json({ error: 'Erro ao salvar aplicação' });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Aplicação recebida com sucesso',
      id: data.id 
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  console.log(`📊 Supabase conectado: ${process.env.SUPABASE_URL}`);
});
