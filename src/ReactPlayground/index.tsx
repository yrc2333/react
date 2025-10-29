import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { Header } from './Header'
import { CodeEditor } from './CodeEditor'
import { Preview } from './Preview'

export default function ReactPlayground() {
  return (
    <div className="h-screen">
      <Header></Header>
      <div style={{ height: 'calc(100vh - 48px)' }}>
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={400}>
            <CodeEditor></CodeEditor>
          </Allotment.Pane>
          <Allotment.Pane minSize={20}>
            <Preview></Preview>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
