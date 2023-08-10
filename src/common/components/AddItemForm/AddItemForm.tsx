import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import s from 'common/components/AddItemForm/AddItemForm.module.scss';
import { MdAssignmentAdd } from 'react-icons/md';
import { Button } from 'common/components/Button/Button';

type AddItemFormPropsType = {
    title: string;
    callback: (title: string) => Promise<any>;
};

export const AddItemForm: FC<AddItemFormPropsType> = ({ title, callback }) => {
    const [itemTitle, setTitle] = useState('');
    const [error, setError] = useState<null | string>(null);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null);
        setTitle(e.currentTarget.value);
    };

    const onAddItemHandler = () => {
        if (itemTitle.length) {
            callback(itemTitle)
                .then((res) => setTitle(''))
                .catch((err) => {
                    const error = err.data.messages.length ? err.data.messages[0].split('.')[0] : 'Error ❌';
                    setError(error);
                });
        } else {
            setError('Title can not be empty');
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
                <div className={s.form}>
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
                    </div>
                    <div className={s.error}>{error}</div>
                </div>
            </div>
        </>
    );
};
