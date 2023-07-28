import React, { ChangeEvent, useState } from 'react';
import s from 'components/AddItemForm/AddItemForm.module.scss';
import { MdAssignmentAdd } from 'react-icons/md';
import { Button } from 'components/Button/Button';

export const AddItemForm = () => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setTitle(e.currentTarget.value);
    };

    const onAddItemHandler = () => {
        if (!title.length) {
            setError('Title can not be empty');
        }
    };

    return (
        <>
            <div className={s.body}>
                <h2 className={s.formTitle}>Add Todo</h2>
                <div className={s.formBody + (title.length ? ' ' + s.successInput : '')}>
                    <input className={s.input} type={'text'} onChange={onChangeTitleHandler} />
                    <Button callback={onAddItemHandler} style={s.btnStyle}>
                        <MdAssignmentAdd />
                    </Button>
                    <div className={s.error}>{error}</div>
                </div>
            </div>
        </>
    );
};
