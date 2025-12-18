import { motion } from "framer-motion";

const phases = [
  {
    number: "01",
    title: "CASHFLOW",
    subtitle: "O Capital Inicial",
    model: "Agência de I.A. & Automação",
    description: "Aqui o foco é geração de caixa rápido. Você aprenderá a estruturar uma operação de serviço enxuta, usando nossos templates de prospecção e vendas para fechar contratos high-ticket.",
    meta: "Financiar sua liberdade e entender as dores reais do mercado B2B.",
  },
  {
    number: "02",
    title: "EFICIÊNCIA",
    subtitle: "A Transição",
    model: "SWAS (Software With A Service)",
    description: "Você deixa de ser um 'fazedor' e passa a ser um gestor de sistemas. Transformamos sua consultoria em um híbrido de software e serviço, aumentando drasticamente sua margem de lucro.",
    meta: "Escalar sem escalar equipe.",
  },
  {
    number: "03",
    title: "EQUITY",
    subtitle: "O Objetivo Final",
    model: "Software House & MicroSaaS",
    description: "O ápice da jornada. Com caixa e validação, você constrói ativos digitais proprietários. Produtos que rodam 24/7, escalam infinitamente e podem ser vendidos (Exit).",
    meta: "Construir patrimônio real.",
  },
];

const FounderPath = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="relative container px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            A Metodologia
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            A Trilha do <span className="text-gradient">FOUNDER</span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60">
            Nós desenhamos o caminho exato para você sair da venda de horas e chegar à escala, 
            baseado em modelos de negócio reais.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-foreground/30 to-border" />

          {/* Phases */}
          <div className="space-y-16">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 60, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Phase number node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-background border-2 border-foreground/30 flex items-center justify-center z-10">
                  <span className="font-display text-lg font-bold text-gradient">{phase.number}</span>
                </div>

                {/* Content card */}
                <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="p-8 border border-border rounded-xl bg-card/50 hover:bg-card/80 transition-colors duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Fase {phase.number}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                        {phase.subtitle}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                      {phase.title}
                    </h3>
                    
                    <div className="text-sm text-foreground/80 font-medium mb-4 px-3 py-1 bg-foreground/5 rounded-full inline-block">
                      {phase.model}
                    </div>
                    
                    <p className="text-foreground/60 leading-relaxed mb-6">
                      {phase.description}
                    </p>
                    
                    <div className="pt-4 border-t border-border/50">
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Meta:</span>
                      <p className="text-foreground/80 mt-1">{phase.meta}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderPath;
