import { describe, it, expect } from 'vitest';

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
    primary: "#D4AF37",
    dark: "#0a0a0a",
    card: "#171717",
    text: "#ffffff",
    muted: "#a3a3a3"
  },
  services: [
    { id: 1, name: "Corte de Cabello Pro", description: "Corte preciso", price: 12000, duration: 45 },
    { id: 2, name: "Perfilado de Barba + Toalla", description: "Afeitado tradicional", price: 8000, duration: 30 },
    { id: 3, name: "Combo Corte + Barba", description: "Servicio completo", price: 18000, duration: 60 },
    { id: 4, name: "Corte Niños", description: "Corte para niños", price: 10000, duration: 30 }
  ],
  testimonials: [
    { id: 1, name: "Sebastián", role: "Cliente Frecuente", text: "Excelente servicio", rating: 5 },
    { id: 2, name: "Rodrigo", role: "Ejecutivo", text: "Muy puntuales", rating: 5 },
    { id: 3, name: "Matías", role: "Estudiante", text: "Siempre mantienen calidad", rating: 5 }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1",
    "https://images.unsplash.com/photo-2"
  ]
};

describe('Business Config', () => {
  describe('services', () => {
    it('has at least one service', () => {
      expect(BUSINESS_CONFIG.services.length).toBeGreaterThan(0);
    });

    it('has valid prices for all services', () => {
      BUSINESS_CONFIG.services.forEach(service => {
        expect(service.price).toBeGreaterThan(0);
        expect(typeof service.price).toBe('number');
      });
    });

    it('has valid duration for all services', () => {
      BUSINESS_CONFIG.services.forEach(service => {
        expect(service.duration).toBeGreaterThan(0);
      });
    });

    it('has unique ids for all services', () => {
      const ids = BUSINESS_CONFIG.services.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('colors', () => {
    it('has valid hex color format', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      Object.values(BUSINESS_CONFIG.colors).forEach(color => {
        expect(color).toMatch(hexRegex);
      });
    });
  });

  describe('testimonials', () => {
    it('has valid ratings (1-5)', () => {
      BUSINESS_CONFIG.testimonials.forEach(t => {
        expect(t.rating).toBeGreaterThanOrEqual(1);
        expect(t.rating).toBeLessThanOrEqual(5);
      });
    });

    it('has unique ids for all testimonials', () => {
      const ids = BUSINESS_CONFIG.testimonials.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('hours', () => {
    it('has weekday hours', () => {
      expect(BUSINESS_CONFIG.hours.weekdays).toBeTruthy();
    });

    it('has saturday hours', () => {
      expect(BUSINESS_CONFIG.hours.saturday).toBeTruthy();
    });

    it('has sunday status', () => {
      expect(BUSINESS_CONFIG.hours.sunday).toBeTruthy();
    });
  });
});
