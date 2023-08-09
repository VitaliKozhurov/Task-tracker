import React, { DragEvent, FC } from 'react';
import { todoListsActions, TodoListType } from 'features/todolists/todolists-list/model/todo-lists-slice';
import { useAppDispatch } from 'common/hooks/hooks';

type Props = {
    classname: string;
    children: React.ReactNode;
    todo: TodoListType;
    draggableTodo: null | TodoListType;
    setDraggableTodoList: (todo: TodoListType) => void;
};

export const DragAndDrop: FC<Props> = ({ classname, todo, draggableTodo, setDraggableTodoList, children }) => {
    const dispatch = useAppDispatch();
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
        if (draggableTodo) {
            dispatch(todoListsActions.changeTodoListOrder({ dragTodo: draggableTodo, dropTodo: todo }));
        }
    };

    return (
        <div
            className={classname}
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDragLeave={dragEndHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
        >
            {children}
        </div>
    );
};
