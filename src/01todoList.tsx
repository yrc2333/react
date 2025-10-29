import { TodoList } from './TodoList'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoList></TodoList>
    </DndProvider>
  )
}

export default App
