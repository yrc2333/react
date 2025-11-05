import React, { useEffect } from 'react'
import { useComponentConfigStore } from '../stores/component-config'
import { Component, useComponetsStore } from '../stores/components'

export function EditArea() {
  const { components } = useComponetsStore()
  const { componentConfig } = useComponentConfigStore()

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.component) {
        return null
      }

      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      )
    })
  }

  return <div className="h-[100%]">{renderComponents(components)}</div>
}
