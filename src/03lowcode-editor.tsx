import LowcodeEditor from './lowcode-editor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LowcodeEditor></LowcodeEditor>
    </DndProvider>
  )
}

export default App
