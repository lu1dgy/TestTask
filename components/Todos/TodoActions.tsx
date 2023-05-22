import Button from '../UI/Button';
import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import styles from './TodoActions.module.css';
export default function TodosActions({
  resetTodos,
  deleteCompletedTodos,
  completedTodosExist,
}) {
  return (
    <div className={styles.todosActionsContainer}>
      <Button onClick={resetTodos} title="Reset todos">
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodos}
        title="Clear completed todos"
        disabled={!completedTodosExist}>
        <RiDeleteBin2Line />
      </Button>
    </div>
  );
}
