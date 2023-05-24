import Button from '../../UI/Button';
import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import styles from './TodoActions.module.css';

interface TodoActionsProps {
  resetTodos: () => void;
  deleteCompletedTodos: () => void;
  completedTodosExist: boolean;
}

const TodoActions = ({
  resetTodos,
  deleteCompletedTodos,
  completedTodosExist,
}: TodoActionsProps): JSX.Element => {
  return (
    <div className={styles.todosActionsContainer}>
      <Button onClick={resetTodos} title='איפוס משימות'>
        <RiRefreshLine />
      </Button>
      <Button
        onClick={deleteCompletedTodos}
        title='מחק משימות שהושלמו'
        disabled={!completedTodosExist}
      >
        <RiDeleteBin2Line />
      </Button>
    </div>
  );
};

export default TodoActions;
