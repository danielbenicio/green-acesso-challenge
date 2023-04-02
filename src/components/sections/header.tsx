import Image from 'next/image'

import logoHbo from '../../assets/logo-hbo.svg'
import logoRickAndMorty from '../../assets/logo-rick-and-morty-white.svg'

export default function Header() {
  return (
    <header className="w-full flex absolute top-8 justify-between px-32 md:max-lg:flex-col md:max-lg:items-center md:max-lg:gap-6">
      <Image src={logoRickAndMorty} alt="logo da série rick and morty" quality={100} />
      <a
        className="flex h-10 w-64 bg-white rounded gap-3 items-center justify-center transition-all duration-200 hover:brightness-90 cursor-pointer"
        target="_blank"
        href="https://www.hbomax.com/br/pt/series/urn:hbo:series:GXkRjxwjR68PDwwEAABKJ?countryRedirect=1"
        rel="noreferrer"
      >
        <span className="font-bold text-sm opacity-80">Assistir em</span>
        <Image src={logoHbo} alt="logo do serviço de streaming hbo max" />
      </a>
    </header>
  )
}
