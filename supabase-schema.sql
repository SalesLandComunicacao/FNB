-- Tabela para armazenar as aplicações do FNB FOUNDERS
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  experience TEXT NOT NULL,
  business_model TEXT NOT NULL,
  automation_level TEXT NOT NULL,
  goal TEXT NOT NULL,
  investment TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por email
CREATE INDEX idx_applications_email ON applications(email);

-- Índice para ordenação por data
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Apenas leitura via service_role
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Política: apenas o backend (service_role) pode inserir
CREATE POLICY "Backend can insert applications"
  ON applications
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Política: apenas o backend (service_role) pode ler
CREATE POLICY "Backend can read applications"
  ON applications
  FOR SELECT
  TO service_role
  USING (true);
