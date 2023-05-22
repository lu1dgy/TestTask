import { useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../UI/Button';
export default function TodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Enter new todo"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}></input>
        <Button title="Submit" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
