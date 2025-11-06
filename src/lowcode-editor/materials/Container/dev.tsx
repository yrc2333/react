import { useRef, useEffect } from 'react'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'
import { CommonComponentProps } from '../../interface'

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const ref = useRef(null)

  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

  useEffect(() => {
    drop(ref)
  }, [])

  return (
    <div
      ref={ref}
      data-component-id={id}
      style={styles}
      className={`min-h-[100px] p-5 ${
        canDrop ? 'border-2 border-[blue]' : 'border border-black'
      }`}>
      {children}
    </div>
  )
}

export default Container
