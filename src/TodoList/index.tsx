import type { FC } from 'react'
import { List } from './List'
import { NewItem } from './NewItem'
import { GarbageBin } from './GarbageBin'

interface TodoListProps {}

export const TodoList: FC<TodoListProps> = () => {
  return (
    <div className="w-[1000px] h-[600px] m-auto  mt-[100px]  p-[10px] border-2 border-black flex justify-between items-start">
      <div className="flex-2 h-full mr-[10px]  overflow-auto">
        <List className="h-full" />
      </div>
      <div className="flex-1 h-full flex flex-col gap-1">
        <NewItem />
        <GarbageBin />
      </div>
    </div>
  )
}
