import React, { FC } from 'react';
import { Button } from 'common/components/Button/Button';
import {
    FilterType,
    FilterValueType,
    todoListsActions,
} from 'features/todolists/todolists-list/model/todo-lists-slice';
import style from './FilterGroup.module.scss';
import { useAppDispatch } from 'common/hooks/hooks';

type Props = {
    todoListID: string;
    filterType: FilterValueType;
};

export const FilterGroup: FC<Props> = ({ todoListID, filterType }) => {
    const dispatch = useAppDispatch();
    const setTasksFilterType = (filter: FilterValueType) => {
        dispatch(todoListsActions.changeTodoListFilter({ todoListID, filter }));
    };
    return (
        <div className={style.filterGroup}>
            <Button
                callback={() => setTasksFilterType(FilterType.ALL)}
                style={style.btn + (filterType === FilterType.ALL ? ' ' + style.active : '')}
            >
                All
            </Button>
            <Button
                callback={() => setTasksFilterType(FilterType.ACTIVE)}
                style={style.btn + (filterType === FilterType.ACTIVE ? ' ' + style.active : '')}
            >
                Active
            </Button>
            <Button
                callback={() => setTasksFilterType(FilterType.COMPLETED)}
                style={style.btn + (filterType === FilterType.COMPLETED ? ' ' + style.active : '')}
            >
                Completed
            </Button>
        </div>
    );
};
