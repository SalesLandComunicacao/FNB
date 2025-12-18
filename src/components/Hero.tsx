import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MorphingLogo from "./MorphingLogo";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial opacity-50" />
      
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-foreground/5 blur-[100px] animate-glow-pulse" />

      <div className="relative z-10 container px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground border border-border rounded-full">
            Isso não é para curiosos
          </span>
        </motion.div>

        {/* Morphing 3D Logo - Now fullscreen fixed */}
        <MorphingLogo />

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-gradient">FNB FOUNDERS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-lg md:text-xl lg:text-2xl text-muted-foreground uppercase tracking-[0.2em] mb-6"
        >
          Uma trilha de elite para empreendedores
          <br className="hidden md:block" /> da era da inteligência artificial
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto text-foreground/70 text-base md:text-lg leading-relaxed mb-8"
        >
          De Prestador de Serviço a Founder. A única trilha de alavancagem que importa 
          <span className="text-foreground font-medium"> PRA VOCÊ</span> nos próximos 2 anos.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <Button variant="hero" size="xl" className="group">
            Aplicar para o FNB Founders
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <span className="text-xs text-muted-foreground">
            Acesso imediato ao Ecossistema e Templates
          </span>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default Hero;
