import { useRef, useEffect } from 'react'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'
import { CommonComponentProps } from '../../interface'
import { useDrag } from 'react-dnd'

const Container = ({ id, name, children, styles }: CommonComponentProps) => {
  const ref = useRef(null)

  const { canDrop, drop } = useMaterialDrop(['Button', 'Container'], id)

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id,
    },
  })

  useEffect(() => {
    drop(ref)
    drag(ref)
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
