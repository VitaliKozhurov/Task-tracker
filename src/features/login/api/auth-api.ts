import { AxiosResponse } from 'axios';
import { instance, ResponseType } from 'common/api/api';

export class AuthApi {
    static authMe() {
        return instance.get<ResponseType<AuthResponseType>>('auth/me');
    }

    static login(data: LoginRequestType) {
        return instance.post<
            ResponseType<LoginResponseType>,
            AxiosResponse<ResponseType<LoginResponseType>>,
            LoginRequestType
        >('auth/login', data);
    }

    static logout() {
        return instance.delete<ResponseType>('auth/login');
    }

    static getCaptcha() {
        return instance.get<{ url: string }>('security/get-captcha-url');
    }
}
type AuthResponseType = {
    id: number;
    email: string;
    login: string;
};
export type LoginRequestType = {
    email: string;
    password: string;
    rememberMe?: boolean;
    captcha?: string;
};
type LoginResponseType = {
    userId: number;
};
