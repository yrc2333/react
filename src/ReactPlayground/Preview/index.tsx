import { useContext, useEffect, useRef, useState } from 'react'
import { PlaygroundContext } from '../PlaygroundContext'
import CompilerWorker from './compiler.worker?worker'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../files'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())

  const compilerWorkerRef = useRef<Worker>(null)

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker()
      compilerWorkerRef.current!.addEventListener('message', ({ data }) => {
        console.log('worker', data)
        if (data.type === 'COMPILED_CODE') {
          setCompiledCode(data.data)
        } else {
          //console.log('error', data);
        }
      })
    }
  }, [])

  useEffect(() => {
    compilerWorkerRef.current?.postMessage(files)
  }, [files])

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
    </div>
  )
}
