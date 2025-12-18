import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const benefits = [
  "Acesso à Trilha Completa (Service → SaaS)",
  "Acesso ao Banco de Templates N8N",
  "Acesso às Calls Semanais e Gravações",
  "Acesso à Comunidade Discord",
];

type Plan = {
  id: string;
  title: string;
  badge?: string;
  price: string;
  suffix: string;
  highlight: string;
  description: string;
  buttonVariant: "cta" | "cta-outline";
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "monthly",
    title: "Plano Mensal",
    badge: "Explorador",
    price: "97",
    suffix: "/mês",
    highlight: "Flexibilidade total, cancele quando quiser.",
    description: "Entre no ecossistema e evolua no seu ritmo, com suporte intenso da comunidade.",
    buttonVariant: "cta-outline",
    features: [
      "Acesso completo à trilha Service → SaaS",
      "Presença garantida nas calls táticas semanais",
      "Vault de templates operacionais e playbooks",
    ],
  },
  {
    id: "annual",
    title: "Plano Anual",
    badge: "Founder",
    price: "897",
    suffix: "/ano",
    highlight: "Economize 23% e desbloqueie experiências exclusivas.",
    description: "Para quem já decidiu operar em alto nível e quer foco total nos próximos 12 meses.",
    buttonVariant: "cta",
    featured: true,
    features: [
      "Mentoria de alinhamento trimestral 1:1",
      "Prioridade em squads de construção e dealflow",
      'Sala privada "Founders Club" dentro do Discord',
    ],
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yMonthly = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const yAnnual = useTransform(scrollYProgress, [0, 1], [160, -120]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/25 to-background" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-foreground/10 blur-[180px] opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      
      <div className="relative container px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <motion.li 
                key={benefit} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <PricingCard plan={plans[0]} parallax={yMonthly} />
          <PricingCard plan={plans[1]} parallax={yAnnual} />
        </div>
      </div>
    </section>
  );
};

interface PricingCardProps {
  plan: Plan;
  parallax: MotionValue<number>;
}

const PricingCard = ({ plan, parallax }: PricingCardProps) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateFactor = 10;

    rotateX.set(((y - centerY) / centerY) * -rotateFactor);
    rotateY.set(((x - centerX) / centerX) * rotateFactor);
  };

  const resetRotation = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
      style={{ perspective: 1600 }}
    >
      <motion.div
        style={{
          y: parallax,
          rotateX: springX,
          rotateY: springY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
        onTouchStart={resetRotation}
        onTouchEnd={resetRotation}
        onTouchCancel={resetRotation}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur-2xl",
          "transition-transform duration-500 ease-out",
          plan.featured
            ? "border-foreground/30 shadow-[0_25px_80px_-40px_rgba(255,255,255,0.25)]"
            : "shadow-[0_20px_60px_-45px_rgba(255,255,255,0.2)]",
        )}
      >


        <div className="relative z-10 flex flex-col gap-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {plan.title}
              </span>
              {plan.badge && (
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                    plan.featured
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/10 text-foreground",
                  )}
                >
                  {plan.badge}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-end gap-2">
                <div>
                  <div className="flex items-start gap-1">
                    <span className="text-sm text-foreground/60">R$</span>
                    <span className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">
                    {plan.suffix}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/70">{plan.highlight}</p>
            </div>

            <p className="text-sm leading-relaxed text-foreground/60">
              {plan.description}
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.buttonVariant}
              size="lg"
              className="w-full group/button"
              asChild
            >
              <Link to="/aplicar">
                Quero Aplicar
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;
