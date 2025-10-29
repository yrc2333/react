import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { PlaygroundContext } from './PlaygroundContext'

export function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    setSelectedFileName,
    selectedFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState<string[]>([])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className="flex min-h-[38px] overflow-x-auto overflow-y-hidden border-b text-gray-800  bg-white  scrollbar-thin ">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={classNames(
            'p-1 inline-flex border-b-2  whitespace-nowrap ',
            item === selectedFileName
              ? 'border-b-cyan-400 cursor-default'
              : 'border-b-transparent cursor-pointer'
          )}
          onClick={() => {
            setSelectedFileName(item)
          }}>
          {item}
        </div>
      ))}
    </div>
  )
}
