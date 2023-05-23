'use client';
import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';
import { ChangeEvent, useState } from 'react';
import { TodoProps } from '@/utils/types';
import { useDispatch } from 'react-redux';
import { updateTodoText } from '@/redux/todos';

export default function Todo({
  todo,
  deleteTodo,
  toggleTodo,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
}: TodoProps) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(todo.text);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    dispatch(updateTodoText({ id: todo.id, text: inputValue }));
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
      <input
        className={styles.todoText}
        value={inputValue}
        onChange={onInputChange}
        onBlur={handleInputBlur}
      />
      <RiDeleteBin2Line
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className={styles.deleteIcon}
      />
      <FaCheck
        onClick={() => {
          toggleTodo(todo.id);
        }}
        className={styles.checkIcon}
      />
    </li>
  );
}
