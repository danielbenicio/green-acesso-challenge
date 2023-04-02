import { Fragment } from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

import Spinner from '@/components/spinner'
import { api } from '@/utils/api'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretLeft } from 'phosphor-react'

import mock from '../../assets/mock-2.png'
import { CharacterResponse } from '../../entities/api-response'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function Rola() {
  const router = useRouter()
  const { id } = router.query

  const { data: character, isLoading } = useQuery(
    'characters',
    () => api.get<CharacterResponse>(`/character/${id}`).then(response => response.data),
    {
      enabled: !!id,
    }
  )

  if (isLoading)
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-app">
        <Spinner />
      </div>
    )

  if (character) {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: character?.episode?.length > 7 ? 7 : character?.episode?.length,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: character?.episode?.length > 3 ? 3 : character?.episode?.length,
          },
        },
      ],
    }

    return (
      <Fragment>
        <div className="bg-character-page h-[380px] bg-cover bg-center relative w-full pt-10 pl-32">
          <Link
            href={'/'}
            className="w-14 h-14 flex items-center justify-center bg-[#dcf8e4] rounded transition-all duration-200 hover:brightness-90"
          >
            <CaretLeft weight="bold" size={32} className="text-[#2b8845]" />
          </Link>

          <Image
            src={character.image}
            alt="imagem do personagem"
            className="absolute -bottom-48 left-32 rounded"
            width={300}
            height={300}
            quality={100}
          />
        </div>
        <div className="pl-[490px] pt-14 pr-32 flex justify-between mb-32">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">{character.name}</h1>
            <span className="text-base opacity-60 font-semibold ">{character.species}</span>
          </div>
        </div>

        <div className="px-32 flex gap-14 mb-8 md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:gap-x-24">
          <div>
            <h1 className="text-base font-semibold">Genêro</h1>
            <span className="text-sm opacity-60 font-semibold">{character.gender}</span>
          </div>

          <div>
            <h1 className="text-base font-semibold">Localização Multiversal</h1>
            <span className="text-sm opacity-60 font-semibold">{character.origin?.name}</span>
          </div>

          <div>
            <h1 className="text-base font-semibold">Local de Nascimento</h1>
            <span className="text-sm opacity-60 font-semibold">{character.location?.name}</span>
          </div>

          <div>
            <h1 className="text-base font-semibold">Status</h1>
            {character.status === 'Alive' ? (
              <div className="bg-[#dcf8e4] w-20 h-7 flex items-center justify-center rounded">
                <span className="text-sm opacity-60 font-semibold text-[#2b8845]">
                  {character.status}
                </span>
              </div>
            ) : (
              <div className="bg-[#FFE4EC] w-20 h-7 flex items-center justify-center rounded">
                <span className="text-sm opacity-60 font-semibold text-[#C6113D]">
                  {character.status}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-32">
          <h1 className="text-base font-semibold mb-3">Episódios Presente:</h1>
          <div className="bg-app h-40 rounded flex items-center justify-center mb-10">
            <div className="w-full px-9">
              <Slider {...settings} className="w-full">
                {character?.episode?.map((episode, index) => {
                  const episodeNumber = episode.split('/').pop()
                  return (
                    <div key={`episode-${index}`}>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-white">{episodeNumber}</span>
                        <Image src={mock} alt="placeholder episode image" />
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
