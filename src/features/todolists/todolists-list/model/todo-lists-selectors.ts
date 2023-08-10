import { RootState } from 'app/model/store';

export const getTodoListsSelector = (state: RootState) => state.todoLists;
export const getActiveTodoList = (state: RootState) => state.todoLists.find((todo) => todo.isActive);
