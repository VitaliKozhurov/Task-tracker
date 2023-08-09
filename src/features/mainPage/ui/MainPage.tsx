import React from 'react';
import mainPageImage from 'assets/image/todo.webp';
import style from 'features/mainPage/ui/MainPage.module.scss';
import { Link } from 'react-router-dom';

export const MainPage = () => {
    return (
        <div className={style.body}>
            <h1 className={style.greeting}>Welcome to our ToDo-List app!</h1>
            <p className={style.text}>Stay organized, boost your productivity, and never miss a deadline again.</p>
            <div className={style.image}>
                <img src={mainPageImage} alt="Main page" />
            </div>
            <Link to={'todolists'} className={style.link}>
                Get starting
            </Link>
        </div>
    );
};
