import { useContext, useState, useEffect } from 'react'
import { PlaygroundContext } from '../PlaygroundContext'

import { compile } from './compiler.worker'

export function Preview() {
  const { files, selectedFileName } = useContext(PlaygroundContext)

  const [compiledCode, setCompiledCode] = useState('')

  useEffect(() => {
    const res = compile(files)
    console.log('🚀 ~ Preview ~ code:', res)

    setCompiledCode(res)
  }, [files])

  return <div>Preview</div>
}
