import Image from 'next/image'
import { Lightning } from 'phosphor-react'

type CharacterCardProps = {
  characterPicture: string
  characterName: string
}

export function CharacterCard({ characterPicture, characterName }: CharacterCardProps) {
  return (
    <div>
      <div className="w-full h-12 rounded-t-lg bg-brand flex items-center justify-center gap-2">
        <span className="font-bold text-base text-app">{characterName}</span>
      </div>
      <div className="w-80 h-80">
        <Image
          src={characterPicture}
          alt="imagem do personagem"
          className="h-full w-full opacity-95"
          width={100}
          height={100}
          quality={100}
        />
      </div>
      <button className="w-full h-12 rounded-b-lg bg-brand flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-95">
        <Lightning size={24} color="#060B28" weight="bold" />
        <span className="font-bold text-base text-app">Mais Detalhes</span>
      </button>
    </div>
  )
}
