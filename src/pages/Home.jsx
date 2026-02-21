import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Skull, Users, Shield, Radio, ChevronRight, Crosshair } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils/index';

const HERO_LOGO_ANCHOR = {
  x: 0.497,
  y: 0.2,
  width: 0.30,
  offsetX: 0,
  offsetY: 0,
  scaleX: 1.03,
  scaleY: 1.05,
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText = ({ text, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {text}
    </motion.span>
  );
};

export default function Home() {
  const heroContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const [logoPosition, setLogoPosition] = useState({ left: 0, top: 0, width: 0, ready: false });

  useEffect(() => {
    const updateLogoPosition = () => {
      const container = heroContainerRef.current;
      const image = heroImageRef.current;

      if (!container || !image || !image.naturalWidth || !image.naturalHeight) {
        return;
      }

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const imageWidth = image.naturalWidth;
      const imageHeight = image.naturalHeight;

      const coverScale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
      const renderedWidth = imageWidth * coverScale;
      const renderedHeight = imageHeight * coverScale;

      const offsetX = (containerWidth - renderedWidth) / 2;
      const offsetY = (containerHeight - renderedHeight) / 2;

      const left = offsetX + imageWidth * HERO_LOGO_ANCHOR.x * coverScale + HERO_LOGO_ANCHOR.offsetX;
      const top = offsetY + imageHeight * HERO_LOGO_ANCHOR.y * coverScale + HERO_LOGO_ANCHOR.offsetY;
      const width = imageWidth * HERO_LOGO_ANCHOR.width * coverScale;

      setLogoPosition({ left, top, width, ready: true });
    };

    updateLogoPosition();
    window.addEventListener('resize', updateLogoPosition);

    const image = heroImageRef.current;
    image?.addEventListener('load', updateLogoPosition);

    return () => {
      window.removeEventListener('resize', updateLogoPosition);
      image?.removeEventListener('load', updateLogoPosition);
    };
  }, []);

  const features = [
    { icon: Skull, title: "Supervivencia Extrema", desc: "Recursos escasos, decisiones letales" },
    { icon: Users, title: "RP Obligatorio", desc: "Inmersión total en cada interacción" },
    { icon: Shield, title: "Facciones Dinámicas", desc: "Alianzas que definen tu destino" },
    { icon: Radio, title: "Eventos Narrativos", desc: "Historia viva que evoluciona" },
  ];

  const infected = [
    { name: "Caminantes", desc: "Lentos pero numerosos", threat: 1 },
    { name: "Corredores", desc: "Rápidos y agresivos", threat: 2 },
    { name: "Acechadores", desc: "Silenciosos y letales", threat: 3 },
    { name: "Abominaciones", desc: "Raros pero devastadores", threat: 4 },
    { name: "Revenants", desc: "Persistentes y casi imposibles de detener", threat: 4, brokenThreat: true },
  ];

  const steps = [
    { num: "01", title: "Únete al Discord", desc: "Enlace en el botón superior" },
    { num: "02", title: "Descarga los Mods", desc: "Colección oficial de Steam" },
    { num: "03", title: "Lee las Normas", desc: "RP coherente obligatorio" },
    { num: "04", title: "Conéctate", desc: "IP: zonacero.server.com" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section ref={heroContainerRef} className="relative h-screen min-h-[560px] sm:min-h-[640px] md:min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            ref={heroImageRef}
            src="/images/hero_bg.png"
            alt="Hero background"
            className="w-full h-full object-cover object-center brightness-110"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/22 to-[#0a0a0a]" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={logoPosition.ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${logoPosition.left}px`,
            top: `${logoPosition.top}px`,
            width: `${logoPosition.width}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src="/images/logo-hero.png"
            alt="Zona Cero Logo"
            className="w-full h-auto"
            style={{
              transform: `scale(${HERO_LOGO_ANCHOR.scaleX}, ${HERO_LOGO_ANCHOR.scaleY})`,
              transformOrigin: 'center center',
            }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex items-end justify-center text-center px-6 pb-24 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://discord.gg/jXBDPKB6Ku"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-red-900/80 hover:bg-red-800 text-white rounded-none border border-red-800 transition-all duration-300 flex items-center gap-3"
            >
              <span className="font-medium tracking-wide">UNIRSE AL DISCORD</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to={createPageUrl("Normas")}
              className="px-8 py-4 bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-none border border-zinc-700 transition-all duration-300 font-medium tracking-wide"
            >
              VER NORMAS
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-red-800/50 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-red-800" />
              <span className="text-red-800/80 tracking-[0.2em] text-xs uppercase">Características</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16" style={{ fontFamily: "'Bitter', serif" }}>
              <AnimatedText text="¿Qué lo hace " delay={0.1} />
              <AnimatedText text="diferente?" className="text-zinc-500" delay={0.2} />
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {features.map((feature, i) => (
              <AnimatedSection key={i}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(139, 0, 0, 0.05)" }}
                  className="p-8 border border-zinc-900 hover:border-red-900/30 transition-all duration-500 group"
                >
                  <feature.icon className="w-8 h-8 text-red-800/60 mb-6 group-hover:text-red-700 transition-colors" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm font-light">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Infected Types */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-red-800" />
              <span className="text-red-800/80 tracking-[0.2em] text-xs uppercase">Amenazas</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16" style={{ fontFamily: "'Bitter', serif" }}>
              <AnimatedText text="Tipos de " delay={0.1} />
              <AnimatedText text="Infectados" className="text-red-800" delay={0.2} />
            </h2>
          </AnimatedSection>
          
          <div className="space-y-1">
            {infected.map((type, i) => (
              <AnimatedSection key={i}>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center justify-between p-6 border border-zinc-900 hover:border-red-900/30 transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-zinc-700 text-sm font-mono">0{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-red-700 transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-zinc-500 text-sm">{type.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-xs tracking-wide hidden sm:block">Nivel de peligrosidad:</span>
                    <div className="flex gap-1">
                    {[...Array(4)].map((_, j) => {
                      const isActive = j < type.threat;

                      if (type.brokenThreat) {
                        return (
                          <div
                            key={j}
                            className={`w-2 h-8 relative overflow-hidden ${isActive ? 'bg-red-800' : 'bg-zinc-800'}`}
                          >
                            <div className="absolute left-[-30%] top-[45%] w-[160%] h-[3px] bg-[#080808] rotate-[-18deg]" />
                            <div className="absolute left-[-25%] top-[56%] w-[150%] h-[2px] bg-[#080808] rotate-[14deg]" />
                          </div>
                        );
                      }

                      return (
                        <div
                          key={j}
                          className={`w-2 h-8 ${isActive ? 'bg-red-800' : 'bg-zinc-800'}`}
                        />
                      );
                    })}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-red-800" />
              <span className="text-red-800/80 tracking-[0.2em] text-xs uppercase">Comenzar</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-16" style={{ fontFamily: "'Bitter', serif" }}>
              <AnimatedText text="Cómo " delay={0.1} />
              <AnimatedText text="unirse" className="text-zinc-500" delay={0.2} />
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i}>
                <div className="relative">
                  <span className="text-7xl font-bold text-zinc-900 absolute -top-4 -left-2">
                    {step.num}
                  </span>
                  <div className="relative pt-12 pl-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-zinc-500 text-sm font-light">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 border border-zinc-800 bg-zinc-900/50">
              <Crosshair className="w-4 h-4 text-red-800" />
              <code className="text-zinc-400 font-mono text-sm">IP: zonacero.server.com:16261</code>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/Logo.png" alt="Zona Cero logo" className="w-6 h-6 object-contain opacity-80" />
            <span className="text-zinc-600 text-sm">Zona Cero: Requiem © 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to={createPageUrl("Mods")} className="text-zinc-500 hover:text-white text-sm transition-colors">
              Mods
            </Link>
            <Link to={createPageUrl("Lore")} className="text-zinc-500 hover:text-white text-sm transition-colors">
              Lore
            </Link>
            <Link to={createPageUrl("Normas")} className="text-zinc-500 hover:text-white text-sm transition-colors">
              Normas
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}