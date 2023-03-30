import { CaretDoubleDown } from 'phosphor-react'

import { PrimaryButton } from '../primary-button'
import Header from './header'

type HeroProps = {
  onAccessCharactersSection: () => void
}

export default function Hero({ onAccessCharactersSection }: HeroProps) {
  return (
    <div className="bg-hero h-[100vh] bg-cover bg-center flex items-center">
      <Header />

      <div className="w-[1000px] flex flex-col px-32">
        <h1 className="font-bold text-4xl text-white leading-[54px] mb-4">
          Conheça os personagens dessa incrível série de ficção científica e comédia
        </h1>
        <span className="font-semibold text-lg text-white opacity-70 leading-7 mb-8">
          Os personagens de Rick and Morty são únicos e diversificados, variando de uma inteligência
          superdotada e sociopata a um adolescente ansioso e ingênuo, formando um elenco intrigante
          e divertido.
        </span>
        <PrimaryButton
          label="Ver personagens"
          icon={<CaretDoubleDown size={20} />}
          onClick={onAccessCharactersSection}
        />
      </div>
    </div>
  )
}
