import { Collapse, Input, Select, CollapseProps, Button } from 'antd'
import { useComponentsStore } from '../../stores/components'
import type { ComponentEvent } from '../../stores/component-config'
import { useComponentConfigStore } from '../../stores/component-config'
import { GoToLink } from './actions/GoToLink'
import { ShowMessage } from './actions/ShowMessage'
import { ActionModal } from './ActionModal'
import { useState } from 'react'

export function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } =
    useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  const [actionModalOpen, setActionModalOpen] = useState(false)

  const [curEvent, setCurEvent] = useState<ComponentEvent>()

  if (!curComponent) return null

  function selectAction(eventName: string, value: string) {
    if (!curComponentId) return

    updateComponentProps(curComponentId, { [eventName]: { type: value } })
  }

  function urlChange(eventName: string, value: string) {
    if (!curComponentId) return

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        url: value,
      },
    })
  }

  const items: CollapseProps['items'] = (
    componentConfig[curComponent.name].events || []
  ).map((event) => {
    return {
      key: event.name,
      label: (
        <div className="flex justify-between leading-[30px]">
          {event.label}
          <Button
            type="primary"
            onClick={() => {
              setCurEvent(event)
              setActionModalOpen(true)
            }}>
            添加动作
          </Button>
        </div>
      ),
      children: <div></div>,
    }
  })

  return (
    <div className="px-2.5">
      <Collapse className="mb-2.5" items={items} />
      <ActionModal
        visible={actionModalOpen}
        eventConfig={curEvent!}
        handleOk={() => {
          setActionModalOpen(false)
        }}
        handleCancel={() => {
          setActionModalOpen(false)
        }}></ActionModal>
    </div>
  )
}
