import { CharacterCard } from '@/components/sections/character-card'
import { CharacterResponse } from '@/entities/api-response'
import { render, screen } from '@testing-library/react'

const character = {
  id: 10,
  name: 'Alan Rails',
  status: 'Dead',
  species: 'Human',
  type: 'Superhuman (Ghost trains summoner)',
  gender: 'Male',
  origin: {
    name: 'unknown',
    url: '',
  },
  location: {
    name: "Worldender's lair",
    url: 'https://rickandmortyapi.com/api/location/4',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/25'],
  url: 'https://rickandmortyapi.com/api/character/10',
  created: '2017-11-04T20:19:09.017Z',
} as unknown as CharacterResponse

describe('CharacterCard component', () => {
  it('renders character name', () => {
    render(
      <CharacterCard
        character={character}
        isFavorited={false}
        onFavoriteCharacter={jest.fn()}
        onUnfavoriteCharacter={jest.fn()}
      />
    )
    expect(screen.getByText('Alan Rails')).toBeInTheDocument()
  })
})
