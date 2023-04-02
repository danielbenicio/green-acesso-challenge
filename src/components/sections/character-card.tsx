import { CharacterResponse } from '@/entities/api-response'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Lightning, Star } from 'phosphor-react'

type CharacterCardProps = {
  isFavorited: boolean
  character: CharacterResponse
  onFavoriteCharacter: (character: CharacterResponse) => void
  onUnfavoriteCharacter: (character: CharacterResponse) => void
}

export function CharacterCard({
  isFavorited,
  character,
  onFavoriteCharacter,
  onUnfavoriteCharacter,
}: CharacterCardProps) {
  return (
    <div>
      <div className="w-full h-12 rounded-t-lg bg-brand flex items-center justify-center gap-2">
        <span className="font-bold text-base text-app">{character.name}</span>
      </div>
      <div className="w-full h-80 relative">
        {isFavorited ? (
          <button
            className="absolute top-0 right-0 m-1 w-10 h-10 rounded bg-[#DAEFBE] z-30 opacity-50 flex items-center justify-center transition-all duration-200 hover:opacity-100"
            onClick={() => onUnfavoriteCharacter(character)}
          >
            <Heart size={24} className="text-[#97CE4C]" />
          </button>
        ) : (
          <button
            onClick={() => onFavoriteCharacter(character)}
            className="absolute top-0 right-0 m-1 w-10 h-10 rounded bg-[#EBFDFF] z-30 opacity-50 flex items-center justify-center transition-all duration-200 hover:opacity-100"
          >
            <Star size={24} className="text-brand" />
          </button>
        )}

        <Image
          src={character.image}
          alt="imagem do personagem"
          className="h-full w-full opacity-95"
          width={500}
          height={300}
          placeholder="blur"
          blurDataURL="/fallback-image.webp"
          quality={100}
        />
      </div>
      <Link
        className="w-full h-12 rounded-b-lg bg-brand flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-95"
        href={`/character/${character.id}`}
      >
        <Lightning size={24} color="#060B28" weight="bold" />
        <span className="font-bold text-base text-app">Mais Detalhes</span>
      </Link>
    </div>
  )
}
