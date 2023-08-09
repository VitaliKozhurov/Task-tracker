import { RootState } from 'app/store';

export const getTodoListsSelector = (state: RootState) => state.todoLists;
export const getActiveTodoList = (state: RootState) => state.todoLists.find((todo) => todo.isActive);
