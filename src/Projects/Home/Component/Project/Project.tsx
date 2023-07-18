import { FC } from 'react'
interface ProjectProps {
  children: JSX.Element[]
}
export const Project: FC<ProjectProps> = ({ children }) => <li className="project" children={children} />
