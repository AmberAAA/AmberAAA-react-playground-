import { Input, Tag } from "antd";
import { KeyboardEventHandler, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ITodo, todoCount } from "./state";
import { todoListState } from './state'


export const TodoContainer: React.FC = () => {
  const count = useRecoilValue(todoCount)
    return (<div>
    <Tag>{count}</Tag>
    <CreateTodo/>
    <TodoList/>
  </div>)
}



const TodoList: React.FC = () => {
  const [ todoList ] = useRecoilState(todoListState)
  return (
    <ul>
      { todoList.map((item, id) => <TodoItem todo={item} key={id} />) }
    </ul>
  )
}

interface ITodoItemProps {
  todo: ITodo
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  return (<li>{ todo.name }</li>)
}


const CreateTodo: React.FC = () => {
  const [name, setName] = useState("")
  const [ list, setTodoList ] = useRecoilState(todoListState)


  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    return "Amber"
  }

  return (<Input value={name} onChange={e => setName(e.target.value)} onKeyUp={handleEnter}></Input>)
}