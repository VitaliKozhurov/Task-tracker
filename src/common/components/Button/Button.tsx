import React, { FC, ReactNode } from 'react';
type ButtonPropsType = {
    children: ReactNode | string;
    callback: () => void;
    style: string;
};

export const Button: FC<ButtonPropsType> = ({ children, callback, style }) => {
    return (
        <>
            <button className={style} onClick={callback}>
                {children}
            </button>
        </>
    );
};
