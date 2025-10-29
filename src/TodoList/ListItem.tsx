import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useDrag } from 'react-dnd'
import { animated } from '@react-spring/web'
import { Gap } from './Gap'
import { ListItemData, useTodoListStore } from './Store'

interface ListItemProps {
  data: ListItemData
  style: Record<string, any>
}

export const ListItem: FC<ListItemProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  const updateItem = useTodoListStore((state) => state.updateItem)
  const [isEdit, setEdit] = useState(false)

  const { data, style } = props

  const [{ dragging }, drag] = useDrag({
    type: 'list-item',
    item: {
      id: data.id,
    },
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
    'bg-blue-400 h-14 flex gap-2 items-center px-5 border-2',
    dragging ? 'bg-white border-dashed' : 'border-blue-400'
  )

  return (
    <>
      <animated.div
        ref={ref}
        className={cs}
        style={style}
        onDoubleClick={() => setEdit(true)}>
        <input
          type="checkbox"
          className="w-4 h-w "
          checked={data.status}
          onChange={(event) => {
            updateItem({
              id: data.id,
              status: event.target.checked,
              content: data.content,
            })
          }}
        />
        {isEdit ? (
          <input
            type="text"
            className="h-10 w-full bg-amber-100"
            defaultValue={data.content}
            onChange={(event) => {
              updateItem({
                id: data.id,
                status: data.status,
                content: event.target.value,
              })
            }}
            onBlur={() => {
              setEdit(false)
            }}
          />
        ) : (
          <p>{data.content}</p>
        )}
      </animated.div>
      <Gap preId={data.id}></Gap>
    </>
  )
}
