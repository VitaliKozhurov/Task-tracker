import React, { FC, useState } from 'react';
import s from './TodoList.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAppDispatch } from 'common/hooks/hooks';
import { todoListsActions, todoListsThunks, TodoListsType } from 'features/todoLists/todoListSlice';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { EditInput } from 'components/EditInput/EditInput';

export const TodoList: FC<TodoListsType> = ({ id, title, isActive }) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const setTodoActiveHandler = () => {
        dispatch(todoListsActions.changeTodoListActiveStatus({ todoListID: id, activeStatus: true }));
    };
    const deleteTodoList = () => {
        dispatch(todoListsThunks.deleteTodoList({ todoListID: id }));
    };
    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
    };
    const changeTodoListTitle = (newTitle: string) => {
        dispatch(todoListsThunks.updateTodoListTitle({ todoListID: id, title: { title: newTitle } })).finally(() =>
            deactivateEditMode(),
        );
    };

    return (
        <div className={s.todoBody + (isActive ? ' ' + s.isActive : '')}>
            {editMode ? (
                <EditInput title={title} changeTitle={changeTodoListTitle} />
            ) : (
                <h2 className={s.title}>{title}</h2>
            )}
            {!editMode && (
                <div className={s.icons}>
                    <AiFillEdit className={s.icon} onClick={activateEditMode} />
                    <MdOutlineArrowForwardIos className={s.icon} onClick={setTodoActiveHandler} />
                </div>
            )}
            <div className={s.removeIcon} onClick={deleteTodoList}>
                <RiDeleteBin2Fill />
            </div>
        </div>
    );
};
