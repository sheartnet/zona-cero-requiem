import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, AlertTriangle, Skull, Radio, MapPin } from 'lucide-react';

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

export default function Lore() {
  const timeline = [
    {
      period: "DÍA 0",
      title: "Paciente Cero",
      desc: "Un brote inexplicable en el hospital central. Las autoridades niegan cualquier peligro.",
      icon: AlertTriangle,
      status: "critical"
    },
    {
      period: "SEMANA 1",
      title: "La Caída",
      desc: "El ejército establece cuarentena. Las comunicaciones fallan. Los refugios se llenan.",
      icon: Radio,
      status: "danger"
    },
    {
      period: "MES 2",
      title: "Zona Cero",
      desc: "Los últimos bastiones caen. Los supervivientes se dispersan. Comienza la verdadera lucha.",
      icon: MapPin,
      status: "warning"
    },
    {
      period: "AÑO 1",
      title: "Requiem",
      desc: "El mundo que conocíamos ya no existe. Solo quedan ecos, ruinas y los que se niegan a morir.",
      icon: Skull,
      status: "current"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-700 border-red-700';
      case 'danger': return 'bg-red-700 border-red-700';
      case 'warning': return 'bg-red-700 border-red-700';
      case 'current': return 'bg-red-700 border-red-700';
      default: return 'bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-red-500" />
            <span className="text-red-400 tracking-[0.2em] text-xs uppercase">Historia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            El <span className="text-red-500">Lore</span>
          </h1>
          <p className="text-zinc-400 text-lg font-light max-w-2xl mb-16">
            Lo que pasó antes de que llegaras. Lo que necesitas saber para sobrevivir.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-5 bottom-5 w-px bg-red-500/80" />
          
          <div className="space-y-12">
            {timeline.map((event, i) => (
              <AnimatedSection key={i}>
                <div className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-none border ${getStatusColor(event.status)} flex items-center justify-center`}>
                      <event.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-6 border border-zinc-900 hover:border-red-500/40 bg-zinc-900/20 transition-all duration-300"
                    >
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-red-400 font-mono text-sm tracking-wider">{event.period}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-zinc-500 font-light">{event.desc}</p>
                    </motion.div>
                  </div>
                  
                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Discord CTA */}
        <AnimatedSection className="mt-24">
          <div className="p-8 border border-zinc-900 bg-[#080808] text-center">
            <Clock className="w-8 h-8 text-red-800/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">¿Quieres saber más?</h3>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              La historia completa, documentos clasificados y archivos de audio 
              están disponibles en nuestro Discord.
            </p>
            <a
              href="https://discord.gg/jXBDPKB6Ku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-500/60 text-red-400 hover:bg-red-500/10 transition-colors text-sm tracking-wide"
            >
              ACCEDER AL DISCORD
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}