import { AppDispatch, RootState } from 'app/model/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { authThunks } from 'features/login/model/auth-slice';
import { ResponseType } from 'common/api/api';
import * as Yup from 'yup';
import { LoginRequestType } from 'features/login/api/auth-api';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// login form
export const useLogin = () => {
    const dispatch = useAppDispatch();
    const initialValues: InitialValueFormType = {
        email: '',
        password: '',
        rememberMe: false,
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Incorrect email address').required('This field is required!'),
        password: Yup.string().min(4, 'Must be 4 characters or more').required('This field is required!'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await dispatch(authThunks.login(values)).unwrap();
            } catch (e) {
                const errorResponse = e as ResponseType;
                const { fieldsErrors } = errorResponse;
                fieldsErrors && fieldsErrors.forEach((field) => setFieldError(field.field, field.error));
            }
        },
    });

    return { formik };
};

type InitialValueFormType = Omit<LoginRequestType, 'captcha'>;
