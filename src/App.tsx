import { useState, useMemo } from 'react';
import { 
  Scissors, 
  Clock, 
  MapPin, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  Twitter,
  X,
  GitBranch,        
  Settings,         
  GitMerge,        
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration ---

const BUSINESS_CONFIG = {
  name: "Cris Barber",
  tagline: "Eleva tu estilo. Domina tu look.",
  address: "Av. Providencia 2133, Local 4, Providencia, Santiago",
  phone: "+56 9 1234 5678",
  hours: {
    weekdays: "10:00 - 20:00",
    saturday: "10:00 - 20:00",
    sunday: "Cerrado"
  },
  colors: {
    primary: "#D4AF37", // Gold
    dark: "#0a0a0a",    // Very dark grey/black
    card: "#171717",    // Slightly lighter dark
    text: "#ffffff",
    muted: "#a3a3a3"
  },
  services: [
    {
      id: 1,
      name: "Corte de Cabello Pro",
      description: "Corte preciso, acabado con toalla caliente y asesoría de estilo.",
      price: 12000,
      duration: 45
    },
    {
      id: 2,
      name: "Perfilado de Barba + Toalla",
      description: "Afeitado tradicional o perfilado con aceites esenciales.",
      price: 8000,
      duration: 30
    },
    {
      id: 3,
      name: "Combo Corte + Barba",
      description: "Servicio completo: Corte de cabello y perfilado de barba.",
      price: 18000,
      duration: 60
    },
    {
      id: 4,
      name: "Corte Niños",
      description: "Corte con estilo y paciencia para los más pequeños.",
      price: 10000,
      duration: 30
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sebastián",
      role: "Cliente Frecuente",
      text: "La mejor atención de Providencia. El degradado quedó perfecto y el ambiente es muy relajado.",
      rating: 5
    },
    {
      id: 2,
      name: "Rodrigo",
      role: "Ejecutivo",
      text: "Excelente servicio, muy puntuales con la hora. Ideal para venir después de la oficina.",
      rating: 5
    },
    {
      id: 3,
      name: "Matías",
      role: "Estudiante",
      text: "Vengo hace meses y siempre mantienen la calidad. Cris es un crack con las tijeras.",
      rating: 5
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1503951914875-452162b7f304?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800"
  ]
};

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "px-6 py-3 rounded-none font-medium transition-all duration-300 tracking-wide uppercase text-sm";
  const variants = {
    primary: "bg-[#D4AF37] text-black hover:bg-[#b5952f] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]",
    outline: "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black",
    ghost: "text-white hover:text-[#D4AF37]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    {subtitle && (
      <span className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase block mb-3">
        {subtitle}
      </span>
    )}
    <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
      {title}
    </h2>
    <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
  </div>
);

