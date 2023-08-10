import React from 'react';
import style from './InitializeComponent.module.scss';

export const InitializeComponent = () => {
    return (
        <div className={style.body}>
            <div className={style.spinnerBody}>
                <div className={style.spinner}>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
