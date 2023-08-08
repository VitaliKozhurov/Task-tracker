import React, { FC } from 'react';
import s from 'features/todoLists/tasks/Task/Task.module.scss';
import { BsCalendar3 } from 'react-icons/bs';
import moment from 'moment/moment';

type AddedDatePropsType = {
    addedDate: string | Date;
};

export const AddedDate: FC<AddedDatePropsType> = ({ addedDate }) => {
    return (
        <div className={s.addedDate}>
            {<BsCalendar3 />}
            <span>{moment(addedDate).format('MMMM Do YYYY')}</span>
        </div>
    );
};
