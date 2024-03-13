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

export interface IFeedbackResponse {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
}

export interface IPostFeedbackRequest {
    message: string;
    rating: number;
}

export interface ITrainingsResponse {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters?: IParametersTraining;
    exercises: IExercise[];
}

export interface IParametersTraining {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
}

export interface IExercise {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
}

export interface IAllowedTrainResponse {
    name: 'string';
    key: 'string';
}
