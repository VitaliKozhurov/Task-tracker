import React from 'react';
import { useAppSelector, useLogin } from 'common/hooks/hooks';
import { Navigate } from 'react-router-dom';
import { getAuthLoggedStatusSelector } from 'features/login/model/auth-selectors';
import s from 'features/login/ui/Login.module.scss';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

const getInputClassName = (error: string | undefined, touched: boolean | undefined) => {
    return (
        s.loginInput +
        ' ' +
        (error && touched ? s.loginInputError : '') +
        ' ' +
        (!error && touched ? s.loginInputSuccess : '')
    );
};

export const Login = () => {
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);
    const { formik } = useLogin();
    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    }
    const isDisableButton = !!Object.keys(formik.errors).length || formik.isSubmitting;

    return (
        <div className={s.formBody}>
            <div className={s.loginHeader}>Sign In</div>
            <div className={s.loginDescription}>Sign in and start managing your tasks!</div>
            <form className={s.loginForm} onSubmit={formik.handleSubmit}>
                <div className={s.loginInputBody}>
                    <input
                        className={getInputClassName(formik.errors.email, formik.touched.email)}
                        type={'text'}
                        placeholder={'Email'}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className={s.loginErrorMessage}>{formik.errors.email}</div>
                    )}
                </div>
                <div className={s.loginInputBody}>
                    <input
                        className={getInputClassName(formik.errors.password, formik.touched.password)}
                        type={'password'}
                        placeholder={'Password'}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className={s.loginErrorMessage}>{formik.errors.password}</div>
                    )}
                </div>
                <div className={s.loginCheckBoxBody}>
                    <input
                        type={'checkbox'}
                        checked={formik.values.rememberMe}
                        id={'login'}
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <label htmlFor={'login'} className={s.loginLabelCheckBox}></label>
                    <span>Remember me</span>
                </div>
                <button type={'submit'} className={s.loginButton} disabled={isDisableButton}>
                    Sign In
                    <span className={s.arrow}>
                        <IoArrowForwardCircleOutline />
                    </span>
                </button>
            </form>
        </div>
    );
};
