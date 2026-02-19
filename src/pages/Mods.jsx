import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, ExternalLink, Download, Wrench, Map, Users, Swords, Heart, Radio } from 'lucide-react';

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

export default function Mods() {
  const mods = [
    {
      icon: Wrench,
      name: "Arsenal de Zona Cero",
      desc: "Sistema de crafting expandido con más de 200 recetas de supervivencia.",
      category: "Gameplay"
    },
    {
      icon: Map,
      name: "Mapa Expandido",
      desc: "Nuevas zonas explorables con puntos de interés únicos.",
      category: "Mapa"
    },
    {
      icon: Users,
      name: "Sistema de Facciones",
      desc: "Crea o únete a grupos con territorios y objetivos propios.",
      category: "Social"
    },
    {
      icon: Swords,
      name: "Combate Mejorado",
      desc: "Animaciones realistas y sistema de daño por zonas.",
      category: "Combate"
    },
    {
      icon: Heart,
      name: "Medicina Avanzada",
      desc: "Sistema médico detallado con infecciones y tratamientos.",
      category: "Supervivencia"
    },
    {
      icon: Radio,
      name: "Comunicaciones",
      desc: "Radios funcionales para coordinar con otros supervivientes.",
      category: "Social"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-red-800" />
            <span className="text-red-800/80 tracking-[0.2em] text-xs uppercase">Modificaciones</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Mods del <span className="text-zinc-500">Servidor</span>
          </h1>
          <p className="text-zinc-400 text-lg font-light max-w-2xl mb-12">
            Todos los mods necesarios están en nuestra colección oficial. 
            Un click y estarás listo para entrar.
          </p>
        </AnimatedSection>

        {/* Steam Collection Button */}
        <AnimatedSection className="mb-20">
          <a
            href="https://steamcommunity.com/workshop/filedetails/?id=COLLECTION_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-8 border border-red-900/30 bg-red-900/5 hover:bg-red-900/10 transition-all duration-500"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 border border-red-800/30 flex items-center justify-center">
                <Download className="w-8 h-8 text-red-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Colección Steam Workshop</h2>
                <p className="text-zinc-500 text-sm">Suscríbete a todos los mods con un click</p>
              </div>
            </div>
            <ExternalLink className="w-6 h-6 text-zinc-600 group-hover:text-red-700 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </a>
        </AnimatedSection>

        {/* Mods List */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-8">
            <Package className="w-5 h-5 text-red-800/60" />
            <h2 className="text-sm tracking-[0.2em] text-zinc-500 uppercase">Mods Destacados</h2>
          </div>
        </AnimatedSection>

        <div className="space-y-1">
          {mods.map((mod, i) => (
            <AnimatedSection key={i}>
              <motion.div
                whileHover={{ x: 8 }}
                className="group p-6 border border-zinc-900 hover:border-zinc-800 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 border border-zinc-800 group-hover:border-red-900/50 flex items-center justify-center transition-colors">
                    <mod.icon className="w-5 h-5 text-zinc-600 group-hover:text-red-800 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-medium text-white">{mod.name}</h3>
                      <span className="text-xs text-zinc-600 border border-zinc-800 px-2 py-0.5">
                        {mod.category}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm font-light">{mod.desc}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Note */}
        <AnimatedSection className="mt-16">
          <div className="p-6 border border-zinc-900 bg-zinc-900/30">
            <p className="text-zinc-500 text-sm">
              <span className="text-zinc-400">Nota:</span> Los mods se actualizan automáticamente. 
              Si tienes problemas de conexión, verifica que todos estén actualizados en Steam.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}