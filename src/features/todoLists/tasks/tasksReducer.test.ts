import { TasksInitialStateType, tasksReducer, tasksThunks } from 'features/todoLists/tasks/taskSlice';
import { todoListsThunks } from 'features/todoLists/todoListSlice';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { TodoListServerType } from 'features/todoLists/todoListsApi';
import { EntityStatus } from 'app/appSlice';

describe('Tasks reducer tests', () => {
    let initialStateTasks: TasksInitialStateType;
    const todoListID = 'todo_1';
    beforeEach(() => {
        initialStateTasks = {
            [todoListID]: [
                {
                    description: 'blabla',
                    title: 'task_1',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    id: 'task_1',
                    todoListId: todoListID,
                    order: 1,
                    addedDate: '',
                    entityStatus: EntityStatus.IDLE,
                },
                {
                    description: 'yo',
                    title: 'task_2',
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    deadline: '',
                    id: 'task_2',
                    todoListId: todoListID,
                    order: 2,
                    addedDate: '',
                    entityStatus: EntityStatus.IDLE,
                },
            ],
        };
    });

    it('Should add new task', () => {
        const task = {
            description: 'blabla_3',
            title: 'task_3',
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: 'task_3',
            todoListId: todoListID,
            order: 3,
            addedDate: '',
        };
        const action = { type: tasksThunks.createTask.fulfilled.type, payload: { task } };
        const newTasksState = tasksReducer(initialStateTasks, action);

        expect(newTasksState[todoListID].length).toBe(3);
        expect(newTasksState[todoListID][0].title).toBe('task_3');
        expect(newTasksState[todoListID][0].id).toBe('task_3');
    });

    it('Should remove task', () => {
        const action = {
            type: tasksThunks.deleteTask.fulfilled.type,
            payload: {
                todoListID,
                taskID: 'task_1',
            },
        };
        const newTasksState = tasksReducer(initialStateTasks, action);

        expect(newTasksState[todoListID].length).toBe(1);
        expect(newTasksState[todoListID][0].title).toBe('task_2');
    });

    it('Should update task', () => {
        const updatedTaskData = {
            todoListID,
            taskID: 'task_1',
            updateModel: {
                title: 'new_task_1',
                deadline: 'new_deadline',
                description: 'new_description',
                priority: TaskPriorities.Hi,
                startDate: 'new_startDate',
                status: TaskStatuses.Completed,
            },
        };
        const action = { type: tasksThunks.updateTask.fulfilled.type, payload: updatedTaskData };
        const newTasksState = tasksReducer(initialStateTasks, action);
        expect(newTasksState[todoListID][0].title).toBe('new_task_1');
        expect(newTasksState[todoListID][0].deadline).toBe('new_deadline');
        expect(newTasksState[todoListID][0].description).toBe('new_description');
        expect(newTasksState[todoListID][0].priority).toBe(TaskPriorities.Hi);
        expect(newTasksState[todoListID][0].startDate).toBe('new_startDate');
        expect(newTasksState[todoListID][0].status).toBe(TaskStatuses.Completed);
    });

    it('Should set tasks', () => {
        const action = { type: tasksThunks.getTasks.fulfilled.type, payload: { tasks: initialStateTasks[todoListID] } };
        const newTasksState = tasksReducer({}, action);

        expect(newTasksState[todoListID].length).toBe(2);
    });

    it('Should change tasks state when add new todoList', () => {
        const newTodoList: TodoListServerType = { id: 'todo_2', title: 'Added todo list', addedDate: '', order: 5 };
        const action = { type: todoListsThunks.createTodoList.fulfilled.type, payload: { todoList: newTodoList } };

        const newTasksState = tasksReducer(initialStateTasks, action);
        expect(Object.keys(newTasksState).length).toBe(2);
        expect(newTasksState[newTodoList.id].length).toBe(0);
    });

    it('Should change tasks state when remove todoList', () => {
        const action = { type: todoListsThunks.deleteTodoList.fulfilled.type, payload: { todoListID } };
        const newTasksState = tasksReducer(initialStateTasks, action);
        expect(Object.keys(newTasksState).length).toBe(0);
    });

    it('Should change tasks state when set todoLists', () => {
        const newTodoLists: TodoListServerType[] = [
            { id: 'todo_2', title: 'Added todo list', addedDate: '', order: 5 },
        ];
        const action = { type: todoListsThunks.getTodoLists.fulfilled.type, payload: { todoLists: newTodoLists } };
        const newTasksState = tasksReducer(initialStateTasks, action);
        expect(newTasksState['todo_2']).toEqual([]);
    });
});
