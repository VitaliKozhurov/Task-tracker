import React from 'react';
import s from 'common/components/ProgressBar/ProgressBar.module.scss';
export const ProgressBar = () => {
    return (
        <>
            <div className={s.container}>
                <div className={s.progressBar}></div>
            </div>
        </>
    );
};
