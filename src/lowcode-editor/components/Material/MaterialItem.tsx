import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

export interface MaterialItemProps {
  name: string
  desc: string
}

export function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props

  const ref = useRef(null)

  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  })

  useEffect(() => {
    drag(ref)
  }, [])

  return (
    <div
      ref={ref}
      className="
            border-dashed
            border
            border-black
            py-2 px-2.5 
            m-2.5
            cursor-move
            inline-block
            bg-white
            hover:bg-[#ccc]
        ">
      {desc}
    </div>
  )
}
