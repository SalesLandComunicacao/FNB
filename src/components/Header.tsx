import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : ""
      }`}
    >
      <div className="container px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="font-display text-xl font-bold tracking-tight">
            FNB<span className="text-muted-foreground">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#trilha" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              A Trilha
            </a>
            <a href="#arsenal" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Arsenal
            </a>
            <a href="#comunidade" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Comunidade
            </a>
            <a href="#pricing" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Investimento
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button variant="cta" size="sm" asChild>
              <Link to="/aplicar">
                Aplicar Agora
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6"
          >
            <nav className="flex flex-col gap-4">
              <a href="#trilha" className="text-foreground/60 hover:text-foreground transition-colors py-2">
                A Trilha
              </a>
              <a href="#arsenal" className="text-foreground/60 hover:text-foreground transition-colors py-2">
                Arsenal
              </a>
              <a href="#comunidade" className="text-foreground/60 hover:text-foreground transition-colors py-2">
                Comunidade
              </a>
              <a href="#pricing" className="text-foreground/60 hover:text-foreground transition-colors py-2">
                Investimento
              </a>
              <Button variant="cta" className="mt-2" asChild>
                <Link to="/aplicar">
                  Aplicar Agora
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
