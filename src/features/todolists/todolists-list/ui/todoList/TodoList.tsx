import React, { FC, useState } from 'react';
import s from 'features/todolists/todolists-list/ui/todoList/TodoList.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAppDispatch } from 'common/hooks/hooks';
import {
    todoListsActions,
    todoListsThunks,
    TodoListType,
} from 'features/todolists/todolists-list/model/todo-lists-slice';
import { EntityStatus } from 'app/model/app-slice';
import { DragAndDrop, EditInput, RemoveIcon } from 'common/components';

type Props = {
    todo: TodoListType;
    draggableTodo: null | TodoListType;
    setDraggableTodoList: (todo: TodoListType) => void;
};

export const TodoList: FC<Props> = React.memo((props) => {
    const { todo } = props;
    const [editMode, setEditMode] = useState(false);
    const dispatch = useAppDispatch();

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
    };
    const setActiveTodoListStatus = () => {
        dispatch(todoListsActions.changeTodoListActiveStatus({ todoListID: todo.id, activeStatus: true }));
    };
    const deleteTodoListHandler = () => {
        dispatch(todoListsThunks.deleteTodoList({ todoListID: todo.id }));
    };
    const changeTodoListTitle = (newTitle: string) => {
        dispatch(todoListsThunks.updateTodoListTitle({ todoListID: todo.id, title: { title: newTitle } })).finally(() =>
            deactivateEditMode(),
        );
    };

    const todoClassName =
        s.todoBody +
        (todo.isActive ? ' ' + s.isActive : '') +
        (todo.entityStatus === EntityStatus.LOADING ? ' ' + s.disabled : '');

    return (
        <DragAndDrop {...props} classname={todoClassName}>
            {editMode && <EditInput title={todo.title} changeTitle={changeTodoListTitle} />}
            {!editMode && (
                <>
                    <h2 className={s.title}>{todo.title}</h2>
                    <div className={s.icons}>
                        <AiFillEdit className={s.icon} onClick={activateEditMode} />
                        <MdOutlineArrowForwardIos className={s.icon} onClick={setActiveTodoListStatus} />
                    </div>
                </>
            )}
            <RemoveIcon callback={deleteTodoListHandler} />
        </DragAndDrop>
    );
});
