import { ChangeEvent, useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../UI/Button';

interface TodoFormProps {
  addTodo: (text: string) => void;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder='Enter new todo'
          type='text'
          value={text}
          minLength={1}
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button title='Submit' type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
}
