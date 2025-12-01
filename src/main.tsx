import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'

import './index.css'
// import App from './01todoList.tsx'
// import App from './02playground.tsx'
// import App from './03lowcode-editor'
// import App from './04online-piano.tsx'
import App from './05tshirt-design'

createRoot(document.getElementById('root')!).render(<App />)
