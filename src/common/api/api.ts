import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export type ResponseType<T = {}> = {
    resultCode: number;
    messages: string[];
    data: T;
    fieldsErrors: FieldErrorType[];
};

export const ResultCode = {
    SUCCESS: 0,
    ERROR: 1,
    CAPTCHA: 10,
} as const;

type FieldErrorType = {
    error: string;
    field: string;
};
