import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useDrag } from 'react-dnd'

interface NewItemProps {
  className?: string
}

export const NewItem: FC<NewItemProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ dragging }, drag] = useDrag({
    type: 'new-item',
    item: {},
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      }
    },
  })

  useEffect(() => {
    drag(ref)
  }, [])

  const cs = classNames(
    'h-10 border-2 flex items-center justify-center',
    dragging ? 'bg-white border-dashed' : 'bg-blue-500',
    props.className
  )

  return (
    <div ref={ref} className={cs}>
      NewItem
    </div>
  )
}
