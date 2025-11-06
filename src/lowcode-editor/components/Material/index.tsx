import { useMemo } from 'react'
import { MaterialItem } from './MaterialItem'
import { useComponentConfigStore } from '../../stores/component-config'

export function Material() {
  const { componentConfig } = useComponentConfigStore()

  const components = useMemo(() => {
    return Object.values(componentConfig)
  }, [componentConfig])

  return (
    <div>
      {components.map((item, index) => {
        return (
          <MaterialItem
            name={item.name}
            desc={item.desc}
            key={item.name + index}
          />
        )
      })}
    </div>
  )
}
