import React from 'react';
import s from './AddTodoListForm.module.scss';
import { MdAssignmentAdd } from 'react-icons/md';

export const AddTodoListsForm = () => {
    const onAddItemHandler = () => {};
    return (
        <>
            <div className={s.body}>
                <h2 className={s.formTitle}>Add new todoList</h2>
                <div className={s.formBody}>
                    <input type={'text'} />
                    <button>
                        <MdAssignmentAdd />
                    </button>
                </div>
            </div>
        </>
    );
};
