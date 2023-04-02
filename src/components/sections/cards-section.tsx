import { useState } from 'react'
import { useQuery } from 'react-query'

import { useGetFavoriteCharacters } from '@/hooks/use-get-favorite-characters'
import { ApiRickMortyResponse } from '@/pages'
import { api } from '@/utils/api'
import { useDebouncedValue, usePagination } from '@mantine/hooks'
import { Spinner, Star } from 'phosphor-react'

import { Input } from '../input'
import { Pagination } from '../pagination'
import { CharacterCard } from './character-card'
import FavoritedCardsSection from './favorited-cards-section'

export default function CardsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [characterName, setCharacterName] = useState('')
  const debouncedValue = useDebouncedValue(characterName, 250)
  const [showFavoritedCharacters, setShowFavoritedCharacters] = useState(false)

  const { data, isLoading } = useQuery(
    ['characters', currentPage, debouncedValue],
    () =>
      api
        .get<ApiRickMortyResponse>(`/character/`, {
          params: { page: currentPage, name: debouncedValue },
        })
        .then(response => response.data),
    { keepPreviousData: true }
  )

  const { isFavoritedCharacter, handleFavoriteCharacter, handleUnfavoriteCharacter } =
    useGetFavoriteCharacters()

  const pagination = usePagination({
    total: data?.info.pages || 0,
    initialPage: 1,
    page: currentPage,
    onChange: (page: number) => setCurrentPage(page),
  })

  if (isLoading) {
    return (
      <div className="bg-app w-full h-36" id="cards" data-testid="cards-section">
        <Spinner />
      </div>
    )
  }

  if (showFavoritedCharacters) {
    return (
      <FavoritedCardsSection
        setShowFavoritedCharacters={setShowFavoritedCharacters}
        showFavoritedCharacters={showFavoritedCharacters}
      />
    )
  }

  return (
    <div className="bg-app" id="cards">
      <div className="md:max-lg:flex-col md:max-lg:gap-4 px-32 pt-12 w-full flex justify-between mb-16 ">
        <Input onChange={event => setCharacterName(event.target.value)} />
        <button
          type="button"
          className="h-14 w-14 bg-brand flex justify-center items-center rounded-lg md:max-lg:w-full"
          onClick={() => setShowFavoritedCharacters(prevState => !prevState)}
        >
          <Star
            size={32}
            color={showFavoritedCharacters ? '#fbbf24' : '#060B28'}
            weight={showFavoritedCharacters ? 'fill' : 'regular'}
          />
        </button>
      </div>

      <div className="flex flex-col mb-14">
        <div className="px-32 grid gap-x-32 gap-y-16 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
          {data?.results.map(character => {
            return (
              <CharacterCard
                key={`character-${character.id}`}
                character={character}
                onFavoriteCharacter={handleFavoriteCharacter}
                onUnfavoriteCharacter={handleUnfavoriteCharacter}
                isFavorited={isFavoritedCharacter(character.id)}
              />
            )
          })}
        </div>
      </div>
      <Pagination pagination={pagination} />
    </div>
  )
}
