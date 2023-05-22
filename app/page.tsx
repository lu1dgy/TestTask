'use client';
import TodosActions from '@/components/Todos/TodoActions';
import TodoForm from '@/components/Todos/TodoForm';
import uuid4 from 'uuid4';
import TodoList from '@/components/Todos/TodoList';
import { useState } from 'react';

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface TodoProps {
  todo?: Todo;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export interface TodoListProps extends TodoProps {
  todos: Todo[];
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo: Todo = {
      text,
      isCompleted: false,
      id: uuid4(),
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
      <TodoList deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoHandler} todos={todos} />
      {completedTodosCount > 0 && (
        <h2>{`You have completed ${completedTodosCount} ${
          completedTodosCount > 1 ? 'todos' : 'todo'
        }`}</h2>
      )}
    </>
  );
}
