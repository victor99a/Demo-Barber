import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Smoke Tests', () => {
  it('should render the app without crashing', () => {
    render(<App />)
    expect(document.body).toBeDefined()
  })

  it('should display the business name in hero section', () => {
    render(<App />)
    const heroTitle = screen.getByRole('heading', { name: /Cris Barber/i })
    expect(heroTitle).toBeInTheDocument()
  })

  it('should render the services section', () => {
    render(<App />)
    const servicesTitle = screen.getByText(/Nuestros Servicios/i)
    expect(servicesTitle).toBeInTheDocument()
  })

  it('should render the booking section', () => {
    render(<App />)
    const bookingTitles = screen.getAllByText(/Reservar Cita/i)
    expect(bookingTitles.length).toBeGreaterThan(0)
  })
})
