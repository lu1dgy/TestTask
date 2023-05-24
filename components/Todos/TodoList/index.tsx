import { Todo, TodoListProps } from '@/utils/types';
import { useState } from 'react';
import TodoComponent from '../Todo';
import styles from './TodoList.module.css';

export default function TodoList({ todos, deleteTodo, toggleTodo, setTodos }: TodoListProps) {
  const [currentCard, setCurrentCard] = useState<Todo | null>(null);

  const changeOpacity = (e: React.DragEvent<HTMLLIElement>, opacity: string) => {
    const nearestLi = e.currentTarget as HTMLLIElement;
    nearestLi.style.opacity = opacity;
  };

  const dragStartHandler = (e: React.DragEvent<HTMLLIElement>, todo: Todo) => {
    setCurrentCard(todo);
  };

  const dragEndHandler = (e: React.DragEvent<HTMLLIElement>) => {
    changeOpacity(e, '1');
  };

  const dragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    changeOpacity(e, '0.5');
  };

  const dropHandler = (e: React.DragEvent<HTMLLIElement>, todo: Todo) => {
    e.preventDefault();
    setTodos(
      todos.map((el) => {
        if (el.id === todo.id) {
          return { ...el, order: currentCard!.order };
        }
        if (el.id === currentCard!.id) {
          return { ...el, order: todo.order };
        }

        return el;
      })
    );
    changeOpacity(e, '1');
  };

  const sortCards = (todoA: Todo, todoB: Todo) => {
    if (todoA.order > todoB.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <ul className={styles.todoListContainer}>
      {!todos.length && <h2>רשימת המשימות ריקה</h2>}
      {todos
        .slice()
        .sort(sortCards)
        .map((todo) => {
          return (
            <TodoComponent
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
              dragOverHandler={dragOverHandler}
              dropHandler={dropHandler}
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}
    </ul>
  );
}
