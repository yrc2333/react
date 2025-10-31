import logoSvg from '../assets/react.svg'
import { useContext } from 'react'
import { PlaygroundContext } from './PlaygroundContext'
import copy from 'copy-to-clipboard'
import { downloadFiles } from './utils'

export const Header = () => {
  const { files } = useContext(PlaygroundContext)

  return (
    <div className="bg-white border-b h-[48px] flex px-2 gap-1 items-center ">
      <img alt="logo" src={logoSvg} />
      <span>React Playground</span>

      <div
        className="w-auto ml-auto  cursor-pointer  hover:text-blue-400"
        onClick={() => downloadFiles(files)}>
        下载
      </div>
      <div
        className="w-auto ml-1 cursor-pointer hover:text-blue-400"
        onClick={() => {
          copy(window.location.href)
        }}>
        分享
      </div>
    </div>
  )
}
