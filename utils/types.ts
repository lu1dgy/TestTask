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
  setTodos: any;
}
