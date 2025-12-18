import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-10" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Identidade Final
          </span>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Quem Você
            <span className="text-gradient"> Se Torna</span>
          </h2>
          
          <p className="text-foreground/70 text-lg leading-relaxed mb-8">
            Ao final da trilha dentro desse ecossistema, você não será apenas um "programador" 
            ou um "gestor de I.A". Você será um{" "}
            <span className="text-foreground font-semibold">
              Founder com habilidade na construção de INFRAESTRUTURA DE I.A.
            </span>
          </p>
          
          <p className="text-foreground/60 leading-relaxed mb-12">
            Alguém capaz de identificar uma ineficiência no mercado, arquitetar a solução 
            técnica e construir um negócio rentável em volta dela.
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-foreground/80 font-display text-lg">
              Bem-vindo ao FNB FOUNDERS.
            </p>
            <Button variant="hero" size="xl" className="group">
              Garantir Acesso
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
