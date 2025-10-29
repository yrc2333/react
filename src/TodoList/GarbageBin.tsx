import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { useTodoListStore } from './Store'

interface GarbageBinProps {}

export const GarbageBin: FC<GarbageBinProps> = () => {
  const ref = useRef<HTMLDivElement>(null)

  const deleteItem = useTodoListStore((state) => state.deleteItem)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'list-item',
      drop: (data: { id: string }) => {
        deleteItem(data.id)
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        }
      },
    }
  })

  useEffect(() => {
    drop(ref)
  }, [])

  const cs = classNames(
    'h-[100px] w-full border-2 flex items-center justify-center',
    isOver ? 'bg-red-500' : ''
  )

  return (
    <div ref={ref} className={cs}>
      GarbageBin
    </div>
  )
}
