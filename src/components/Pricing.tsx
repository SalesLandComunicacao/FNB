import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "Acesso à Trilha Completa (Service → SaaS)",
  "Acesso ao Banco de Templates N8N",
  "Acesso às Calls Semanais e Gravações",
  "Acesso à Comunidade Discord",
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-foreground/5 blur-[150px]" />
      
      <div className="relative container px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Join FNB Founders
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">A Proposta</span>
          </h2>
          <p className="max-w-xl mx-auto text-foreground/60">
            O investimento para acessar o ecossistema que vai mudar sua realidade 
            financeira nos próximos 2 anos.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-foreground/80">{benefit}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Monthly */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 border border-border rounded-xl bg-card/30 hover:bg-card/50 transition-colors duration-300"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Plano Mensal
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm text-foreground/60">R$</span>
              <span className="font-display text-5xl font-bold">97</span>
              <span className="text-foreground/60">/mês</span>
            </div>
            <Button variant="cta-outline" size="lg" className="w-full group">
              Quero Aplicar
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Annual - Featured */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-8 border border-foreground/30 rounded-xl bg-foreground/5 glow"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs uppercase tracking-[0.15em] font-semibold rounded-full">
              Founder
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-foreground/80 mb-2">
              Plano Anual
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-sm text-foreground/60">R$</span>
              <span className="font-display text-5xl font-bold text-foreground">897</span>
              <span className="text-foreground/60">/ano</span>
            </div>
            <div className="text-sm text-foreground/50 mb-6">
              Equivale a R$ 74,75/mês
            </div>
            <Button variant="cta" size="lg" className="w-full group">
              Quero Aplicar
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
