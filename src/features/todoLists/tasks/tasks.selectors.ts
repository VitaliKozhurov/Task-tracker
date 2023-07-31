import { createSelector } from 'reselect';
import { RootState } from 'app/store';

const getTodoLists = (state: RootState) => state.todoLists;
const getTasks = (state: RootState) => state.tasks;

export const getTasksForActiveTodoList = createSelector([getTodoLists, getTasks], (todoLists, tasks) => {
    const activeTodo = todoLists.find((todo) => todo.isActive);

    if (activeTodo) {
        return tasks[activeTodo.id] || [];
    }

    return [];
});
