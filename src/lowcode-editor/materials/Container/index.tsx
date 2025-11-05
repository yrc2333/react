import { useRef, useEffect } from 'react'
import { useMaterailDrop } from '../../hooks/useMaterialDrop'
import { CommonComponentProps } from '../../interface'

const Container = ({ id, children }: CommonComponentProps) => {
  const ref = useRef(null)

  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id)

  useEffect(() => {
    drop(ref)
  }, [])

  return (
    <div
      ref={ref}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'
      }`}>
      {children}
    </div>
  )
}

export default Container
