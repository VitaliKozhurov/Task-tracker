import React, { FC } from 'react';
import s from 'features/todolists/tasks-list/ui/task/Task.module.scss';
import { AiOutlineFieldTime } from 'react-icons/ai';
import moment from 'moment';

type DeadlinePropsType = {
    deadline: string | Date;
};

export const Deadline: FC<DeadlinePropsType> = ({ deadline }) => {
    const deadlineStyle = s.deadline + (moment(new Date()) > moment(deadline) ? ' ' + s.isEndTime : '');
    if (!!deadline) {
        return (
            <div className={deadlineStyle}>
                {<AiOutlineFieldTime />}
                <span>{moment(deadline).format('MMMM Do YYYY')}</span>
            </div>
        );
    } else {
        return null;
    }
};
