import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { Todo } from '@/utils/types';

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
    },
    resetTodos: (state) => {
      state.todos = [];
    },
    deleteCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.isCompleted);
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, resetTodos, deleteCompletedTodos, setTodos } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todosSlice.todos;
export const selectCompletedTodosCount = (state: RootState) =>
  state.todosSlice.todos.filter((todo) => todo.isCompleted).length;

export default todosSlice.reducer;
