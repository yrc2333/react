import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { fileName2Language, compress, uncompress } from './utils'
import { initFiles } from './files'

export interface File {
  name: string
  readOnly?: boolean
  value: string
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
  addFile: (fileName?: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

export const PlaygroundContext = createContext({} as PlaygroundContext)

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [files, setFiles] = useState<Files>(getFilesFromHash() || initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')

  useEffect(() => {
    const hash = JSON.stringify(files)
    window.location.hash = compress(hash)
  }, [files])

  const addFile = (fileName?: string) => {
    const name = fileName || `File${Object.keys(files).length + 1}.tsx`

    setFiles({
      ...files,
      [name]: {
        name,
        language: fileName2Language(name),
        readOnly: false,
        value: '',
      },
    })

    setSelectedFileName(name)
  }

  const removeFile = (name: string) => {
    if (files[name]?.readOnly) return
    if (selectedFileName === name) {
      const keys = Object.keys(files)
      const index = keys.indexOf(name)
      const nextIndex = index === keys.length - 1 ? index - 1 : index + 1
      setSelectedFileName(keys[nextIndex])
    }
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

function getFilesFromHash() {
  const hash = window.location.hash.slice(1)
  if (!hash) return
  return JSON.parse(uncompress(hash))
}
