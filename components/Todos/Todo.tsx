'use client';
import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';
import { TodoProps } from '@/app/page';
import { ChangeEvent, useState } from 'react';

export default function Todo({
  todo,
  deleteTodo,
  toggleTodo,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
}: TodoProps) {
  const [inputValue, setInputValue] = useState(todo?.text || '');
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <li
      className={`${styles.todo} ${todo?.isCompleted ? styles.completedTodo : ''}`}
      onDragStart={(e) => dragStartHandler(e, todo)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, todo)}
      draggable={true}
    >
      <RiTodoFill className={styles.todoIcon} />
      <input className={styles.todoText} value={inputValue} onChange={onInputChange} />
      <RiDeleteBin2Line
        onClick={() => {
          deleteTodo(todo?.id || '');
        }}
        className={styles.deleteIcon}
      />
      <FaCheck
        onClick={() => {
          toggleTodo(todo?.id || '');
        }}
        className={styles.checkIcon}
      />
    </li>
  );
}
