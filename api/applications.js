import { createClient } from '@supabase/supabase-js';

// Rate limiting simples em memória (para produção use Redis/Upstash)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 10;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip).filter(time => now - time < windowMs);
  
  if (requests.length >= maxRequests) {
    return false;
  }

  requests.push(now);
  rateLimitMap.set(ip, requests);
  return true;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Muitas requisições. Tente novamente em 15 minutos.' });
    }

    const { experience, businessModel, automationLevel, goal, investment, email, whatsapp } = req.body;

    // Validação
    if (!experience || !businessModel || !automationLevel || !goal || !investment || !email || !whatsapp) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const whatsappNumbers = whatsapp.replace(/\D/g, '');
    if (whatsappNumbers.length < 10) {
      return res.status(400).json({ error: 'WhatsApp inválido' });
    }

    // Supabase
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

    return res.status(201).json({ 
      success: true, 
      message: 'Aplicação recebida com sucesso',
      id: data.id 
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
