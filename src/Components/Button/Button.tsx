import { CSSProperties, FC } from 'react'
interface ButtonProps {
  children: string
  onClick?: () => void
  className?: string
  style?: CSSProperties
}
export const Button: FC<ButtonProps> = ({ children, onClick, className, style }) => {
  return <button
    onClick={onClick && onClick}
    children={children}
    className={className && className}
    style={style}
  />
}
