export type RequestType = {
    email?: string;
    password?: string;
};

export type ErrorDataType = {
    statusCode?: number;
    error?: string;
    message?: string;
};

export type ResponseErrorType = {
    status: number;
    data: ErrorDataType;
};

export type RegistrationResponseType = {
    data: null;
};
export type LoginResponseType = {
    accessToken: string;
};
export type CheckEmailResponseType = {
    email: string;
    message: string;
};

export type ConfirmRequestType = {
    email: string;
    code: string;
};

export type IConfirmResponseType = ConfirmRequestType;

export type ChangePasswordRequestType = {
    password: string;
    confirmPassword: string;
};

export type ChangePasswordResponseType = Pick<CheckEmailResponseType, 'message'>;

export type FeedbackResponseType = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type PostFeedbackRequestType = {
    message: string;
    rating: number;
};

export type TrainingsResponseType = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters?: ParametersTrainingType;
    exercises: ExerciseType[];
};

export type ParametersTrainingType = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type ExerciseType = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
};

export type AllowedTrainResponseType = {
    name: 'string';
    key: 'string';
};

export type NewTrainRequestType = Pick<
    TrainingsResponseType,
    'date' | 'exercises' | 'name' | 'isImplementation'
>;

export type ChangeFutureTrainRequestType = { body: NewTrainRequestType; id: string };
