import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'

import './index.css'
// import App from './01todoList.tsx'
// import App from './02playground.tsx'
import App from './03lowcode-editor'

createRoot(document.getElementById('root')!).render(<App />)
