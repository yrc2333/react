import { Form, Input, InputNumber, Select } from 'antd'
import { CSSProperties, useEffect, useState } from 'react'
import {
  ComponentConfig,
  ComponentSetter,
  useComponentConfigStore,
} from '../../stores/component-config'
import { useComponentsStore } from '../../stores/components'
import CssEditor from './CssEditor'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'

export function ComponentStyle() {
  const [form] = Form.useForm()
  const [css, setCss] = useState<string>(`.comp{\n\n}`)

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    form.resetFields()
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...curComponent?.styles })

    setCss(toCSSStr(curComponent?.styles!))
  }, [curComponent])

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`
    for (let key in css) {
      // 驼峰转横线
      key = key.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
      let value = css[key]
      if (!value) {
        continue
      }
      if (
        ['width', 'height'].includes(key) &&
        !value.toString().endsWith('px')
      ) {
        value += 'px'
      }

      str += `\t${key}: ${value};\n`
    }
    str += `}`
    return str
  }

  if (!curComponentId || !curComponent) return null

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting

    if (type === 'select') {
      return <Select options={options} />
    } else if (type === 'input') {
      return <Input />
    } else if (type === 'inputNumber') {
      return <InputNumber />
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues)
    }
  }

  const handleEditorChange = debounce((value: string) => {
    const css: Record<string, any> = {}
    // 去掉换行符 注释 以及 .comp{  }
    try {
      const cssString = value.replace('.comp {', '').replace('}', '')
      styleToObject(cssString, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))
        ] = value
      })

      console.log('🚀 ~ ComponentStyle ~ css:', css)

      updateComponentStyles(
        curComponentId,
        {
          ...form.getFieldsValue(),
          ...css,
        },
        true
      )
    } catch (e) {
      console.log(e)
    }

    // valueChange({
    //   ...curComponent.styles,
    //   [curComponent.name]: value,
    // })
  }, 500)

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}>
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}

      <div className="h-[200px] border border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  )
}
