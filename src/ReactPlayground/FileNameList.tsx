import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { PlaygroundContext } from './PlaygroundContext'

export function FileNameList() {
  const {
    files,
    updateFileName,
    setSelectedFileName,
    removeFile,
    selectedFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState<string[]>([])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className="flex min-h-[38px] overflow-x-auto overflow-y-hidden border-b text-gray-800  bg-white  scrollbar-thin ">
      {tabs.map((item, index) => (
        <FileNameListItem
          fileName={item}
          isActive={selectedFileName === item}
          onClick={() => {
            setSelectedFileName(item)
          }}
          readonly={files[item].readOnly}
          onRemove={() => removeFile(item)}
          onEditEnd={(value) => {
            updateFileName(item, value)
            setSelectedFileName(value)
          }}></FileNameListItem>
      ))}
    </div>
  )
}

interface FileNameListItemProps {
  fileName: string
  isActive?: boolean
  readonly?: boolean
  creating?: boolean
  onEditEnd?: (newFileName: string) => void
  onRemove?: () => void
  onClick?: () => void
}

function FileNameListItem(props: FileNameListItemProps) {
  const {
    fileName,
    onEditEnd,
    isActive,
    onClick,
    onRemove,
    readonly,
    creating,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDblclick = () => {
    setEditing(true)

    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const [editing, setEditing] = useState(creating)

  return (
    <div
      className={classNames(
        'p-1 inline-flex border-b-2  whitespace-nowrap ',
        isActive
          ? 'border-b-cyan-400 cursor-default'
          : 'border-b-transparent cursor-pointer'
      )}
      onClick={onClick}
      onDoubleClick={() => !readonly && handleDblclick()}>
      {editing ? (
        <input
          type="text"
          ref={inputRef}
          defaultValue={fileName}
          onBlur={(e) => {
            onEditEnd && onEditEnd(e.target.value)
            setEditing(false)
          }}
        />
      ) : (
        <>
          {fileName}
          <span
            style={{ marginLeft: 5, display: 'flex' }}
            onClick={(e) => {
              e.stopPropagation()
              !readonly && onRemove && onRemove()
            }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
              <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </>
      )}
    </div>
  )
}
