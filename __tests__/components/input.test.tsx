import { Input } from '@/components/input'
import { render, screen } from '@testing-library/react'

describe('Input component', () => {
  it('should render with placeholder text', () => {
    render(<Input placeholder="Pesquise o personagem" />)

    const input = screen.getByPlaceholderText('Pesquise o personagem')

    expect(input).toBeInTheDocument()
  })
})
