import { ReactNode } from 'react'

interface ContainerProps {
  size?: 'small' | 'medium' | 'large'
  bg?: string
  children: ReactNode
}

const sizeClasses = {
  small: 'max-w-[800px]',
  medium: 'max-w-[1048px]',
  large: 'max-w-[1280px]'
}

export default function Container({ 
  size = 'medium', 
  bg = 'bg-transparent', 
  children 
}: ContainerProps) {
  return (
    <section className={`${bg} flex w-full`}>
      <div className={`${sizeClasses[size]} relative mx-auto w-full px-6`}>
        {children}
      </div>
    </section>
  )
}