import { atom, selector } from "recoil";

export interface ITodo {
  id: Symbol;
  name: string;
}

export type ITodoList = ITodo[]

export const todoListState = atom<ITodoList>({
  key: 'TODO_LIST',
  default: []
})

export const todoCount = selector({
  key: 'TODO_COUNT',
  get: ({get}) => get(todoListState).length 
})

