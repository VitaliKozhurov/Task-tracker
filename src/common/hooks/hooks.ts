import { AppDispatch, RootState } from 'app/model/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { authThunks } from 'features/login/model/auth-slice';
import * as Yup from 'yup';
import { LoginRequestType } from 'features/login/api/auth-api';
import { RejectValueType } from 'common/utils/create-app-async-thunk';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// login form
export const useLogin = (captcha: string) => {
    const dispatch = useAppDispatch();

    const initialValues: LoginRequestType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Incorrect email address').required('This field is required!'),
        password: Yup.string().min(4, 'Must be 4 characters or more').required('This field is required!'),
        captcha: !!captcha ? Yup.string().required('This field is required!') : Yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await dispatch(authThunks.login(values)).unwrap();
            } catch (e) {
                const errorResponse = e as RejectValueType;
                const { fieldsErrors } = errorResponse.data;
                fieldsErrors && fieldsErrors.forEach((field) => setFieldError(field.field, field.error));
            }
        },
    });

    return { formik };
};
