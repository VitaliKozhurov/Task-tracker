import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { Navigate } from 'react-router-dom';
import { authThunks } from 'features/login/authSlice';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import s from 'features/login/Login.module.scss';
import { ResponseType } from 'common/api/api';

type InitialValueFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
};
const initialValues: InitialValueFormType = {
    email: '',
    password: '',
    rememberMe: false,
};
const validationSchema = Yup.object({
    email: Yup.string().email('Incorrect email address').required('This field is required!'),
    password: Yup.string().min(4, 'Must be 4 characters or more').required('This field is required!'),
});
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
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                const loginResponse = await dispatch(authThunks.login(values)).unwrap();
            } catch (e) {
                const errorResponse = e as ResponseType;
                const { fieldsErrors } = errorResponse;
                fieldsErrors && fieldsErrors.forEach((field) => setFieldError(field.field, field.error));
            }
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    }
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
                <button type={'submit'} className={s.loginButton}>
                    Sign In
                </button>
            </form>
        </div>
    );
};
