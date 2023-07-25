import React, { FC, ReactNode } from 'react';
import s from './Button.module.scss';
type ButtonPropsType = {
    children: ReactNode;
    callback: () => void;
};

export const Button: FC<ButtonPropsType> = ({ children, callback }) => {
    return (
        <>
            <button className={s.button} onClick={callback}>
                {children}
            </button>
        </>
    );
};
