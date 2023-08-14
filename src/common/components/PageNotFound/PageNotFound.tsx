import React from 'react';
import style from './PageNotFound.module.scss';
import notFoundImage from 'assets/image/404.svg';
import { Link, useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className={style.body}>
            <div className={style.links}>
                <button className={style.backButton} onClick={() => navigate(-2)}>
                    Back
                </button>
                <Link to={'/todolists'} className={style.link}>
                    Go to todoLists
                </Link>
            </div>
            <div className={style.image}>
                <img src={notFoundImage} alt="Not found page" />
            </div>
            <h1 className={style.message}>Ooops, page not found 😢</h1>
        </div>
    );
};
