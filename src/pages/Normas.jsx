import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Ban, MessageSquare, Users, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

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

export default function Normas() {
  const rules = [
    {
      icon: Ban,
      title: "Prohibido Meta-gaming",
      desc: "No uses información fuera del juego para obtener ventaja. Tu personaje solo sabe lo que ha vivido.",
      severity: "critical"
    },
    {
      icon: AlertTriangle,
      title: "Prohibido Griefing",
      desc: "No destruyas bases ni mates sin motivo RP. Cada acción debe tener una razón narrativa.",
      severity: "critical"
    },
    {
      icon: MessageSquare,
      title: "RP Coherente Obligatorio",
      desc: "Mantén tu personaje en todo momento. El chat de voz es siempre en personaje.",
      severity: "high"
    },
    {
      icon: Users,
      title: "Discord Obligatorio",
      desc: "Debes estar en el Discord del servidor para coordinar eventos y resolver conflictos.",
      severity: "high"
    },
    {
      icon: Heart,
      title: "Respeto Entre Jugadores",
      desc: "Fuera del RP, trata a todos con respeto. Separar jugador de personaje.",
      severity: "medium"
    },
  ];

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-700 bg-red-900/5';
      case 'high': return 'border-l-orange-700 bg-orange-900/5';
      case 'medium': return 'border-l-yellow-700 bg-yellow-900/5';
      default: return 'border-l-zinc-700 bg-zinc-900/5';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical': return { text: 'BAN PERMANENTE', color: 'text-red-600 border-red-800' };
      case 'high': return { text: 'BAN TEMPORAL', color: 'text-orange-600 border-orange-800' };
      case 'medium': return { text: 'ADVERTENCIA', color: 'text-yellow-600 border-yellow-800' };
      default: return { text: '', color: '' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-red-800" />
            <span className="text-red-800/80 tracking-[0.2em] text-xs uppercase">Obligatorio</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-zinc-500">Normas del</span> Servidor
          </h1>
          <p className="text-zinc-400 text-lg font-light max-w-2xl mb-4">
            Lee y acepta estas normas antes de jugar. 
            El desconocimiento no exime de responsabilidad.
          </p>
        </AnimatedSection>

        {/* Warning Banner */}
        <AnimatedSection className="mb-12">
          <div className="flex items-center gap-4 p-4 border border-red-900/30 bg-red-900/10">
            <Shield className="w-6 h-6 text-red-700 flex-shrink-0" />
            <p className="text-zinc-400 text-sm">
              <span className="text-red-600 font-medium">Importante:</span> Al conectarte aceptas cumplir estas normas. 
              Los administradores tienen la última palabra en conflictos.
            </p>
          </div>
        </AnimatedSection>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule, i) => {
            const badge = getSeverityBadge(rule.severity);
            return (
              <AnimatedSection key={i}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className={`p-6 border border-zinc-900 border-l-4 ${getSeverityStyle(rule.severity)} transition-all duration-300`}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      <rule.icon className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{rule.title}</h3>
                        <span className={`text-xs border px-2 py-0.5 ${badge.color}`}>
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-zinc-500 font-light">{rule.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Agreement Section */}
        <AnimatedSection className="mt-16">
          <div className="p-8 border border-zinc-900 bg-[#080808]">
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Al conectarte, confirmas que:</h3>
                <ul className="space-y-2 text-zinc-500 text-sm">
                  <li>• Has leído y entendido todas las normas</li>
                  <li>• Aceptas las consecuencias por incumplimiento</li>
                  <li>• Respetarás las decisiones de los administradores</li>
                  <li>• Participarás activamente en el roleplay del servidor</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
              <a
                href="https://discord.gg/zonacero"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-6 py-3 bg-red-900/80 hover:bg-red-800 border border-red-800 text-white transition-colors text-sm tracking-wide"
              >
                ENTENDIDO — IR AL DISCORD
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection className="mt-8">
          <p className="text-zinc-600 text-sm text-center">
            ¿Dudas sobre las normas? Contacta con un administrador en Discord.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}
 