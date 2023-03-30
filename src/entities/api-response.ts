export type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

type OriginLocation = {
  name: string
  url: string
}

export type CharacterResponse = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: OriginLocation
  location: OriginLocation
  image: string
  episode: string[]
  url: string
  created: Date
}
