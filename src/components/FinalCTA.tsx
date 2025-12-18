import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-10" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            Identidade Final
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight"
          >
            Quem Você
            <span className="text-gradient"> Se Torna</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/70 text-lg leading-relaxed mb-8"
          >
            Ao final da trilha dentro desse ecossistema, você não será apenas um "programador" 
            ou um "gestor de I.A". Você será um{" "}
            <span className="text-foreground font-semibold">
              Founder com habilidade na construção de INFRAESTRUTURA DE I.A.
            </span>
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-foreground/60 leading-relaxed mb-12"
          >
            Alguém capaz de identificar uma ineficiência no mercado, arquitetar a solução 
            técnica e construir um negócio rentável em volta dela.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-foreground/80 font-display text-lg">
              Bem-vindo ao FNB FOUNDERS.
            </p>
            <Button variant="hero" size="xl" className="group">
              Garantir Acesso
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
