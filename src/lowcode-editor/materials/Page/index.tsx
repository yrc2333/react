import { message } from 'antd'
import { useEffect, useRef } from 'react'
import { CommonComponentProps } from '../../interface'
import { useComponetsStore } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'
import { useDrop } from 'react-dnd'

function Page({ children, id, name }: CommonComponentProps) {
  const { addComponent } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ['Button', 'Container'],
    drop: (item: { type: string }) => {
      const props = componentConfig[item.type].defaultProps

      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          props,
        },
        id
      )
      message.success(item.type)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }))

  const ref = useRef(null)
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
