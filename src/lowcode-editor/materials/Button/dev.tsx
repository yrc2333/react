import { Button as AntdButton } from 'antd'
import { CommonComponentProps } from '../../interface'
import { useDrag } from 'react-dnd'
import { useEffect, useRef } from 'react'

const Button = ({ id, type, text, styles, ...props }: CommonComponentProps) => {
  const [_, drag] = useDrag({
    type: 'Button',
    item: {
      type: 'Button',
      dragType: 'move',
      id: id,
    },
  })

  const btnRef = useRef(null)

  useEffect(() => {
    drag(btnRef)
  })

  return (
    <AntdButton ref={btnRef} type={type} style={styles} {...props}>
      {text}
    </AntdButton>
  )
}

export default Button
