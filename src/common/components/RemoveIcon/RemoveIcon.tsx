import React, { FC } from 'react';
import s from 'common/components/RemoveIcon/RemoveIcon.module.scss';
import { RiDeleteBin2Fill } from 'react-icons/ri';

type RemoveIconPropsType = {
    callback: () => void;
};

export const RemoveIcon: FC<RemoveIconPropsType> = ({ callback }) => {
    return (
        <div className={s.removeIcon} onClick={callback}>
            <RiDeleteBin2Fill />
        </div>
    );
};
