import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import s from './EditInput.module.scss';

type EditInputType = {
    title: string;
    changeTitle: (newTitle: string) => void;
};

export const EditInput: FC<EditInputType> = ({ title, changeTitle }) => {
    const [inputValue, setInputValue] = useState(title);
    const [error, setError] = useState<string | null>(null);
    const changeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setInputValue(e.currentTarget.value);
    };
    const onBlurInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (inputValue) {
            changeTitle(inputValue);
        } else {
            setError('Title can not be empty');
        }
    };
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (inputValue) {
                changeTitle(inputValue);
            } else {
                setError('Title can not be empty');
            }
        }
    };

    return (
        <>
            <input
                className={s.title}
                value={inputValue}
                type="text"
                onChange={changeTodolistTitleHandler}
                onBlur={onBlurInputHandler}
                placeholder={error ? error : ''}
                onKeyUp={onPressEnterHandler}
                autoFocus
            />
        </>
    );
};
