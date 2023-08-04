import React, { FC, useState } from 'react';
import { TaskPriorities } from 'common/enums';
import s from './PrioritySelector.module.scss';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import { Priority } from 'components/Priority/Priority';

type PriorityPropsType = {
    currentPriority: TaskPriorities;
    callback: (newPriority: TaskPriorities) => void;
};

const priorities = [
    { priority: 0, title: 'Low' },
    { priority: 1, title: 'Middle' },
    { priority: 2, title: 'Hi' },
    { priority: 3, title: 'Urgently' },
    { priority: 4, title: 'Later' },
];

export const PrioritySelector: FC<PriorityPropsType> = ({ currentPriority, callback }) => {
    const [prioritiesList, setPriorityList] = useState(priorities);
    const [selectMode, setSelectMode] = useState(false);

    const changeSelectMode = () => {
        setSelectMode(!selectMode);
    };

    const changePriority = (newPriority: TaskPriorities) => {
        callback(newPriority);
        setSelectMode(false);
    };

    const listWithoutCurrentPriority = prioritiesList.filter(
        (item) => item.title !== prioritiesList[currentPriority].title,
    );

    return (
        <>
            <div className={s.selector}>
                <div className={s.selectedItem}>
                    <span>{prioritiesList[currentPriority].title}</span>
                    <div className={s.selectControl}>
                        <Priority priority={prioritiesList[currentPriority].priority} />
                        <div onClick={changeSelectMode} className={s.control}>
                            {selectMode ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                        </div>
                    </div>
                </div>
                {selectMode && (
                    <div className={s.selectList}>
                        {listWithoutCurrentPriority.map((item) => (
                            <ListItem
                                key={item.priority}
                                title={item.title}
                                index={item.priority}
                                onChangePriorityHandler={changePriority}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

type ListItemPropsType = {
    title: string;
    index: number;
    onChangePriorityHandler: (newPriority: number) => void;
};

const ListItem: FC<ListItemPropsType> = ({ title, index, onChangePriorityHandler }) => {
    const onChangeActivePriorityItem = () => {
        onChangePriorityHandler(index);
    };
    return (
        <div className={s.item} onClick={onChangeActivePriorityItem}>
            <span>{title}</span>
            <Priority priority={index} />
        </div>
    );
};
