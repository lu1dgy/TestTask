'use client';
import uuidv4 from 'uuid4';
import TodosActions from '@/components/Todos/TodoActions';
import TodoForm from '@/components/Todos/TodoForm';
import TodoList from '@/components/Todos/TodoList';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  resetTodos,
  deleteCompletedTodos,
  selectTodos,
  selectCompletedTodosCount,
  setTodos,
} from '@/redux/todos/todos';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '@/utils/types';

export default function Home() {
  const todos = useSelector(selectTodos);
  const completedTodosCount = useSelector(selectCompletedTodosCount);
  const dispatch = useDispatch();

  const addTodoHandler = (text: string) => {
    const newTodo = {
      text,
      isCompleted: false,
      id: uuidv4(),
      order: todos.length + 1,
    };
    dispatch(addTodo(newTodo));
  };

  const deleteTodoHandler = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const toggleTodoHandler = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const resetTodosHandler = () => {
    dispatch(resetTodos());
  };

  const deleteCompletedTodosHandler = () => {
    dispatch(deleteCompletedTodos());
  };

  const setTodosHandler = (todo: Todo) => {
    dispatch(setTodos(todo));
  };

  return (
    <>
      <h1>TodoApp</h1>
      <TodoForm addTodo={addTodoHandler} />
      {!!todos.length && (
        <TodosActions
          completedTodosExist={!!completedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodosHandler}
        />
      )}
      <TodoList
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
        todos={todos}
        setTodos={setTodosHandler}
      />
      {completedTodosCount > 0 && (
        <h2>{`You have completed ${completedTodosCount} ${
          completedTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </>
  );
}
