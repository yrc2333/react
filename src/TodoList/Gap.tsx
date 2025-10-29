import { FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { useTodoListStore } from './Store'

interface GapProps {
  isEmpty?: boolean
  preId?: string
}

export const Gap: FC<GapProps> = (props) => {
  const { isEmpty, preId } = props
  const ref = useRef<HTMLDivElement>(null)

  const addItem = useTodoListStore((state) => state.addItem)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'new-item',

      drop: () => {
        addItem(
          {
            id: Date.now().toString(),
            status: false,
            content: 'new item',
          },
          preId
        )
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
    isEmpty ? 'h-full' : 'h-[10px]',
    'w-full',
    isOver ? 'bg-red-400' : 'bg-white',
    'last:flex-1 min-h-[10px]'
  )

  return (
    <div ref={ref} className={cs}>
      {isEmpty && '暂无待办事项'}
    </div>
  )
}
