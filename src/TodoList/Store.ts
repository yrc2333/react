import { create,StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ListItemData {
  id: string,
  status: boolean,
  content: string
}

type State = {
  list: Array<ListItemData>
}

type Action = {
  addItem: (item: ListItemData,preId?:string) => void,
  deleteItem: (id: string) => void,
  updateItem: (item: ListItemData) => void,
}

 const stateCreator : StateCreator<State & Action> =(set) => ({
  list: [],
  addItem: (data: ListItemData,preId?:string ) => {
    set((state) => {

      if (preId){
        const preIndex = state.list.findIndex(item => item.id === preId);
      

        return {
          list: [
            ...state.list.slice(0, preIndex+1),
            data,
            ...state.list.slice(preIndex+1),
          ]
        }
      }


      return {
        list: [
          ...state.list,
          data
        ]
      }
    })
  },
  deleteItem: (id: string) => {
    set((state) => {
      return {
        list: state.list.filter(item => {
          return item.id !== id;
        })
      }
    });
  },
  updateItem: (updateItem: ListItemData) => {
    set(state => {
      return {
        list: state.list.map(item => {
          if(item.id === updateItem.id) {
            return updateItem;
          }
          return item;
        })
      }
    })
  }
})


export const useTodoListStore =create<State & Action>()(persist(stateCreator, {name: 'todoList'}));
 