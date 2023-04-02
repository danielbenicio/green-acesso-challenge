import { QueryClient, QueryClientProvider } from 'react-query'

import Home from '@/pages/index'
import { render, screen } from '@testing-library/react'

describe('Home page', () => {
  it('should render the Hero component', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })
})
