import { FC } from 'react'
interface NavbarProps {
  children: JSX.Element | JSX.Element[]
  className?: string
}
export const Navbar: FC<NavbarProps> = ({ children, className }) => (
  <nav className={`header-navbar${className || ''}`} children={children} />
)
