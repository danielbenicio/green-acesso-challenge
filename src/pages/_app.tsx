import '../styles/globals.css'
import { useState } from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'

import { FavoritedCharacterContextProvider } from '@/hooks/use-get-favorite-characters'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <FavoritedCharacterContextProvider>
          <Component {...pageProps} />
        </FavoritedCharacterContextProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
