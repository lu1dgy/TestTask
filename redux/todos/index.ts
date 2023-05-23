import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { Todo } from '@/utils/types';

interface TodoChange {
  type: string;
  timestamp: string;
  changes: any[];
}

interface TodosState {
  todos: Todo[];
  changes: TodoChange[];
}

const initialState: TodosState = {
  todos: [],
  changes: [],
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload;
      state.todos.push(newTodo);
      state.changes.push({
        type: 'add new todo',
        timestamp: formatTimestamp(Date.now()),
        changes: [{ prev: null, current: newTodo }],
      });
      console.log([...state.changes]);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const deletedTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      if (deletedTodoIndex !== -1) {
        const deletedTodo = state.todos[deletedTodoIndex];
        state.todos.splice(deletedTodoIndex, 1);
        state.changes.push({
          type: 'delete todo',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: deletedTodo, current: null }],
        });
        console.log([...state.changes]);
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const toggledTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      if (toggledTodoIndex !== -1) {
        const toggledTodo = state.todos[toggledTodoIndex];
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
        state.changes.push({
          type: 'toggle todo',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: toggledTodo, current: toggledTodo }],
        });
        console.log([...state.changes]);
      }
    },
    resetTodos: (state) => {
      const prevTodos = state.todos.slice();
      state.todos = [];
      state.changes.push({
        type: 'reset todo',
        timestamp: formatTimestamp(Date.now()),
        changes: prevTodos.map((todo) => ({ prev: todo, current: null })),
      });
      console.log([...state.changes]);
    },
    deleteCompletedTodos: (state) => {
      const completedTodos = state.todos.filter((todo) => todo.isCompleted);
      if (completedTodos.length > 0) {
        const prevTodos = state.todos.slice();
        state.todos = state.todos.filter((todo) => !todo.isCompleted);
        state.changes.push({
          type: 'delete completed todos',
          timestamp: formatTimestamp(Date.now()),
          changes: completedTodos.map((todo) => ({ prev: todo, current: null })),
        });
        console.log([...state.changes]);
      }
    },
    setTodos: (state, action) => {
      const prevTodos = state.todos.slice();
      state.todos = action.payload;
      state.changes.push({
        type: 'set reordered todos',
        timestamp: formatTimestamp(Date.now()),
        changes: prevTodos.map((prevTodo) => ({
          prev: prevTodo,
          current: action.payload.find((todo: Todo) => todo.id === prevTodo.id) || null,
        })),
      });
      console.log([...state.changes]);
    },
    updateTodoText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const updatedTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (updatedTodoIndex !== -1) {
        const prevTodo = state.todos[updatedTodoIndex];
        const updatedTodo = { ...prevTodo, text };
        state.todos[updatedTodoIndex] = updatedTodo;
        state.changes.push({
          type: 'update todo text',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: prevTodo, current: updatedTodo }],
        });
        console.log([...state.changes]);
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  resetTodos,
  deleteCompletedTodos,
  setTodos,
  updateTodoText,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todosSlice.todos;
export const selectCompletedTodosCount = (state: RootState) =>
  state.todosSlice.todos.filter((todo) => todo.isCompleted).length;

export default todosSlice.reducer;
