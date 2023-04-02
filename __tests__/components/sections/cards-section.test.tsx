import { QueryClient, QueryClientProvider } from 'react-query'

import CardsSection from '@/components/sections/cards-section'
import { render, screen } from '@testing-library/react'

describe('Cards Section', () => {
  it('should render properly', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <CardsSection />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('cards-section')).toBeInTheDocument()
  })
})
