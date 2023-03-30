import { Fragment, useRef } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { Input } from '@/components/input'
import { CharacterCard } from '@/components/sections/character-card'
import Hero from '@/components/sections/hero'
import Spinner from '@/components/spinner'
import { CharacterResponse, Info } from '@/entities/api-response'
import { chunkArray } from '@/utils/chunk-array'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { CaretLeft, CaretRight, Star } from 'phosphor-react'

type ApiRickMortyResponse = {
  info: Info
  results: CharacterResponse[]
}

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null)

  function handleAccessCharactersSection() {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const { data, isLoading } = useQuery('characters', () =>
    axios
      .get<ApiRickMortyResponse>('https://rickandmortyapi.com/api/character/')
      .then(response => response.data)
  )

  if (isLoading)
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-app">
        <Spinner />
      </div>
    )

  const characterGroups = chunkArray(data?.results || [], 4)

  return (
    <Fragment>
      <Hero onAccessCharactersSection={handleAccessCharactersSection} />
      <div className="bg-app" ref={sectionRef}>
        <div className="px-32 pt-12 w-full flex justify-between mb-16">
          <Input />
          <button className="h-14 w-14 bg-brand flex justify-center items-center rounded-lg">
            <Star size={32} color="#060B28" />
          </button>
        </div>

        <div className="flex flex-col gap-12 mb-14">
          {characterGroups.map((group, index) => (
            <div key={`group-${index}`} className="px-32 flex gap-32">
              {group.map(character => (
                <CharacterCard
                  key={`character-${character.id}`}
                  characterPicture={character.image}
                  characterName={character.name}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="w-full items-center justify-center flex pb-8">
          <CaretLeft size={20} color="#00B5CC" weight="bold" className="mr-3" />
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app">
              4
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-brand bg-app font-bold text-base border border-brand transition-all duration-200 hover:bg-brand hover:text-app">
              5
            </button>
          </div>
          <CaretRight size={20} color="#00B5CC" weight="bold" className="ml-3" />
        </div>
      </div>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.fetchQuery('characters', () =>
    axios.get('https://rickandmortyapi.com/api/character/').then(response => response.data)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
