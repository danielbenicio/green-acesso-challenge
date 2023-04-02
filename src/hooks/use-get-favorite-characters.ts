import { useCallback, useEffect, useMemo, useState } from 'react'

import { CharacterResponse } from '../entities/api-response'

const LOCAL_STORAGE_FAVORITED_KEY = '@rick-and-morty/favorites'

// function getStoredCharacters() {
//   const storedFavoritedCharactersIds = localStorage.getItem(LOCAL_STORAGE_FAVORITED_KEY)

//   return storedFavoritedCharactersIds ? JSON.parse(storedFavoritedCharactersIds) : []
// }

export function useGetFavoriteCharacters(characters: CharacterResponse[]) {
  const [storedFavoritedCharacters, setStoredFavoritedCharacters] = useState<number[]>([])

  const favoritedCharacters = useMemo(
    () => characters.filter(character => storedFavoritedCharacters.includes(character.id)),
    [characters, storedFavoritedCharacters]
  )

  useEffect(() => {
    const storedFavoritedCharactersIds = localStorage.getItem(LOCAL_STORAGE_FAVORITED_KEY)

    setStoredFavoritedCharacters(
      storedFavoritedCharactersIds ? JSON.parse(storedFavoritedCharactersIds) : []
    )
  }, [])

  useEffect(() => {
    if (storedFavoritedCharacters.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_FAVORITED_KEY, JSON.stringify(storedFavoritedCharacters))
    }
  }, [storedFavoritedCharacters])

  const handleFavoriteCharacter = useCallback(
    (character: CharacterResponse) => {
      setStoredFavoritedCharacters(prevState => [...prevState, character.id])
    },
    [storedFavoritedCharacters]
  )

  const handleUnfavoriteCharacter = useCallback(
    (character: CharacterResponse) => {
      setStoredFavoritedCharacters(prevState =>
        prevState.filter(favoriteCharacterId => favoriteCharacterId !== character.id)
      )
    },
    [storedFavoritedCharacters]
  )

  return {
    favoritedCharacters,
    handleFavoriteCharacter,
    handleUnfavoriteCharacter,
  }
}
