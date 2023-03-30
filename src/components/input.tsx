import { MagnifyingGlass } from 'phosphor-react'

export function Input() {
  return (
    <div className="w-[488px] border rounded-lg border-brand flex justify-between">
      <input
        className="px-4 h-14 w-full bg-app rounded-lg placeholder:text-base placeholder:text-white placeholder:opacity-40 outline-0 text-white"
        placeholder="Pesquise o personagem"
      />
      <button className="h-full w-16 bg-brand flex justify-center items-center rounded-r-md">
        <MagnifyingGlass size={32} color="#060B28" />
      </button>
    </div>
  )
}
