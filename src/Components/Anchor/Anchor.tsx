import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface AnchorProps {
  children: string
  path: string
}

export const Anchor: FC<AnchorProps> = ({ children, path }) => {
  const navigate = useNavigate()
  const anchorClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    navigate(path, { replace: true })
  }
  return <a href={path} onClick={anchorClick}>{children}</a>
}
