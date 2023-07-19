import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoListServerType } from 'api/api';
import { RequestStatusType } from 'app/app-slice';

export enum FilterValueType {
    ALL = 'all',
    ACTIVE = 'active',
    COMPLETED = 'completed',
}

const slice = createSlice({
    name: 'todoList',
    initialState: [] as TodoListsType[],
    reducers: {
        setTodoLists: (state, action: TodoListsActionType) => {
            return action.payload.todoLists.map((todo) => ({
                ...todo,
                filter: FilterValueType.ALL,
                entityStatus: RequestStatusType.IDLE,
            }));
        },
        removeTodoList: (state, action: RemoveTodoListType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state = state.slice(index, 1);
            }
        },
        addTodoList: (state, action: AddTodoListType) => {
            state.unshift({
                ...action.payload.todoList,
                filter: FilterValueType.ALL,
                entityStatus: RequestStatusType.IDLE,
            });
        },
        changeTodoListFilter: (state, action: ChangeTodoListFilterType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state[index].filter = action.payload.filter;
            }
        },
        changeTodoListTitle: (state, action: ChangeTodoListTitleType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state[index].title = action.payload.title;
            }
        },
        changeTodoListEntityStatus: (state, action: ChangeTodoListEntityStatusType) => {
            const index = state.findIndex((todo) => todo.id === action.payload.todoListID);
            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus;
            }
        },
    },
});

export const todoListsReducer = slice.reducer;
export const todoListsActions = slice.actions;

// types
type TodoListsType = TodoListServerType & { filter: FilterValueType } & { entityStatus: RequestStatusType };
type TodoListsActionType = PayloadAction<{ todoLists: TodoListServerType[] }>;
type RemoveTodoListType = PayloadAction<{ todoListID: string }>;
type AddTodoListType = PayloadAction<{ todoList: TodoListServerType }>;
type ChangeTodoListFilterType = PayloadAction<{ todoListID: string; filter: FilterValueType }>;
type ChangeTodoListTitleType = PayloadAction<{ todoListID: string; title: string }>;
type ChangeTodoListEntityStatusType = PayloadAction<{ todoListID: string; entityStatus: RequestStatusType }>;
