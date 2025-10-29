import MonacoEditor, { OnMount, EditorProps } from '@monaco-editor/react'
import { createATA } from './ata'
import { editor } from 'monaco-editor'
import { File } from './PlaygroundContext'

interface Props {
  file: File
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export function Editor(props: Props) {
  const { file, onChange, options } = props

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 添加快捷键 ctr+j 格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })
    // editor.getSupportedActions() 可以获取所有默认支持的功能

    // 设置编辑器内容tsconfig
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    // 用 ts 包去分析代码，然后自动下载用到的类型包
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      )
    })

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  )
}
