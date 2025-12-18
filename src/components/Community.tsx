import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Calendar, Mic } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community First",
    description: "Acesso ao nosso Discord exclusivo para networking técnico e de negócios.",
  },
  {
    icon: Calendar,
    title: "Weekly Updates",
    description: "Calls semanais toda quarta-feira para dissecar as atualizações do mercado.",
  },
  {
    icon: Mic,
    title: "Guest Speakers",
    description: "Acesso a insights de players como Ives Gabriel, Bruno Falcão, Erick Pinheiro e Felipe Santos.",
  },
];

const Community = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 neural-pattern opacity-20" />
      
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Networking
          </span>
          
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Você é a média das 5 pessoas
            <br />
            <span className="text-gradient">com quem constrói.</span>
          </h2>
          
          <p className="text-foreground/60 text-lg mb-16">
            No FNB FOUNDERS, você senta na mesa com quem está no campo de batalha.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-foreground/5 border border-border flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-7 h-7 text-foreground/80" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
