import React, { FC, DragEvent, useState } from 'react';
import s from 'features/todoLists/TodoListsList/TodoList/TodoList.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAppDispatch } from 'common/hooks/hooks';
import { todoListsActions, todoListsThunks, TodoListType } from 'features/todoLists/todoListSlice';
import { EditInput } from 'components/EditInput/EditInput';
import { RemoveIcon } from 'components/RemoveIcon/RemoveIcon';
import { EntityStatus } from 'app/appSlice';

type DragAndDropTodoListType = {
    todo: TodoListType;
    currentTodo: null | TodoListType;
    setDraggableTodoList: (todo: TodoListType) => void;
};

export const TodoList: FC<DragAndDropTodoListType> = React.memo(({ todo, currentTodo, setDraggableTodoList }) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();
    const setActiveTodoListStatus = () => {
        dispatch(todoListsActions.changeTodoListActiveStatus({ todoListID: todo.id, activeStatus: true }));
    };
    const deleteTodoList = () => {
        dispatch(todoListsThunks.deleteTodoList({ todoListID: todo.id }));
    };
    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
    };
    const changeTodoListTitle = (newTitle: string) => {
        dispatch(todoListsThunks.updateTodoListTitle({ todoListID: todo.id, title: { title: newTitle } })).finally(() =>
            deactivateEditMode(),
        );
    };

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        setDraggableTodoList(todo);
    };
    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
    };
    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.style.background = 'rgba(66,237,80,0.4)';
    };
    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
        if (currentTodo) {
            dispatch(todoListsActions.changeTodoListOrder({ dragTodo: currentTodo, dropTodo: todo }));
        }
    };

    const todoClassName =
        s.todoBody +
        (todo.isActive ? ' ' + s.isActive : '') +
        (todo.entityStatus === EntityStatus.LOADING ? ' ' + s.disabled : '');

    return (
        <div
            className={todoClassName}
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragLeave={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            {editMode ? (
                <EditInput title={todo.title} changeTitle={changeTodoListTitle} />
            ) : (
                <>
                    <h2 className={s.title}>{todo.title}</h2>
                    <div className={s.icons}>
                        <AiFillEdit className={s.icon} onClick={activateEditMode} />
                        <MdOutlineArrowForwardIos className={s.icon} onClick={setActiveTodoListStatus} />
                    </div>
                </>
            )}
            <RemoveIcon callback={deleteTodoList} />
        </div>
    );
});
