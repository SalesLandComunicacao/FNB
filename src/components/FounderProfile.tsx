import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ivesImage from "@/assets/ives-gabriel.jpeg";

const FounderProfile = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative container px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            O Arquiteto
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Quem é o <span className="text-gradient">Founder</span> por trás?
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <img
                src={ivesImage}
                alt="Ives Gabriel - Founder & Lead Architect"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-foreground/10 rounded-xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-foreground/5 rounded-xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-6">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Ives Gabriel
              </h3>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Founder & Lead Architect
              </p>
            </div>

            <div className="space-y-5 text-foreground/70 leading-relaxed">
              <p>
                Com apenas 22 anos, Ives Gabriel acumula 5 anos de experiência no "front" 
                do mercado digital, operando onde a estratégia encontra a tecnologia.
              </p>
              
              <p>
                Iniciou sua trajetória nos bastidores como Product Manager e Estrategista 
                no mercado de infoprodutos, dominando a arte da escala e da venda online. 
                Mas foi em 2023 que realizou seu movimento mais ousado: pivotou uma operação 
                que já faturava múltiplos de{" "}
                <span className="text-foreground font-medium">R$ 5 Milhões</span>, direcionando 
                100% dos recursos para a fronteira da Inteligência Artificial.
              </p>
              
              <p>
                Não é um teórico. Ives é um construtor ativo. Hoje, lidera a{" "}
                <span className="text-foreground font-medium">Sales Land</span>, uma operação 
                modelo SWAS de alta performance, e possui em seu portfólio{" "}
                <span className="text-foreground font-medium">3 MicroSaaS proprietários</span>{" "}
                que, somados, geram um MRR de{" "}
                <span className="text-foreground font-medium">R$ 500.000</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-3 gap-4">
              <div>
                <div className="font-display text-2xl font-bold text-gradient">5+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Anos de Exp.</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-gradient">R$ 5M+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Faturados</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-gradient">R$ 500k</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">MRR</div>
              </div>
            </div>

            <p className="mt-8 text-foreground/60 text-sm italic">
              "Criou o FNB FOUNDERS com uma missão clara: abrir a caixa-preta de seus próprios 
              negócios para formar a próxima geração de construtores de tecnologia do Brasil."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderProfile;
