import { FC } from 'react'
interface FooterProps {
  children: JSX.Element | JSX.Element[]
  className?: string
}
export const Footer: FC<FooterProps> = ({ children, className }) => (
  <footer className={`global-footer ${className || ''}`} children={children} />
)
