import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { OptionCard } from "./OptionCard";
import { FormInput } from "./FormInput";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 8;

interface FormData {
  experience: string;
  businessModel: string;
  automationLevel: string;
  goal: string;
  investment: string;
  email: string;
  whatsapp: string;
}

export function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    experience: "",
    businessModel: "",
    automationLevel: "",
    goal: "",
    investment: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSelect = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const canProceed = () => {
    switch (step) {
      case 2:
        return !!formData.experience;
      case 3:
        return !!formData.businessModel;
      case 4:
        return !!formData.automationLevel;
      case 5:
        return !!formData.goal;
      case 6:
        return !!formData.investment;
      case 7:
        return !!formData.email && !!formData.whatsapp;
      default:
        return true;
    }
  };

  const validateContactForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
    }
    
    if (!formData.whatsapp || formData.whatsapp.replace(/\D/g, "").length < 10) {
      newErrors.whatsapp = "Por favor, insira um número válido com DDD";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 7) {
      if (!validateContactForm()) return;
    }
    if (canProceed() && step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateContactForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Usa API da Vercel em produção, localhost em desenvolvimento
      const apiUrl = import.meta.env.PROD 
        ? '/api/applications' 
        : 'http://localhost:3001/api/applications';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: formData.experience,
          businessModel: formData.businessModel,
          automationLevel: formData.automationLevel,
          goal: formData.goal,
          investment: formData.investment,
          email: formData.email,
          whatsapp: formData.whatsapp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar aplicação');
      }

      toast({
        title: "Aplicação enviada!",
        description: "Seus dados foram recebidos com sucesso.",
      });
      
      setStep(8);
    } catch (error) {
      console.error('Erro ao enviar aplicação:', error);
      toast({
        title: "Erro ao enviar",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    window.location.href = "/";
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {step > 1 && step < 8 && <ProgressBar currentStep={step - 1} totalSteps={TOTAL_STEPS - 2} />}
      
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Aplicação: FNB FOUNDERS Ecosystem
                </h1>
                <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                  Nós não buscamos multidões. Buscamos construtores. O FNB FOUNDERS é um ecossistema 
                  focado em alavancagem através de I.A., SWAS e MicroSaaS. Para manter a qualidade 
                  do networking, preciso entender seu momento atual. Responda com sinceridade. 
                  Se o seu perfil der "match", eu pessoalmente entrarei em contato.
                </p>
              </div>
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:opacity-90"
              >
                Iniciar Aplicação
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-semibold animate-fade-in">
                Há quanto tempo você atua profissionalmente no mercado digital?
              </h2>
              <div className="space-y-3">
                {[
                  "Sou um completo iniciante (0-6 meses)",
                  "Intermediário (6 meses - 2 anos)",
                  "Veterano (+2 anos de campo de batalha)",
                ].map((option, i) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={formData.experience === option}
                    onClick={() => handleSelect("experience", option)}
                    delay={i * 100}
                  />
                ))}
              </div>
              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
              />
            </div>
          )}

          {/* Step 3: Business Model */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-semibold animate-fade-in">
                Qual é a sua função ou modelo de negócio principal hoje?
              </h2>
              <div className="space-y-3">
                {[
                  "CLT / Buscando transição",
                  "Prestador de Serviço (Copy, Dev, Tráfego)",
                  "Dono de Agência Tradicional",
                  "Já possuo operação de SaaS/Software",
                  "Outro",
                ].map((option, i) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={formData.businessModel === option}
                    onClick={() => handleSelect("businessModel", option)}
                    delay={i * 100}
                  />
                ))}
              </div>
              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
              />
            </div>
          )}

          {/* Step 4: Automation Level */}
          {step === 4 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-semibold animate-fade-in">
                Qual o seu nível de contato com o mercado de Automação e MicroSaaS?
              </h2>
              <div className="space-y-3">
                {[
                  "Nenhum (Nunca ouvi falar)",
                  "Curioso (Estudei mas não vendi)",
                  "Iniciante (Atuo há -3 meses)",
                  "Praticante (Vendo soluções há +6 meses)",
                ].map((option, i) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={formData.automationLevel === option}
                    onClick={() => handleSelect("automationLevel", option)}
                    delay={i * 100}
                  />
                ))}
              </div>
              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
              />
            </div>
          )}

          {/* Step 5: Goal */}
          {step === 5 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-semibold animate-fade-in">
                O que você busca alcançar ao entrar para o FNB FOUNDERS?
              </h2>
              <div className="space-y-3">
                {[
                  "Cashflow Rápido (Preciso de caixa)",
                  "Eficiência/SWAS (Automatizar minha agência)",
                  "Equity/MicroSaaS (Construir ativos)",
                  "Networking (Estar na mesa certa)",
                ].map((option, i) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={formData.goal === option}
                    onClick={() => handleSelect("goal", option)}
                    delay={i * 100}
                  />
                ))}
              </div>
              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
              />
            </div>
          )}

          {/* Step 6: Investment */}
          {step === 6 && (
            <div className="space-y-8">
              <h2 className="text-xl md:text-2xl font-semibold animate-fade-in">
                Você está preparado para investir em ferramentas e mentorias para acelerar sua jornada nos próximos 2 anos?
              </h2>
              <div className="space-y-3">
                {[
                  "Sim, pronto para o jogo de longo prazo",
                  "Talvez, depende do valor",
                  "Não, busco apenas conteúdo gratuito",
                ].map((option, i) => (
                  <OptionCard
                    key={option}
                    label={option}
                    selected={formData.investment === option}
                    onClick={() => handleSelect("investment", option)}
                    delay={i * 100}
                  />
                ))}
              </div>
              <NavigationButtons
                onBack={handleBack}
                onNext={handleNext}
                canProceed={canProceed()}
              />
            </div>
          )}

          {/* Step 7: Contact Info */}
          {step === 7 && (
            <div className="space-y-8">
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl md:text-2xl font-semibold">
                  Quase lá!
                </h2>
                <p className="text-muted-foreground font-light">
                  Se aprovado, Ives Gabriel entrará em contato pessoalmente.
                </p>
              </div>
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
                <FormInput
                  label="Qual seu melhor E-mail?"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={errors.email}
                />
                <FormInput
                  label="Seu WhatsApp com DDD"
                  type="tel"
                  placeholder="(XX) 9XXXX-XXXX"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", formatWhatsApp(e.target.value))}
                  error={errors.whatsapp}
                  maxLength={16}
                />
              </div>
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium transition-all duration-300 hover:border-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Aplicação"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Success */}
          {step === 8 && (
            <div className="space-y-8 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Aplicação Recebida
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed max-w-md mx-auto">
                  Seus dados estão sendo analisados. Se o seu perfil estiver alinhado com o momento 
                  do FNB FOUNDERS, aguarde uma mensagem minha (Ives Gabriel) no seu WhatsApp nas 
                  próximas 24 horas. Fique atento também ao seu e-mail.
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-lg font-medium transition-all duration-300 hover:border-foreground hover:bg-secondary/50"
              >
                Voltar para a Página Inicial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavigationButtons({
  onBack,
  onNext,
  canProceed,
}: {
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
}) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium transition-all duration-300 hover:border-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>
      <button
        onClick={onNext}
        disabled={!canProceed}
        className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Continuar
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
