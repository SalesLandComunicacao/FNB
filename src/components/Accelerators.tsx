import { motion } from "framer-motion";
import { Zap, Target, MessageCircle, Send } from "lucide-react";

const accelerators = [
  {
    icon: Target,
    title: "Máquina de Vendas B2B",
    description: "Fluxo de prospecção pronto para rodar.",
  },
  {
    icon: MessageCircle,
    title: "Sistema de Follow-up",
    description: "Automação para garantir que nenhum lead esfrie.",
  },
  {
    icon: Zap,
    title: "Fluxo de Atendimento",
    description: "Suporte automatizado para escalar sua operação.",
  },
  {
    icon: Send,
    title: "Infraestrutura de Disparos",
    description: "Templates de disparos em massa seguros.",
  },
];

const Accelerators = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="relative container px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              ROI Imediato
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Aceleradores</span>
            </h2>
            <p className="max-w-xl text-foreground/60 text-lg">
              Não comece do zero. Comece validado. Ao entrar no FNB FOUNDERS, 
              você recebe o download da nossa inteligência operacional:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accelerators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group p-6 border border-border/50 rounded-lg bg-card/20 hover:bg-card/50 hover:border-foreground/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/50">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accelerators;
