import React, { KeyboardEvent, FC, useState, ChangeEvent } from 'react';
import s from 'components/AddItemForm/AddItemForm.module.scss';
import { MdAssignmentAdd } from 'react-icons/md';
import { Button } from 'components/Button/Button';

type AddItemFormPropsType = {
    title: string;
    callback: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({ title, callback }) => {
    const [itemTitle, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setTitle(e.currentTarget.value);
    };

    const onAddItemHandler = () => {
        if (!itemTitle.length) {
            setError('Title can not be empty');
        } else {
            callback(itemTitle);
            setTitle('');
        }
    };

    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            onAddItemHandler();
        }
    };

    return (
        <>
            <div className={s.body}>
                <h2 className={s.formTitle}>Add {title}</h2>
                <div className={s.formBody + (itemTitle.length ? ' ' + s.successInput : '')}>
                    <input
                        className={s.input}
                        type={'text'}
                        value={itemTitle}
                        onChange={onChangeTitleHandler}
                        onKeyUp={onPressEnterHandler}
                    />
                    <Button callback={onAddItemHandler} style={s.btnStyle}>
                        <MdAssignmentAdd />
                    </Button>
                    <div className={s.error}>{error}</div>
                </div>
            </div>
        </>
    );
};
