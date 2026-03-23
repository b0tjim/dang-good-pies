import React, { useState, useEffect, useRef } from 'react';
import { Award, Heart, ChevronDown } from 'lucide-react';

// Picnic Pattern Background
const PicnicPattern = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              #dc2626,
              #dc2626 10px,
              #ffffff 10px,
              #ffffff 20px,
              #dc2626 20px,
              #dc2626 30px,
              #ffffff 30px,
              #ffffff 40px
            ),
            repeating-linear-gradient(
              -45deg,
              #dc2626,
              #dc2626 10px,
              #ffffff 10px,
              #ffffff 20px,
              #dc2626 20px,
              #dc2626 30px,
              #ffffff 30px,
              #ffffff 40px
            )
          `,
          backgroundBlendMode: 'multiply'
        }}
      ></div>
    </div>
  );
};

// 3D Tilt Card
const TiltCard = ({ children }) => {
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-out"
      style={{ transform }}
    >
      {children}
    </div>
  );
};

// Hamburger Menu
const HamburgerMenu = ({ items, currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-8 z-50 w-14 h-14 bg-red-600 rounded-full shadow-xl hover:bg-red-700 transition-all duration-300 flex flex-col items-center justify-center gap-1.5"
      >
        <span className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-7 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className={`fixed top-0 left-0 h-screen w-80 bg-red-600 z-40 shadow-2xl transition-all duration-500 ease-out overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <PicnicPattern />
        <div className="flex flex-col h-full pt-24 pb-12 px-8 relative z-10">
          <div className="flex-1 flex flex-col justify-center gap-6">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  onNavigate(index);
                  setIsOpen(false);
                }}
                className={`text-left transition-all duration-300 ${currentPage === index ? 'translate-x-4' : 'hover:translate-x-2'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-white w-12' : 'bg-red-300 hover:bg-white hover:w-8'}`}></div>
                  <span className={`text-3xl font-bold transition-all duration-300 ${currentPage === index ? 'text-white text-4xl' : 'text-red-100 hover:text-white'}`}>
                    {item}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="border-t border-red-400 pt-6">
            <p className="text-red-100 text-sm mb-2">Get In Touch</p>
            <p className="text-white font-semibold text-sm">Text: 678-650-0432</p>
            <p className="text-red-200 text-sm mt-2">dang.jimmy@danggoodpies.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DangGoodPies() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = ['Home', 'Menu', 'Story', 'Contact'];

  const pies = [
    { name: 'Classic Apple', desc: 'Grandma\'s secret recipe with a twist', icon: '🍎' },
    { name: 'Bourbon Pecan', desc: 'Southern charm in every bite', icon: '🥧' },
    { name: 'Key Lime', desc: 'Tart, sweet, and totally rad', icon: '🍋' },
    { name: 'Chocolate Silk', desc: 'Smoother than your best pickup line', icon: '🍫' },
  ];

  const bakedGoods = [
    { name: 'Cinnamon Rolls', desc: 'Warm, gooey, and irresistible', icon: '🥐' },
    { name: 'Chocolate Croissants', desc: 'Buttery layers with rich chocolate', icon: '🥖' },
    { name: 'Blueberry Muffins', desc: 'Fresh berries in every bite', icon: '🧁' },
    { name: 'Sourdough Bread', desc: 'Artisan crafted daily', icon: '🍞' },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 border-8 border-orange-300 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-8 border-orange-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl animate-pulse">🥧</div>
          </div>
          <h1 className="text-4xl font-bold text-orange-800 animate-pulse">Baking Excellence...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-red-200 z-50">
        <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu items={pages} currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Compact Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-30 shadow-lg border-b-2 border-red-300">
        <div className="max-w-7xl mx-auto px-24 py-6 flex items-center justify-center gap-4">
          <div className="text-5xl">🥧</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-red-700">Dang Good Pies</h1>
            <p className="text-sm md:text-base text-red-600">Not just good. Not great. Dang good.</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32">
        {/* HOME PAGE */}
        {currentPage === 0 && (
          <div>
            {/* Hero Section with Featured Pies */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-4xl md:text-5xl font-black text-red-700 text-center mb-2">Featured Pies</h2>
              <p className="text-lg text-red-600 text-center mb-6">Scroll to explore our most loved creations</p>
              
              <div className="overflow-x-auto pb-8 pt-4">
                <div className="flex gap-8 min-w-max px-4">
                  {pies.map((pie, index) => (
                    <TiltCard key={index}>
                      <div className="w-72 bg-white rounded-2xl p-6 shadow-xl border-4 border-red-300 hover:border-red-500 transition-all duration-300 relative overflow-hidden">
                        <PicnicPattern />
                        <div className="relative z-10 text-center">
                          <div className="text-6xl mb-3">{pie.icon}</div>
                          <h3 className="text-2xl font-bold text-red-700 mb-2">{pie.name}</h3>
                          <p className="text-gray-600 mb-4">{pie.desc}</p>
                          <div className="flex items-center justify-center gap-2 text-red-500">
                            <Heart size={18} className="animate-pulse" />
                            <span className="text-sm font-medium">Picnic Perfect</span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-xl inline-flex items-center gap-3"
                >
                  <span>View Full Menu</span>
                  <ChevronDown className="rotate-[-90deg]" size={20} />
                </button>
              </div>
            </section>

            {/* Other Baked Goods */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-4xl md:text-5xl font-black text-red-700 text-center mb-2">Other Baked Goods</h2>
              <p className="text-lg text-red-600 text-center mb-6">Fresh from our ovens every morning</p>
              
              <div className="overflow-x-auto pb-8 pt-4">
                <div className="flex gap-8 min-w-max px-4">
                  {bakedGoods.map((item, index) => (
                    <TiltCard key={index}>
                      <div className="w-72 bg-white rounded-2xl p-6 shadow-xl border-4 border-red-300 hover:border-red-500 transition-all duration-300 relative overflow-hidden">
                        <PicnicPattern />
                        <div className="relative z-10 text-center">
                          <div className="text-6xl mb-3">{item.icon}</div>
                          <h3 className="text-2xl font-bold text-red-700 mb-2">{item.name}</h3>
                          <p className="text-gray-600 mb-4">{item.desc}</p>
                          <div className="flex items-center justify-center gap-2 text-red-500">
                            <Heart size={18} className="animate-pulse" />
                            <span className="text-sm font-medium">Freshly Baked</span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="max-w-7xl mx-auto px-4 py-8">
              <h2 className="text-4xl font-black text-red-700 text-center mb-8">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 text-center">
                  <div className="text-5xl mb-3">👨‍🍳</div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">Expert Bakers</h3>
                  <p className="text-gray-600">Three generations of pie-making expertise</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 text-center">
                  <div className="text-5xl mb-3">🌾</div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">Fresh Ingredients</h3>
                  <p className="text-gray-600">Locally sourced, premium quality daily</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200 text-center">
                  <div className="text-5xl mb-3">❤️</div>
                  <h3 className="text-xl font-bold text-red-700 mb-2">Made with Love</h3>
                  <p className="text-gray-600">Handcrafted with care and passion</p>
                </div>
              </div>
            </section>

            {/* Mission */}
            <section className="bg-gradient-to-br from-red-100 to-orange-100 py-12 relative overflow-hidden">
              <PicnicPattern />
              <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-4xl font-black text-red-700 text-center mb-6">Our Mission</h2>
                <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-red-300">
                  <p className="text-xl text-gray-700 mb-4 text-center">
                    To bake pies so good, they make you say "dang!" out loud.
                  </p>
                  <p className="text-lg text-gray-600 text-center">
                    We believe in premium ingredients, time-honored techniques, and the courage to break the rules when it makes things taste better.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <span className="text-2xl">🧺</span>
                    <span className="font-semibold text-red-700">Handcrafted with Love Since 1952</span>
                    <span className="text-2xl">🧺</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-red-700 py-12 relative overflow-hidden">
              <PicnicPattern />
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <h2 className="text-3xl font-black text-white text-center mb-8">Get In Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-red-600 text-2xl">💬</span>
                    </div>
                    <p className="font-bold text-red-200 text-sm mb-1">Text Us</p>
                    <p className="text-white">678-650-0432</p>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-red-600 text-2xl">📧</span>
                    </div>
                    <p className="font-bold text-red-200 text-sm mb-1">Email Us</p>
                    <p className="text-white">dang.jimmy@danggoodpies.com</p>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setCurrentPage(3)}
                    className="bg-white hover:bg-red-50 text-red-700 font-bold py-3 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-xl"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MENU PAGE */}
        {currentPage === 1 && (
          <div>
            {/* Pies Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-5xl font-black text-red-700 text-center mb-4">Our Legendary Pies</h2>
              <p className="text-lg text-red-600 text-center mb-12">The pies that made us famous</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pies.map((pie, index) => (
                  <TiltCard key={index}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-red-300 hover:border-red-500 transition-all duration-300 relative overflow-hidden">
                      <PicnicPattern />
                      <div className="relative z-10">
                        <div className="text-7xl mb-4">{pie.icon}</div>
                        <h3 className="text-3xl font-bold text-red-700 mb-3">{pie.name}</h3>
                        <p className="text-lg text-gray-600 mb-4">{pie.desc}</p>
                        <div className="flex items-center gap-2 text-red-500">
                          <Heart size={20} className="animate-pulse" />
                          <span className="font-medium">Picnic Perfect</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </section>

            {/* Other Baked Goods Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-red-50 to-orange-50">
              <h2 className="text-5xl font-black text-red-700 text-center mb-4">Other Baked Goods</h2>
              <p className="text-lg text-red-600 text-center mb-12">Fresh daily selections</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bakedGoods.map((item, index) => (
                  <TiltCard key={index}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-red-300 hover:border-red-500 transition-all duration-300 relative overflow-hidden">
                      <PicnicPattern />
                      <div className="relative z-10">
                        <div className="text-7xl mb-4">{item.icon}</div>
                        <h3 className="text-3xl font-bold text-red-700 mb-3">{item.name}</h3>
                        <p className="text-lg text-gray-600 mb-4">{item.desc}</p>
                        <div className="flex items-center gap-2 text-red-500">
                          <Heart size={20} className="animate-pulse" />
                          <span className="font-medium">Freshly Baked</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* STORY PAGE */}
        {currentPage === 2 && (
          <section className="max-w-4xl mx-auto px-4 py-16">
            <h2 className="text-5xl font-black text-red-700 text-center mb-12">Our Story</h2>
            <div className="bg-white rounded-2xl p-10 shadow-xl border-4 border-red-300 relative overflow-hidden">
              <PicnicPattern />
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <Award className="text-red-500 flex-shrink-0" size={48} />
                  <div>
                    <h3 className="text-3xl font-bold text-red-700 mb-4">Three Generations of Pie Perfection</h3>
                    <p className="text-lg text-gray-700 mb-4">
                      It started in 1952 when Grandma Betty accidentally dropped a stick of butter into her apple pie filling. Instead of starting over, she baked it anyway. The result? Pure magic.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                      That "happy accident" became our signature technique. Today, we still use Grandma Betty's recipes, with our own modern twists that make people say "dang, that's good!"
                    </p>
                    <p className="text-lg text-gray-700">
                      Every pie is handcrafted with love, premium ingredients, and just the right amount of rebellion against conventional baking wisdom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CONTACT PAGE */}
        {currentPage === 3 && (
          <section className="max-w-2xl mx-auto px-4 py-16">
            <h2 className="text-5xl font-black text-red-700 text-center mb-12">Get Your Pie On</h2>
            <TiltCard>
              <div className="bg-white rounded-2xl p-10 shadow-xl border-4 border-red-300 relative overflow-hidden">
                <PicnicPattern />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <p className="font-bold text-red-700">Text Us</p>
                      <p className="text-gray-600">678-650-0432</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-bold text-red-700">Email Us</p>
                      <p className="text-gray-600">dang.jimmy@danggoodpies.com</p>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Order Now
                  </button>
                </div>
              </div>
            </TiltCard>
          </section>
        )}
      </main>
    </div>
  );
}
