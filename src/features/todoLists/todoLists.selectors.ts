import { RootState } from 'app/store';

export const getTodoListsSelector = (state: RootState) => state.todoLists;
