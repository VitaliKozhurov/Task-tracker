import React, { FC } from 'react';
import s from 'features/todoLists/tasks/Task/Task.module.scss';
import { AiOutlineFieldTime } from 'react-icons/ai';
import moment from 'moment';

type DeadlinePropsType = {
    deadline: string | Date;
};

export const Deadline: FC<DeadlinePropsType> = ({ deadline }) => {
    if (!!deadline) {
        return (
            <div className={s.deadline}>
                {<AiOutlineFieldTime />}
                <span>{moment(deadline).format('MMMM Do YYYY')}</span>
            </div>
        );
    } else {
        return null;
    }
};
