import { Fragment } from 'react'
import { dehydrate, QueryClient } from 'react-query'

import CardsSection from '@/components/sections/cards-section'
import Hero from '@/components/sections/hero'
import { CharacterResponse, Info } from '@/entities/api-response'
import { api } from '@/utils/api'
import { GetServerSideProps } from 'next'

export type ApiRickMortyResponse = {
  info: Info
  results: CharacterResponse[]
}

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <CardsSection />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery('characters', () =>
    api.get('/character/').then(response => response.data)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
