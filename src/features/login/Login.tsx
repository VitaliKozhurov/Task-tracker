import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useAppDispatch } from 'app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import { Navigate } from 'react-router-dom';
import { loginTC } from 'features/login/authSlice';

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

export const Login = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, formikHelpers) => {
            dispatch(loginTC(values));
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    }
    return (
        <StyledFormBody>
            <StyledHeader>Sign In</StyledHeader>
            <StyledText>Sign in and start managing your tasks!</StyledText>
            <StyledForm onSubmit={formik.handleSubmit}>
                <StyledInputBody>
                    <StyledInput
                        type={'text'}
                        error={!!(formik.errors.email && formik.touched.email)}
                        success={!formik.errors.password && !!formik.touched.password}
                        {...formik.getFieldProps('email')}
                        placeholder={'Email'}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <StyledInputError>{formik.errors.email}</StyledInputError>
                    )}
                </StyledInputBody>
                <StyledInputBody>
                    <StyledInput
                        type={'password'}
                        error={!!(formik.errors.password && formik.touched.password)}
                        success={!formik.errors.password && !!formik.touched.password}
                        {...formik.getFieldProps('password')}
                        placeholder={'Password'}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <StyledInputError>{formik.errors.password}</StyledInputError>
                    )}
                </StyledInputBody>
                <CheckBoxField>
                    <StyledCheckBox checked={formik.values.rememberMe}>
                        <input type={'checkbox'} {...formik.getFieldProps('rememberMe')} />
                    </StyledCheckBox>
                    <span>Remember me</span>
                </CheckBoxField>
                <StyledButton>Sign In</StyledButton>
            </StyledForm>
        </StyledFormBody>
    );
};

const StyledFormBody = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const StyledHeader = styled.h2`
    font-size: 64px;
    margin: 0;
    color: #fff;
`;
const StyledText = styled.p`
    font-size: 16px;
    color: #fff;
`;
const StyledForm = styled.form`
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 30px;
`;
const StyledInputBody = styled.div`
    position: relative;
`;
const StyledInputError = styled.div`
    position: absolute;
    left: 5px;
    bottom: 9px;
    color: #b00020;
`;
const StyledInput = styled.input<{ error: boolean; success: boolean }>`
    width: 300px;
    border-radius: 10px;
    background: #224957;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    padding: 12px 18px;
    outline: none;
    margin-bottom: 32px;
    border: none;
    outline: ${(props) => (props.error ? 'solid 1px #b00020' : props.success ? 'solid 1px #20df7f' : 'none')};
    box-sizing: border-box;
    position: relative;
`;
const CheckBoxField = styled.div`
    width: 300px;
    text-align: left;

    & span {
        color: #fff;
    }
`;
const StyledCheckBox = styled.label<{ checked: boolean }>`
    padding-left: 30px;
    position: relative;
    cursor: pointer;

    &::before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border-radius: 5px;
        border: 3px solid #3d3a3a;
        background: ${(props) => (props.checked ? '#20df7f' : '#fff')};
    }

    & input {
        display: none;
    }
`;
const StyledButton = styled.button`
    width: 300px;
    font-size: 18px;
    background: #20df7f;
    color: #fff;
    padding: 12px 0;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
    border: none;
    cursor: pointer;
    margin: 20px 0;
`;
