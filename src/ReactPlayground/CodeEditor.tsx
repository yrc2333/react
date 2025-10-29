import { FileNameList } from './FileNameList'
import { useContext } from 'react'
import { PlaygroundContext } from './PlaygroundContext'
import { Editor } from './Editor'
import { debounce } from 'lodash-es'

export function CodeEditor() {
  const { files, selectedFileName, setFiles } = useContext(PlaygroundContext)

  const onChange = (value?: string) => {
    files[selectedFileName].value = value
    setFiles({ ...files })
  }

  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor
        file={files[selectedFileName]}
        onChange={debounce(onChange, 500)}
      />
    </div>
  )
}
