import { motion } from "framer-motion";

const MarketContext = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-20" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Section label */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            O Contexto
          </motion.span>

          {/* Main statement */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display text-3xl md:text-5xl font-bold leading-tight mb-8"
          >
            Te vendem o mercado de I.A, mas você ainda não entendeu ele{" "}
            <span className="text-gradient">por completo.</span>
          </motion.h2>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-foreground/70 text-lg leading-relaxed"
          >
            <p>
              O mercado mudou. A barreira técnica da programação caiu. Nos últimos 24 meses, 
              vimos a construção da infraestrutura de I.A. Agora, entramos na{" "}
              <span className="text-foreground font-medium">Era da Aplicação.</span>
            </p>
            
            <p>
              A maior transferência de riqueza desta década não irá para quem escreve códigos 
              complexos, mas para quem resolve{" "}
              <span className="text-foreground font-medium">problemas complexos</span> usando 
              as ferramentas certas.
            </p>
          </motion.div>

          {/* Two types comparison */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-8 border border-border/50 rounded-lg bg-card/30"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Tipo 01
              </div>
              <p className="text-foreground/60">
                O que compete por salário e é substituível.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-8 border border-foreground/30 rounded-lg bg-foreground/5 glow-sm"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-foreground mb-4">
                Tipo 02 — O Founder
              </div>
              <p className="text-foreground">
                Usa I.A. para alavancar sua execução e criar sistemas que trabalham enquanto ele dorme.
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 text-center text-lg text-foreground font-display"
          >
            O FNB FOUNDERS foi criado para garantir que você esteja no segundo grupo.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketContext;
