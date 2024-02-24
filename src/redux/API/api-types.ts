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
