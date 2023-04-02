import { Anchor } from '@/components/anchor'
import { render, screen } from '@testing-library/react'
import { CaretDoubleDown } from 'phosphor-react'

describe('Anchor component', () => {
  it('should render with label', () => {
    render(<Anchor href="#cards" label="Ver personagens" icon={<CaretDoubleDown size={20} />} />)

    const label = screen.getByText('Ver personagens')

    expect(label).toBeInTheDocument()
  })
})
