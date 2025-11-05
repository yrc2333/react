import { useEffect, useRef } from 'react'
import { CommonComponentProps } from '../../interface'
import { useMaterailDrop } from '../../hooks/useMaterialDrop'

function Page({ children, id, name }: CommonComponentProps) {
  const ref = useRef(null)
  const { canDrop, drop } = useMaterailDrop(['Button', 'Container'], id)

  useEffect(() => {
    drop(ref)
  }, [])

  return (
    <div
      ref={ref}
      className="p-[20px] h-[100%] box-border"
      style={{ border: canDrop ? '2px solid blue' : 'none' }}>
      {children}
    </div>
  )
}

export default Page
