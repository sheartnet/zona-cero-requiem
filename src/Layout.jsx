import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils/index';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Package, BookOpen, Shield, ExternalLink } from 'lucide-react';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Inicio', page: 'Home', icon: Home },
    { name: 'Mods', page: 'Mods', icon: Package },
    { name: 'Lore', page: 'Lore', icon: BookOpen },
    { name: 'Normas', page: 'Normas', icon: Shield },
  ];

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      x: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.4 }
    })
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Nav Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 w-12 h-12 flex items-center justify-center border transition-all duration-300 shadow-lg ${
          scrolled || isOpen 
            ? 'bg-zinc-900/90 border-red-500 text-red-300 backdrop-blur-sm shadow-red-500/40' 
            : 'bg-transparent border-red-500/70 text-red-300 shadow-red-500/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-red-300" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-red-300" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full w-80 bg-[#0a0a0a] border-r border-zinc-900 z-40 flex flex-col"
          >
            {/* Logo */}
            <div className="p-8 pt-24 border-b border-zinc-900">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/Logo.png" alt="Zona Cero logo" className="w-7 h-7 object-contain" />
                <span className="text-white font-bold text-lg tracking-tight">ZONA CERO</span>
              </div>
              <p className="text-zinc-600 text-sm tracking-widest">REQUIEM</p>
            </div>

            {/* Nav Links */}
            <div className="flex-1 py-8">
              {navItems.map((item, i) => {
                const isActive = location.pathname === createPageUrl(item.page) || 
                  (item.page === 'Home' && location.pathname === '/');
                
                return (
                  <motion.div
                    key={item.page}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-4 px-8 py-4 transition-all duration-300 group ${
                        isActive 
                          ? 'bg-red-900/10 border-l-2 border-red-800 text-white' 
                          : 'border-l-2 border-transparent text-zinc-500 hover:text-white hover:bg-zinc-900/50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-red-800' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                      <span className="font-medium tracking-wide">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Discord Link */}
            <motion.div
              custom={navItems.length}
              variants={itemVariants}
              initial="closed"
              animate="open"
              className="p-8 border-t border-zinc-900"
            >
              <a
                href="https://discord.gg/jXBDPKB6Ku"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 bg-red-900/20 border border-red-900/30 text-red-700 hover:bg-red-900/30 transition-colors group"
              >
                <span className="text-sm font-medium tracking-wide">DISCORD</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
}