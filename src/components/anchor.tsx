import { ReactNode, AnchorHTMLAttributes } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string
  icon?: ReactNode
}

export function Anchor({ label, icon, ...rest }: AnchorProps) {
  return (
    <a
      className="flex py-3 w-64 bg-white rounded gap-3 items-center transition-all duration-200 hover:brightness-90 justify-center cursor-pointer"
      {...rest}
    >
      <span className="font-bold opacity-80">{label}</span>
      {icon}
    </a>
  )
}
