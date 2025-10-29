import { FC } from 'react'
import classNames from 'classnames'
import { useTransition, SpringProps } from '@react-spring/web'
import { ListItem } from './ListItem'
import { useTodoListStore } from './Store'
import { Gap } from './Gap'

interface ListProps {
  className?: string | string[]
}

export const List: FC<ListProps> = (props) => {
  const list = useTodoListStore((state) => state.list)

  const transitions = useTransition(list, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
    leave: { opacity: 0 },
    keys: (item) => item.id,
  })

  const cs = classNames(
    'flex flex-col overflow-x-hidden overflow-y-auto',
    props.className
  )

  return (
    <div className={cs}>
      {list.length > 0 ? (
        transitions((style, item) => {
          return <ListItem key={item.id} data={item} style={style} />
        })
      ) : (
        <Gap isEmpty={true}></Gap>
      )}
    </div>
  )
}
