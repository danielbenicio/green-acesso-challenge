import Image from 'next/image'
import { CaretDoubleDown } from 'phosphor-react'

import logoHbo from '../assets/logo-hbo.svg'
import logoRickAndMorty from '../assets/logo-rick-and-morty.svg'

export default function Home() {
  return (
    <div className="bg-app w-[100vw] h-[100vh] bg-cover bg-center flex items-center">
      <header className="w-full flex absolute top-8 justify-between px-32">
        <Image src={logoRickAndMorty} alt="logo da série rick and morty" quality={100} />
        <a className="flex h-10 w-64 bg-white rounded gap-3 items-center justify-center transition-all duration-200 hover:brightness-90 cursor-pointer">
          <span className="font-bold text-sm opacity-80">Assistir em</span>
          <Image src={logoHbo} alt="logo do serviço de streaming hbo max" />
        </a>
      </header>

      <div className="w-[1000px] flex flex-col px-32">
        <h1 className="font-bold text-4xl text-white leading-[54px] mb-4">
          Conheça os personagens dessa incrível série de ficção científica e comédia
        </h1>
        <span className="font-semibold text-lg text-white opacity-70 leading-7 mb-8">
          Os personagens de Rick and Morty são únicos e diversificados, variando de uma inteligência
          superdotada e sociopata a um adolescente ansioso e ingênuo, formando um elenco intrigante
          e divertido.
        </span>
        <button className="flex py-3 w-64 bg-white rounded gap-3 items-center transition-all duration-200 hover:brightness-90 justify-center">
          <span className="font-bold opacity-80">Ver personagens</span>
          <CaretDoubleDown size={20} />
        </button>
      </div>
    </div>
  )
}
