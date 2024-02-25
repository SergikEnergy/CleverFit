export interface IRequest {
    email?: string;
    password?: string;
}

export interface IErrorData {
    statusCode?: number;
    error?: string;
    message?: string;
}

export interface IResponseError {
    status: number;
    data: IErrorData;
}

export interface IRegistrationResponse {
    data: null;
}
export interface ILoginResponse {
    accessToken: string;
}
export interface ICheckEmailResponse {
    email: string;
    message: string;
}

export interface IConfirmRequest {
    email: string;
    code: string;
}

export interface IConfirmResponse {
    email: string;
    message: string;
}

export interface IChangePasswordRequest {
    password: string;
    confirmPassword: string;
}

export interface IChangePasswordResponse {
    message: string;
}
