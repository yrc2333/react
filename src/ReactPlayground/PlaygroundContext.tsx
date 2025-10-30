import React, { createContext, PropsWithChildren, useState } from 'react'
import { fileName2Language } from './utils'
import { initFiles } from './files'

export interface File {
  name: string
  readOnly?: boolean
  value?: string
  language: string
}

export interface Files {
  [key: string]: File
}

export interface PlaygroundContext {
  files: Files
  selectedFileName: string
  setSelectedFileName: (fileName: string) => void
  setFiles: (files: Files) => void
  addFile: (fileName: string) => void
  removeFile: (fileName?: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

export const PlaygroundContext = createContext({} as PlaygroundContext)

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [files, setFiles] = useState<Files>(initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')

  const addFile = (name: string) => {
    setFiles({
      ...files,
      [name]: {
        name,
        language: fileName2Language(name),
        value: '',
      },
    })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return

    setFiles(renameKey(files, oldFieldName, newFieldName))
  }

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}>
      {children}
    </PlaygroundContext.Provider>
  )
}

function renameKey(obj: Record<string, any>, oldKey: string, newKey: string) {
  const result: Record<string, any> = {}

  Object.keys(obj).forEach((key) => {
    if (key === oldKey) {
      result[newKey] = obj[key]
    } else {
      result[key] = obj[key]
    }
  })

  console.log('🚀 ~ renameKey ~ result:', result)

  return result
}
