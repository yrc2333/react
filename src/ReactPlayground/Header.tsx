import logoSvg from '../assets/react.svg'

export const Header = () => {
  return (
    <div className="bg-white border-b h-[48px] flex px-2 gap-1 items-center">
      <img alt="logo" src={logoSvg} />
      <span>React Playground</span>
    </div>
  )
}
