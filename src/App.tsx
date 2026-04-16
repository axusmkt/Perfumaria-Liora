/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Instagram, 
  Menu,
  X,
  CheckCircle2
} from 'lucide-react';

// --- Dados dos Produtos (Baseado nas imagens enviadas) ---
const PRODUCTS = [
  // Masculino
  {
    id: 1,
    name: "Bad Boy",
    inspiration: "Carolina Herrera",
    price: "149,90",
    image: "https://i.ibb.co/0RzRQsHJ/Bad-Boy-Carolina-Herrera-masculino.webp",
    description: "A força e o mistério de uma presença inesquecível.",
    category: "Masculino"
  },
  {
    id: 2,
    name: "Black XS",
    inspiration: "Paco Rabanne",
    price: "149,90",
    image: "https://i.ibb.co/wh02sGYY/Black-XS-Paco-Rabanne-masculino.webp",
    description: "Para o homem que vive intensamente cada momento.",
    category: "Masculino"
  },
  {
    id: 3,
    name: "Invictus Victory",
    inspiration: "Paco Rabanne",
    price: "149,90",
    image: "https://i.ibb.co/BKjf4DhC/Invictus-Vitory-Paco-Rabanne-masculino.webp",
    description: "A fragrância da vitória e do poder absoluto.",
    category: "Masculino"
  },
  {
    id: 4,
    name: "L'eau D'issey",
    inspiration: "Issey Miyake",
    price: "149,90",
    image: "https://i.ibb.co/tPNLvFbb/L-eua-D-issey-Pour-Homme-De-Issey-Miyake-masculino.webp",
    description: "A pureza da água e a força da natureza.",
    category: "Masculino"
  },
  {
    id: 5,
    name: "Toy Boy",
    inspiration: "Moschino",
    price: "149,90",
    image: "https://i.ibb.co/Mxnc3qdj/Moschino-Toy-Boy-masculino.webp",
    description: "Elegância com um toque de ironia e diversão.",
    category: "Masculino"
  },
  {
    id: 6,
    name: "Phantom",
    inspiration: "Paco Rabanne",
    price: "149,90",
    image: "https://i.ibb.co/GQH42m2R/Phantom-Paco-Rabanne-masculino.webp",
    description: "A essência da inovação e do magnetismo moderno.",
    category: "Masculino"
  },
  {
    id: 7,
    name: "The Most Wanted",
    inspiration: "Azzaro",
    price: "149,90",
    image: "https://i.ibb.co/Mk4X8HNT/The-Most-Wanted-Azzaro-masculino.webp",
    description: "Ousadia e sedução em cada nota.",
    category: "Masculino"
  },
  // Feminino
  {
    id: 8,
    name: "Sì Passione",
    inspiration: "Armani Beauty",
    price: "149,90",
    image: "https://i.ibb.co/7dMXyX7S/Armani-Beauty-Si-passione-feminino.webp",
    description: "Um manifesto de liberdade e audácia feminina.",
    category: "Feminino"
  },
  {
    id: 9,
    name: "Miss Dior",
    inspiration: "Dior",
    price: "149,90",
    image: "https://i.ibb.co/prn96GCD/Dior-Miss-Edp-feminino.webp",
    description: "A elegância atemporal de um buquê floral.",
    category: "Feminino"
  },
  {
    id: 10,
    name: "Good Girl",
    inspiration: "Carolina Herrera",
    price: "149,90",
    image: "https://i.ibb.co/6RYn9j1c/Good-Girl-Carolina-Herrera-feminino.webp",
    description: "Para a mulher que conquista o mundo a cada passo.",
    category: "Feminino"
  },
  {
    id: 11,
    name: "Classique",
    inspiration: "Jean Paul Gaultier",
    price: "149,90",
    image: "https://i.ibb.co/Xx3PzSYY/Jean-Paul-Classique-feminino.webp",
    description: "A sedução em sua forma mais pura.",
    category: "Feminino"
  },
  {
    id: 12,
    name: "Libre",
    inspiration: "Yves Saint Laurent",
    price: "149,90",
    image: "https://i.ibb.co/bjcny0pv/Libre-Edp-Yves-Saint-Laurent-feminino.webp",
    description: "A liberdade de viver tudo intensamente.",
    category: "Feminino"
  },
  {
    id: 13,
    name: "Delina",
    inspiration: "Parfums de Marly",
    price: "149,90",
    image: "https://i.ibb.co/Vk0YhJ8/Marly-Delina-feminino.webp",
    description: "A sofisticação de um jardim real.",
    category: "Feminino"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'Feminino' | 'Masculino'>('Feminino');
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const filteredProducts = PRODUCTS.filter(p => p.category === activeTab);

  // --- NOVA LÓGICA DE NAVEGAÇÃO (LIMPA E DO ZERO) ---
  const handleNext = () => {
    if (activeProductIndex < filteredProducts.length - 1) {
      setActiveProductIndex(activeProductIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeProductIndex > 0) {
      setActiveProductIndex(activeProductIndex - 1);
    }
  };

  const handleTabChange = (tab: 'Feminino' | 'Masculino') => {
    setActiveTab(tab);
    setActiveProductIndex(0);
  };

  // Swipe Handlers Simples
  const [startX, setStartX] = useState(0);

  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-liora-gold selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setIsMenuOpen(true)} className="p-2">
            <Menu size={24} />
          </button>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <img 
              src="https://i.ibb.co/sJW4gRG2/Logo-Liora.png" 
              alt="Liora Logo" 
              className="h-8 md:h-10 object-contain"
            />
          </div>

          <div className="flex items-center gap-4">
            <ShoppingBag size={24} className="text-liora-black" />
          </div>
        </div>
      </nav>

      {/* --- MENU MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end p-2">
              <X size={32} />
            </button>
            <div className="mt-12 flex flex-col gap-8 text-3xl font-serif">
              <a href="#catalogo" onClick={() => setIsMenuOpen(false)}>Coleção</a>
              <a href="#entrega" onClick={() => setIsMenuOpen(false)}>Entrega em São Luís</a>
              <a href="#sobre" onClick={() => setIsMenuOpen(false)}>A Marca</a>
              <a href="https://wa.me/5598900000000" className="text-liora-gold">WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        <motion.div 
          style={{ opacity }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10"
        >
          <span className="uppercase tracking-[0.3em] text-xs mb-4 block text-gray-500">Perfumaria em São Luís</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            A Essência do Luxo, <br /> 
            <span className="italic">agora na Ilha.</span>
          </h1>
          <p className="max-w-md mx-auto text-gray-500 font-light leading-relaxed mb-10">
            Fragrâncias importadas com alta fixação e fidelidade olfativa premium. 
            Sinta a presença que você merece.
          </p>
          <a 
            href="#catalogo"
            className="inline-block border-b border-liora-black pb-2 tracking-widest uppercase text-xs font-semibold hover:text-liora-gold hover:border-liora-gold transition-colors"
          >
            Descubra a Coleção
          </a>
        </motion.div>

        {/* Floating Product Background Decor */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 opacity-10 pointer-events-none"
        >
          <img src={filteredProducts[0]?.image} alt="" className="w-96 grayscale" />
        </motion.div>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="bg-liora-black text-white py-6 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center text-[10px] uppercase tracking-[0.4em]"
        >
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span>+5.000 Clientes em São Luís</span>
              <Star size={12} fill="#D4AF37" color="#D4AF37" />
              <span>Fixação Premium 12h+</span>
              <Star size={12} fill="#D4AF37" color="#D4AF37" />
              <span>Entrega Expressa na Ilha</span>
              <Star size={12} fill="#D4AF37" color="#D4AF37" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* --- CATALOG CAROUSEL (CRITICAL) --- */}
      <section id="catalogo" className="py-24 bg-white px-6">
        <div className="max-w-xl mx-auto">
          <header className="text-center mb-12">
            <span className="uppercase tracking-[0.3em] text-[10px] text-liora-gold font-bold mb-4 block">Exclusividade Liora</span>
            <h2 className="font-serif text-4xl mb-8">Nossa Curadoria</h2>
            
            {/* Tabs */}
            <div className="flex justify-center gap-8 mb-12 border-b border-gray-100 pb-4">
              <button 
                onClick={() => handleTabChange('Feminino')}
                className={`uppercase tracking-[0.2em] text-xs font-bold transition-all relative pb-4 ${
                  activeTab === 'Feminino' ? 'text-liora-black' : 'text-gray-300'
                }`}
              >
                Feminino
                {activeTab === 'Feminino' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-liora-gold" />
                )}
              </button>
              <button 
                onClick={() => handleTabChange('Masculino')}
                className={`uppercase tracking-[0.2em] text-xs font-bold transition-all relative pb-4 ${
                  activeTab === 'Masculino' ? 'text-liora-black' : 'text-gray-300'
                }`}
              >
                Masculino
                {activeTab === 'Masculino' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-liora-gold" />
                )}
              </button>
            </div>
          </header>

          {/* Carousel Container (REESCRITO DO ZERO) */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeProductIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-full shrink-0 px-2">
                  {/* Product Card */}
                  <div className="bg-white border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden select-none">
                    {/* Image Container */}
                    <div className="relative w-full aspect-square bg-white flex items-center justify-center p-8 md:p-12">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain pointer-events-none"
                        draggable="false"
                      />
                    </div>

                    {/* Info Area */}
                    <div className="p-8 md:p-10 pt-0 text-center">
                      <div className="mb-6">
                        <h3 className="font-serif text-2xl mb-2 text-liora-black">
                          {product.name}
                        </h3>
                        <p className="text-liora-gold text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                          {product.inspiration}
                        </p>
                        <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs mx-auto italic">
                          "{product.description}"
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-6">
                        <div className="text-3xl font-light text-liora-black">
                          <span className="text-sm align-top mr-1 font-serif text-liora-gold">R$</span>
                          {product.price}
                        </div>

                        <button className="w-full bg-liora-black text-white py-5 tracking-[0.3em] text-[10px] font-bold hover:bg-liora-gold transition-colors active:scale-95">
                          COMPRAR AGORA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows (Desktop Only) */}
            <button 
              onClick={handlePrev}
              disabled={activeProductIndex === 0}
              className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-4 transition-colors ${
                activeProductIndex === 0 ? 'text-gray-100 cursor-not-allowed' : 'text-gray-300 hover:text-liora-black'
              }`}
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button 
              onClick={handleNext}
              disabled={activeProductIndex === filteredProducts.length - 1}
              className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-4 transition-colors ${
                activeProductIndex === filteredProducts.length - 1 ? 'text-gray-100 cursor-not-allowed' : 'text-gray-300 hover:text-liora-black'
              }`}
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {filteredProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProductIndex(i)}
                className="w-10 h-10 flex items-center justify-center group"
                aria-label={`Ir para produto ${i + 1}`}
              >
                <div className={`h-1 transition-all duration-500 ${
                  activeProductIndex === i ? 'w-8 bg-liora-gold' : 'w-4 bg-gray-200 group-hover:bg-gray-400'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <section className="py-24 px-6 bg-[#F9F9F9]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="mb-6 flex justify-center text-liora-gold">
              <CheckCircle2 size={32} strokeWidth={1} />
            </div>
            <h4 className="font-serif text-xl mb-3">Fidelidade Olfativa</h4>
            <p className="text-gray-500 text-sm font-light">Notas idênticas aos originais que você já ama, com qualidade de nicho.</p>
          </div>
          <div className="text-center">
            <div className="mb-6 flex justify-center text-liora-gold">
              <Clock size={32} strokeWidth={1} />
            </div>
            <h4 className="font-serif text-xl mb-3">Fixação Real</h4>
            <p className="text-gray-500 text-sm font-light">Tecnologia de maceração de 21 dias garantindo rastro por onde você passar.</p>
          </div>
          <div className="text-center">
            <div className="mb-6 flex justify-center text-liora-gold">
              <ShoppingBag size={32} strokeWidth={1} />
            </div>
            <h4 className="font-serif text-xl mb-3">Luxo Acessível</h4>
            <p className="text-gray-500 text-sm font-light">O prazer de usar um perfume importado sem as taxas abusivas.</p>
          </div>
        </div>
      </section>

      {/* --- LOCAL SEO & DELIVERY --- */}
      <section id="entrega" className="py-24 px-6 bg-liora-black text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-liora-gold uppercase tracking-[0.3em] text-[10px] mb-4 block">São Luís - Maranhão</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Perfumes com entrega rápida em São Luís.
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Não espere semanas. Receba sua fragrância favorita em casa ou no trabalho em até 2 horas para toda a Grande Ilha.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <MapPin size={18} className="text-liora-gold" />
                  <span>Atendemos: Renascença, Calhau, Cohama, Cohatrac e mais.</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <Clock size={18} className="text-liora-gold" />
                  <span>Pedidos até as 18h entregues no mesmo dia.</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-square border border-white/10 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-5xl font-serif text-liora-gold mb-2">2h</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Tempo médio de entrega</div>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-liora-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-6 text-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-5xl mb-8">Pronta para ser <br /> inesquecível?</h2>
          <p className="text-gray-500 mb-12 font-light">
            Junte-se a milhares de clientes que já descobriram o segredo <br /> de andar perfumada gastando pouco em São Luís.
          </p>
          <button className="bg-liora-black text-white px-12 py-6 tracking-[0.3em] text-xs font-bold hover:bg-liora-gold transition-all shadow-xl shadow-black/10">
            QUERO MEU PERFUME AGORA
          </button>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <img 
            src="https://i.ibb.co/sJW4gRG2/Logo-Liora.png" 
            alt="Liora Logo" 
            className="h-10 mb-12 opacity-50"
          />
          
          <div className="flex gap-8 mb-12">
            <a href="#" className="text-gray-400 hover:text-liora-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-liora-gold transition-colors"><ShoppingBag size={20} /></a>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-400 text-center leading-loose">
            © 2024 Perfumaria Liora. São Luís - MA. <br />
            A melhor perfumaria em São Luís MA para quem não abre mão da qualidade.
          </div>
        </div>
      </footer>

      {/* --- STICKY WHATSAPP BUTTON --- */}
      <a 
        href="https://wa.me/5598900000000" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-white text-liora-black p-4 rounded-full shadow-2xl border border-gray-100 hover:scale-110 transition-transform active:scale-90"
      >
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-liora-gold rounded-full animate-ping"></div>
          <ShoppingBag size={24} />
        </div>
      </a>

    </div>
  );
}

