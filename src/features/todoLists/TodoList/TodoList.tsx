import React, { FC, useEffect } from 'react';
import s from './TodoList.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAppDispatch } from 'common/hooks/hooks';
import { todoListsActions, TodoListsType } from 'features/todoLists/todoListSlice';
import { tasksThunks } from 'features/todoLists/tasks/taskSlice';

export const TodoList: FC<TodoListsType> = ({ id, title, isActive }) => {
    const dispatch = useAppDispatch();
    const setTodoActiveHandler = () => {
        dispatch(todoListsActions.changeTodoListActiveStatus({ todoListID: id, activeStatus: true }));
    };
    useEffect(() => {
        dispatch(tasksThunks.getTasks({ todoListID: id }));
    }, []);
    return (
        <div className={s.todoBody + (isActive ? ' ' + s.isActive : '')}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.icons}>
                <AiFillEdit className={s.icon} />
                <MdOutlineArrowForwardIos className={s.icon} onClick={setTodoActiveHandler} />
            </div>
        </div>
    );
};
