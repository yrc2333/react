import { useEffect, useRef } from 'react'
import { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

function Page({ children, id, name, styles }: CommonComponentProps) {
  const ref = useRef(null)
  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

  useEffect(() => {
    drop(ref)
  }, [])

  return (
    <div
      ref={ref}
      data-component-id={id}
      className="p-5 h-full box-border"
      style={{ ...styles, border: canDrop ? '2px solid blue' : 'none' }}>
      {children}
    </div>
  )
}

export default Page
