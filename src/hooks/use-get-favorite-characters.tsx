import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { CharacterResponse } from '../entities/api-response'

const LOCAL_STORAGE_FAVORITED_KEY = '@rick-and-morty/favorites'

type FavoritedCharactersContextProps = {
  isFavoritedCharacter: (characterId: number) => boolean
  storedFavoritedCharacters: number[]
  handleFavoriteCharacter: (character: CharacterResponse) => void
  handleUnfavoriteCharacter: (character: CharacterResponse) => void
}

type FavoritedCharacterContextProvider = {
  children: ReactNode
}

const FavoritedCharactersContext = createContext<FavoritedCharactersContextProps>(
  {} as FavoritedCharactersContextProps
)

export function FavoritedCharacterContextProvider({ children }: FavoritedCharacterContextProvider) {
  const [storedFavoritedCharacters, setStoredFavoritedCharacters] = useState<number[]>([])

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

  const isFavoritedCharacter = useCallback(
    (characterId: number) => {
      return storedFavoritedCharacters.includes(characterId)
    },
    [storedFavoritedCharacters]
  )

  const values = useMemo(() => {
    return {
      isFavoritedCharacter,
      storedFavoritedCharacters,
      handleFavoriteCharacter,
      handleUnfavoriteCharacter,
    }
  }, [
    isFavoritedCharacter,
    storedFavoritedCharacters,
    handleFavoriteCharacter,
    handleUnfavoriteCharacter,
  ])

  return (
    <FavoritedCharactersContext.Provider value={values}>
      {children}
    </FavoritedCharactersContext.Provider>
  )
}

export function useGetFavoriteCharacters() {
  const context = useContext(FavoritedCharactersContext)

  if (!context) throw new Error('FavoritedCharactersContext is not defined')

  return context
}
