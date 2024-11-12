import Home from '@/app/page'
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'

describe('Home', () => {
  const setup = () => render(<Home />)

  it("Le titre de la page d'accueil est correct", () => {
    setup()
    const title = screen.getAllByText(/Next Module/)
    expect(title[0]).toBeInTheDocument()
  })

  it("L'auteur de la page d'accueil est correct", () => {
    setup()
    const author = screen.queryByText(/by Mike codeur/)
    expect(author).toBeInTheDocument()
  })
})
