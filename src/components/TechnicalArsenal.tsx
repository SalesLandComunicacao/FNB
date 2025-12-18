import { motion } from "framer-motion";
import { Cpu, Database, Code, Layers } from "lucide-react";

const tools = [
  {
    icon: Cpu,
    title: "Automação de Elite (N8N)",
    description: "Vá muito além do básico. Aprenda a evitar bloqueios em disparos, criar fluxos complexos e integrar APIs como um sênior.",
  },
  {
    icon: Database,
    title: "Inteligência de Dados",
    description: "Implementação real de RAG (Retrieval-Augmented Generation) e uso de Supabase como banco de dados para aplicações que param em pé.",
  },
  {
    icon: Code,
    title: "Desenvolvimento Acelerado por I.A.",
    description: "Use o Gemini como seu programador pessoal e domine o VS Code e Python sem precisar de 4 anos de faculdade.",
  },
  {
    icon: Layers,
    title: "Trilha No-Code Avançada",
    description: "Do zero ao avançado usando Antigravity e as melhores ferramentas do mercado.",
  },
];

const TechnicalArsenal = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Conhecimento Técnico
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            O Arsenal Técnico que
            <br />
            <span className="text-gradient">Você Vai Garantir</span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/60">
            Domine a BASE de ferramentas da Nova Economia. 
            Não ensinamos ferramentas soltas. Ensinamos a arquitetura de soluções robustas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative p-8 border border-border rounded-xl bg-card/30 hover:bg-card/60 hover:border-foreground/20 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-border flex items-center justify-center mb-6 group-hover:bg-foreground/10 group-hover:border-foreground/30 transition-all duration-300">
                <tool.icon className="w-6 h-6 text-foreground/80" />
              </div>

              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
                {tool.title}
              </h3>
              
              <p className="text-foreground/60 leading-relaxed">
                {tool.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalArsenal;
