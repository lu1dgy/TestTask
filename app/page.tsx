'use client';
import uuid4 from 'uuid4';
import { useState } from 'react';

import TodosActions from '@/components/Todos/TodoActions';
import TodoForm from '@/components/Todos/TodoForm';
import TodoList from '@/components/Todos/TodoList';

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  order: number;
}

export interface TodoProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  dragStartHandler: (event: React.DragEvent<HTMLLIElement>, todo: Todo) => void;
  dragEndHandler: (event: React.DragEvent<HTMLLIElement>) => void;
  dragOverHandler: (event: React.DragEvent<HTMLLIElement>) => void;
  dropHandler: (event: React.DragEvent<HTMLLIElement>, todo: Todo) => void;
}

export interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: uuid4(),
      order: todos.length + 1,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoHandler = (id: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  const resetTodosHandler = () => {
    setTodos([]);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length;

  return (
    <>
      <TodoForm addTodo={addTodoHandler} />
      {!!todos.length && (
        <TodosActions
          completedTodosExist={!!completedTodosCount}
          resetTodos={resetTodosHandler}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      )}
      <TodoList
        deleteTodo={deleteTodoHandler}
        toggleTodo={toggleTodoHandler}
        todos={todos}
        setTodos={setTodos}
      />
      {completedTodosCount > 0 && (
        <h2>{`You have completed ${completedTodosCount} ${
          completedTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </>
  );
}
