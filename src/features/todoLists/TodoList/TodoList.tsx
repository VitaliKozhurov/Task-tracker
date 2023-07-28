import React, { FC } from 'react';
import { EntityStatusType } from 'app/appSlice';
import s from './TodoList.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
type TodoListType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
    entityStatus: EntityStatusType;
};

export const TodoList: FC<TodoListType> = ({ title }) => {
    return (
        <div className={s.todoBody}>
            <h2 className={s.title}>{title}</h2>
            <div className={s.icons}>
                <AiFillEdit />
                <MdOutlineArrowForwardIos />
            </div>
        </div>
    );
};
