import { describe, it, expect } from 'vitest';

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

describe('Calendar Utilities', () => {
  describe('getDaysInMonth', () => {
    it('returns 31 for January', () => {
      expect(getDaysInMonth(2024, 0)).toBe(31);
    });

    it('returns 29 for February in leap year', () => {
      expect(getDaysInMonth(2024, 1)).toBe(29);
    });

    it('returns 28 for February in non-leap year', () => {
      expect(getDaysInMonth(2023, 1)).toBe(28);
    });

    it('returns 30 for April', () => {
      expect(getDaysInMonth(2024, 3)).toBe(30);
    });

    it('returns 31 for December', () => {
      expect(getDaysInMonth(2024, 11)).toBe(31);
    });
  });

  describe('getFirstDayOfMonth', () => {
    it('returns correct day for January 2024', () => {
      expect(getFirstDayOfMonth(2024, 0)).toBe(1); // Monday
    });

    it('returns correct day for February 2024', () => {
      expect(getFirstDayOfMonth(2024, 1)).toBe(4); // Thursday
    });

    it('returns correct day for March 2024', () => {
      expect(getFirstDayOfMonth(2024, 2)).toBe(5); // Friday
    });
  });
});
