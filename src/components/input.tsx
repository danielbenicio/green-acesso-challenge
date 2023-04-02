import { InputHTMLAttributes } from 'react'

import { MagnifyingGlass } from 'phosphor-react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ ...props }: InputProps) {
  return (
    <div className="w-[488px] md:max-lg:w-full border rounded-lg border-brand flex justify-between">
      <input
        className="px-4 h-14 w-full bg-app rounded-lg placeholder:text-base placeholder:text-white placeholder:opacity-40 outline-0 text-white"
        placeholder="Pesquise o personagem"
        {...props}
      />
      <button className="h-14 w-16 bg-brand flex justify-center items-center rounded-r-md">
        <MagnifyingGlass size={32} color="#060B28" />
      </button>
    </div>
  )
}
