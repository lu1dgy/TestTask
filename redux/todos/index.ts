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
      const change = {
        type: 'add new todo',
        timestamp: formatTimestamp(Date.now()),
        changes: [{ prev: null, current: newTodo }],
      };
      state.todos.push(newTodo);
      state.changes.push(change);
      console.log(change);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const deletedTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      if (deletedTodoIndex !== -1) {
        const deletedTodo = state.todos[deletedTodoIndex];
        const change = {
          type: 'delete todo',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: deletedTodo, current: null }],
        };
        state.todos.splice(deletedTodoIndex, 1);
        state.changes.push(change);
        console.log(change);
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const toggledTodoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      if (toggledTodoIndex !== -1) {
        const toggledTodo = state.todos[toggledTodoIndex];
        const change = {
          type: 'toggle todo',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: toggledTodo, current: toggledTodo }],
        };
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
        state.changes.push(change);
        console.log(change);
      }
    },
    resetTodos: (state) => {
      const prevTodos = state.todos.slice();
      const change = {
        type: 'reset todo',
        timestamp: formatTimestamp(Date.now()),
        changes: prevTodos.map((todo) => ({ prev: todo, current: null })),
      };
      state.todos = [];
      state.changes.push(change);
      console.log(change);
    },
    deleteCompletedTodos: (state) => {
      const completedTodos = state.todos.filter((todo) => todo.isCompleted);
      if (completedTodos.length > 0) {
        const prevTodos = state.todos.slice();
        const change = {
          type: 'delete completed todos',
          timestamp: formatTimestamp(Date.now()),
          changes: completedTodos.map((todo) => ({ prev: todo, current: null })),
        };
        state.todos = state.todos.filter((todo) => !todo.isCompleted);
        state.changes.push(change);
        console.log(change);
      }
    },
    setTodos: (state, action) => {
      const prevTodos = state.todos.slice();
      const change = {
        type: 'set reordered todos',
        timestamp: formatTimestamp(Date.now()),
        changes: prevTodos.map((prevTodo) => ({
          prev: prevTodo,
          current: action.payload.find((todo: Todo) => todo.id === prevTodo.id) || null,
        })),
      };
      state.todos = action.payload;
      state.changes.push(change);
      console.log(change);
    },
    updateTodoText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const updatedTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (updatedTodoIndex !== -1) {
        const prevTodo = state.todos[updatedTodoIndex];
        const updatedTodo = { ...prevTodo, text };
        const change = {
          type: 'update todo text',
          timestamp: formatTimestamp(Date.now()),
          changes: [{ prev: prevTodo, current: updatedTodo }],
        };
        state.todos[updatedTodoIndex] = updatedTodo;
        state.changes.push(change);
        console.log(change);
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