// --- Calendar Logic ---

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const CalendarPicker = ({ selectedDate, onSelectDate }: { selectedDate: Date, onSelectDate: (d: Date) => void }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isToday = new Date().toDateString() === date.toDateString();
    const isPast = date < new Date(new Date().setHours(0,0,0,0));

    days.push(
      <button
        key={d}
        disabled={isPast}
        onClick={() => onSelectDate(date)}
        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-colors
          ${isSelected ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-300 hover:bg-neutral-800'}
          ${isToday && !isSelected ? 'border border-[#D4AF37] text-[#D4AF37]' : ''}
          ${isPast ? 'opacity-20 cursor-not-allowed' : ''}
        `}
      >
        {d}
      </button>
    );
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (newDate >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)) {
      setCurrentMonth(newDate);
    }
  };

  return (
    <div className="bg-[#171717] p-6 rounded-xl border border-neutral-800">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:text-[#D4AF37] transition-colors"><ChevronLeft size={20} /></button>
        <span className="font-semibold text-lg">
          {currentMonth.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={nextMonth} className="p-2 hover:text-[#D4AF37] transition-colors"><ChevronRight size={20} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs text-neutral-500 font-medium uppercase">
        <div>Do</div><div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sá</div>
      </div>
      <div className="grid grid-cols-7 gap-1 place-items-center">
        {days}
      </div>
    </div>
  );
};

const TimeSlots = ({ selectedDate, onSelectSlot, selectedSlot }: { selectedDate: Date, onSelectSlot: (t: string) => void, selectedSlot: string | null }) => {
  // Mock slots generation
  const slots = useMemo(() => {
    const times = ["10:00", "11:00", "12:00", "13:00", "14:30", "15:30", "16:30", "17:30", "18:30"];
    // Randomly disable some slots to simulate availability
    return times.map(time => ({
      time,
      available: Math.random() > 0.3
    }));
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((slot) => (
        <button
          key={slot.time}
          disabled={!slot.available}
          onClick={() => onSelectSlot(slot.time)}
          className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all
            ${selectedSlot === slot.time 
              ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
              : slot.available 
                ? 'bg-neutral-900 border-neutral-800 text-white hover:border-[#D4AF37]/50' 
                : 'bg-neutral-900/50 border-transparent text-neutral-600 cursor-not-allowed decoration-slice'}
          `}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [bookingTime, setBookingTime] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBook = () => {
    setShowModal(true);
  };

  const confirmBooking = () => {
    // Here you would send data to backend
    alert(`¡Reserva Confirmada!\nServicio: ${BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.name}\nFecha: ${bookingDate.toLocaleDateString()}\nHora: ${bookingTime}`);
    setShowModal(false);
    setSelectedService(null);
    setBookingTime(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="text-[#D4AF37]" size={24} />
            <span className="text-xl font-bold tracking-widest uppercase">{BUSINESS_CONFIG.name}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Servicios</a>
            <a href="#gallery" className="text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Galería</a>
            <a href="#testimonials" className="text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Reseñas</a>
            <a href="#devops" className="text-sm uppercase tracking-widest hover:text-[#D4AF37] transition-colors">DevOps</a> {/* ← AGREGAR */}
            <Button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Reservar Ahora
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <div className="space-y-2"><div className="w-8 h-0.5 bg-white"></div><div className="w-8 h-0.5 bg-white"></div></div>}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg uppercase tracking-widest">Servicios</a>
                <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="text-lg uppercase tracking-widest">Galería</a>
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-lg uppercase tracking-widest">Reseñas</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b7f304?auto=format&fit=crop&q=80&w=2070" 
            alt="Barbershop Interior" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] text-sm md:text-base tracking-[0.3em] uppercase font-bold mb-6">
              Est. 2024 • Barbería Premium
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 uppercase tracking-tighter leading-none">
              {BUSINESS_CONFIG.name}
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
              {BUSINESS_CONFIG.tagline} Vive el arte de la barbería tradicional en un ambiente moderno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                Reservar Cita
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Ver Servicios
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-[#171717] border-y border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide text-sm">Horario de Atención</h3>
              <p className="text-neutral-400 text-sm mt-1">Lun-Vie: {BUSINESS_CONFIG.hours.weekdays}</p>
              <p className="text-neutral-400 text-sm">Sáb: {BUSINESS_CONFIG.hours.saturday}</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide text-sm">Ubicación</h3>
              <p className="text-neutral-400 text-sm mt-1">{BUSINESS_CONFIG.address}</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
              <Scissors size={24} />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wide text-sm">Reservas</h3>
              <p className="text-neutral-400 text-sm mt-1">{BUSINESS_CONFIG.phone}</p>
              <p className="text-neutral-400 text-sm">Atención por orden de llegada</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Nuestros Servicios" subtitle="Precisión Maestra" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_CONFIG.services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className={`p-8 bg-[#171717] border ${selectedService === service.id ? 'border-[#D4AF37]' : 'border-white/5'} rounded-xl transition-all cursor-pointer group hover:border-[#D4AF37]/50`}
                onClick={() => {
                  setSelectedService(service.id);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">{service.name}</h3>
                  <span className="text-[#D4AF37] font-bold text-lg">${service.price.toLocaleString('es-CL')}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  <Clock size={14} className="mr-2" />
                  {service.duration} Minutos
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 px-6 bg-[#111111] relative">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Reservar Cita" subtitle="Reserva tu Lugar" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Col: Service Selection & Summary */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#171717] p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] block"></span>
                  Servicio Seleccionado
                </h3>
                
                {selectedService ? (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg text-white">
                        {BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.name}
                      </span>
                      <span className="text-[#D4AF37] font-bold">
                        ${BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.price.toLocaleString('es-CL')}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 mb-6">
                      {BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.description}
                    </p>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="text-xs text-neutral-500 hover:text-white underline"
                    >
                      Cambiar Servicio
                    </button>
                  </div>
                ) : (
                  <div className="text-neutral-500 text-sm italic">
                    Por favor selecciona un servicio de la lista o continúa eligiendo una fecha.
                  </div>
                )}
              </div>

              <div className="bg-[#171717] p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#D4AF37] block"></span>
                  Resumen
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Fecha</span>
                    <span className="text-white">{bookingDate.toLocaleDateString('es-CL', { weekday: 'short', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Hora</span>
                    <span className={bookingTime ? "text-white" : "text-neutral-600"}>{bookingTime || "No seleccionada"}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-8" 
                  disabled={!selectedService || !bookingTime}
                  onClick={handleBook}
                >
                  Confirmar Reserva
                </Button>
              </div>
            </div>

            {/* Right Col: Calendar & Slots */}
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-neutral-400">Seleccionar Fecha</h3>
                  <CalendarPicker selectedDate={bookingDate} onSelectDate={setBookingDate} />
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-4 text-neutral-400">Horas Disponibles</h3>
                  <TimeSlots selectedDate={bookingDate} onSelectSlot={setBookingTime} selectedSlot={bookingTime} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="La Galería" subtitle="Ambiente y Oficio" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUSINESS_CONFIG.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-neutral-800');
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <SectionTitle title="Historias de Clientes" subtitle="Confianza Total" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BUSINESS_CONFIG.testimonials.map((t) => (
              <div key={t.id} className="bg-[#171717] p-8 rounded-xl border border-white/5 relative">
                <div className="text-[#D4AF37] mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" />)}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-white uppercase tracking-wide text-sm">{t.name}</p>
                  <p className="text-[#D4AF37] text-xs uppercase tracking-wider mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* DevOps Section */}
<section id="devops" className="py-24 px-6 bg-[#111111]">
  <div className="max-w-7xl mx-auto">
    <SectionTitle 
      title="Ingeniería DevOps" 
      subtitle="La columna vertebral de nuestro proyecto" 
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {/* Card 1: Control de Versiones */}
      <div className="bg-[#171717] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
          <GitBranch className="text-[#D4AF37]" size={28} />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">
          Control de Versiones
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          Gestión de código con Git y GitHub. Repositorio centralizado con estrategias de branching profesionales.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Repositorio centralizado
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Estrategia GitFlow
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Code review obligatorio
          </li>
        </ul>
      </div>

      {/* Card 2: Pipeline CI/CD */}
      <div className="bg-[#171717] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
          <Settings className="text-[#D4AF37]" size={28} />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">
          Pipeline CI/CD
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          Automatización del flujo de desarrollo. Cada cambio pasa por tests y deploy automático.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Builds automatizados
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            TypeScript validation
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Deploy a Netlify
          </li>
        </ul>
      </div>

      {/* Card 3: Workflow GitFlow */}
      <div className="bg-[#171717] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
          <GitMerge className="text-[#D4AF37]" size={28} />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">
          Workflow GitFlow
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          Metodología estructurada de ramificación. Aislamiento de features y hotfixes controlados.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Ramas: main, develop
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Features & hotfixes
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Conventional Commits
          </li>
        </ul>
      </div>

      {/* Card 4: Monitoreo */}
      <div className="bg-[#171717] p-8 rounded-xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
          <Activity className="text-[#D4AF37]" size={28} />
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-white">
          Monitoreo
        </h3>
        <p className="text-neutral-400 text-sm mb-6">
          Observabilidad del sistema. Logs en tiempo real y status de despliegues.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            GitHub Actions logs
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Status badges
          </li>
          <li className="flex items-center gap-3 text-sm text-neutral-300">
            <Check size={16} className="text-[#D4AF37]" />
            Deploy previews
          </li>
        </ul>
      </div>
    </div>

    {/* Tech Stack Badge */}
    <div className="bg-[#0a0a0a] rounded-xl border border-[#D4AF37]/20 p-8 text-center">
      <h4 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">
        Stack Tecnológico DevOps
      </h4>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          GitHub
        </span>
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          GitHub Actions
        </span>
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          Netlify
        </span>
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          Vite
        </span>
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          TypeScript
        </span>
        <span className="px-4 py-2 bg-[#171717] rounded-full text-white text-sm border border-white/10">
          React
        </span>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-[#050505] py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Scissors className="text-[#D4AF37]" size={24} />
              <span className="text-2xl font-bold tracking-widest uppercase">{BUSINESS_CONFIG.name}</span>
            </div>
            <p className="text-neutral-500 max-w-sm mb-8">
              Elevando el estándar del cuidado masculino. Donde la tradición se une a la precisión moderna.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
          
          <div>
     <h4 className="text-white font-bold uppercase tracking-widest mb-6">Enlaces Rápidos</h4>
        <ul className="space-y-4 text-neutral-500 text-sm">
        <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Inicio</a></li>
        <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Servicios</a></li>
        <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Galería</a></li>
        <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Reservar Cita</a></li>
        <li><a href="#devops" className="hover:text-[#D4AF37] transition-colors">DevOps</a></li> {/* ← AGREGAR */}
      </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contacto</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-[#D4AF37]" />
                {BUSINESS_CONFIG.address}
              </li>
              <li className="flex items-center gap-3">
                <Scissors size={16} className="text-[#D4AF37]" />
                {BUSINESS_CONFIG.phone}
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-neutral-600 text-xs">
          © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. Todos los derechos reservados.
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#171717] p-8 rounded-2xl border border-[#D4AF37]/20 max-w-md w-full relative z-10 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-[#D4AF37]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase mb-2">Confirmar Reserva</h3>
                <p className="text-neutral-400 text-sm">Por favor revisa los detalles de tu cita.</p>
              </div>

              <div className="bg-[#0a0a0a] p-4 rounded-lg space-y-3 mb-6 border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Servicio</span>
                  <span className="text-white font-medium">{BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Fecha</span>
                  <span className="text-white font-medium">{bookingDate.toLocaleDateString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Hora</span>
                  <span className="text-white font-medium">{bookingTime}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                  <span className="text-neutral-500">Precio Total</span>
                  <span className="text-[#D4AF37] font-bold">${BUSINESS_CONFIG.services.find(s => s.id === selectedService)?.price.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={confirmBooking}>Confirmar Cita</Button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 text-neutral-500 hover:text-white text-sm transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

