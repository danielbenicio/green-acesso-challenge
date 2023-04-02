import { CaretDoubleDown } from 'phosphor-react'

import { Anchor } from '../anchor'
import Header from './header'

export default function Hero() {
  return (
    <div
      className="bg-hero h-[100vh] bg-cover bg-center flex items-center"
      data-testid="hero-section"
    >
      <Header />

      <div className="w-[1000px] flex flex-col px-32 md:max-lg:mt-28 md:max-lg:items-center">
        <h1 className="font-bold text-4xl text-white leading-[54px] mb-4 md:max-lg:text-3xl md:max-lg:text-center md:max-lg:mb-8">
          Conheça os personagens dessa incrível série de ficção científica e comédia
        </h1>
        <span className="font-semibold text-lg text-white opacity-70 leading-7 mb-8 md:max-lg:text-base md:max-lg:text-center">
          Os personagens de Rick and Morty são únicos e diversificados, variando de uma inteligência
          superdotada e sociopata a um adolescente ansioso e ingênuo, formando um elenco intrigante
          e divertido.
        </span>
        <Anchor href="#cards" label="Ver personagens" icon={<CaretDoubleDown size={20} />} />
      </div>
    </div>
  )
}
