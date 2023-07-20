import { FC } from 'react'
interface ButtonProps {
  children: string
  onClick?: () => void
  className?: string
}
export const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return <button
    onClick={onClick && onClick}
    children={children}
    className={className && className} />
}
