import React from 'react';
import s from './ProgressBar.module.scss';
export const ProgressBar = () => {
    return (
        <>
            <div className={s.container}>
                <div className={s.progressBar}></div>
            </div>
        </>
    );
};
