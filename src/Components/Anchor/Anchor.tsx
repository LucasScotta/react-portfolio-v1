import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface AnchorProps {
  children: string
  path: string
  target?: string
}

export const Anchor: FC<AnchorProps> = ({ children, path, target }) => {
  const navigate = useNavigate()
  if (target) return <a href={path} target={target} children={children} />
  const anchorClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e.button === 0) {
      // Primary click, left as default
      e.preventDefault()
      window.history.pushState(null, '', path)
      navigate(path, { replace: true })
    }
  }
  return <a href={path} onClick={anchorClick} children={children} />
}
