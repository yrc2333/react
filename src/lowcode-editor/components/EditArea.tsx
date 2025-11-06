import React, { useEffect, useState } from 'react'
import { useComponentConfigStore } from '../stores/component-config'
import { Component, useComponentsStore } from '../stores/components'
import HoverMask from './HoverMask'
import SelectedMask from './SelectedMask'

export function EditArea() {
  const { components, curComponentId, setCurComponentId } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const [hoverComponentId, setHoverComponentId] = useState<number>()

  const handleMouseOver: React.MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement

      const componentId = ele.dataset?.componentId
      if (componentId) {
        setHoverComponentId(+componentId)
        return
      }
    }
  }

  const handleClick: React.MouseEventHandler = (e) => {
    const path = e.nativeEvent.composedPath()

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement

      const componentId = ele.dataset?.componentId
      if (componentId) {
        setCurComponentId(+componentId)
        return
      }
    }
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]

      if (!config?.dev) {
        return null
      }

      return React.createElement(
        config.dev,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || [])
      )
    })
  }

  return (
    <div
      className="h-full edit-area"
      onMouseOver={handleMouseOver}
      onClick={handleClick}
      onMouseLeave={() => {
        setHoverComponentId(undefined)
      }}>
      {renderComponents(components)}
      {hoverComponentId && hoverComponentId !== curComponentId && (
        <HoverMask
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          containerClassName="edit-area"
          componentId={curComponentId}></SelectedMask>
      )}
    </div>
  )
}
