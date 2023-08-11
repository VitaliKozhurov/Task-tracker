import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import s from 'common/components/EditInput/EditInput.module.scss';

type EditInputType = {
    title: string;
    changeTitle: (newTitle: string) => void;
    deactivateEditMode: () => void;
};

export const EditInput: FC<EditInputType> = ({ title, changeTitle, deactivateEditMode }) => {
    const [inputValue, setInputValue] = useState(title);
    const [error, setError] = useState<string | null>(null);
    const changeTodolistTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setInputValue(e.currentTarget.value);
    };
    const updateTitleHandler = () => {
        if (inputValue !== title) {
            if (inputValue) {
                changeTitle(inputValue);
            } else {
                setError('Title can not be empty');
            }
        }
        deactivateEditMode();
    };

    const onBlurInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTitleHandler();
    };
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            updateTitleHandler();
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
