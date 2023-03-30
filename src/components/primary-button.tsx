import { ReactNode, ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon?: ReactNode
}

export function PrimaryButton({ label, icon, ...rest }: PrimaryButtonProps) {
  return (
    <button
      className="flex py-3 w-64 bg-white rounded gap-3 items-center transition-all duration-200 hover:brightness-90 justify-center"
      {...rest}
    >
      <span className="font-bold opacity-80">{label}</span>
      {icon}
    </button>
  )
}
