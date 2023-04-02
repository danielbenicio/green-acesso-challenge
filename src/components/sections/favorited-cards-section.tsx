import { useState } from 'react'
import { useQuery } from 'react-query'

import { CharacterResponse } from '@/entities/api-response'
import { useGetFavoriteCharacters } from '@/hooks/use-get-favorite-characters'
import { api } from '@/utils/api'
import { Spinner, Star } from 'phosphor-react'

import { Input } from '../input'
import { CharacterCard } from './character-card'

type FavoritedCardsSectionProps = {
  showFavoritedCharacters: boolean
  setShowFavoritedCharacters: (showFavorited: boolean) => void
}

export default function FavoritedCardsSection({
  showFavoritedCharacters,
  setShowFavoritedCharacters,
}: FavoritedCardsSectionProps) {
  const [characterName, setCharacterName] = useState('')

  const { storedFavoritedCharacters, handleFavoriteCharacter, handleUnfavoriteCharacter } =
    useGetFavoriteCharacters()

  const { data, isLoading } = useQuery(
    ['favoritedCharacters', storedFavoritedCharacters],
    () =>
      api
        .get<CharacterResponse[]>(
          `/character/${
            storedFavoritedCharacters.length > 0 ? `[${storedFavoritedCharacters.join(',')}]` : ''
          }`
        )
        .then(response => (storedFavoritedCharacters.length > 0 ? response.data : [])),
    { keepPreviousData: true }
  )
  const filteredCharacters =
    data?.filter(character => character.name.toLowerCase().includes(characterName.toLowerCase())) ||
    []

  if (isLoading) {
    return (
      <div className="bg-app w-full h-36" id="cards" data-testid="cards-section">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="bg-app" id="cards">
      <div className="md:max-lg:flex-col md:max-lg:gap-4 px-32 pt-12 w-full flex justify-between mb-16">
        <Input onChange={event => setCharacterName(event.target.value)} />
        <button
          type="button"
          className="h-14 w-14 bg-brand flex justify-center items-center rounded-lg md:max-lg:w-full"
          onClick={() => setShowFavoritedCharacters(!showFavoritedCharacters)}
        >
          <Star
            size={32}
            color={showFavoritedCharacters ? '#fbbf24' : '#060B28'}
            weight={showFavoritedCharacters ? 'fill' : 'regular'}
          />
        </button>
      </div>

      <div className="flex flex-col bg-app pb-10">
        {data && data?.length > 0 ? (
          <div className="px-32 grid gap-x-32 gap-y-16 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            {characterName.length > 0
              ? filteredCharacters?.map(character => {
                  return (
                    <CharacterCard
                      key={`character-${character.id}`}
                      character={character}
                      onFavoriteCharacter={handleFavoriteCharacter}
                      onUnfavoriteCharacter={handleUnfavoriteCharacter}
                      isFavorited
                    />
                  )
                })
              : data?.map(character => {
                  return (
                    <CharacterCard
                      key={`character-${character.id}`}
                      character={character}
                      onFavoriteCharacter={handleFavoriteCharacter}
                      onUnfavoriteCharacter={handleUnfavoriteCharacter}
                      isFavorited
                    />
                  )
                })}
          </div>
        ) : (
          <div className="w- flex items-center justify-center">
            <h1 className="text-white text-lg">Nenhum personagem favoritado.</h1>
          </div>
        )}
      </div>
    </div>
  )
}
