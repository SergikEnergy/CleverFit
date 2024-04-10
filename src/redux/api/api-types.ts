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
    isImplementation?: boolean;
    userId: string;
    exercises: ExerciseType[];
    parameters?: ParametersTrainingType;
    id?: string;
};

export type ParametersTrainingType = {
    repeat: boolean;
    period?: number;
    jointTraining?: boolean;
    participants?: string[];
};

export type ExerciseType = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
    _id?: string;
};

export type AllowedTrainResponseType = {
    name: 'string';
    key: 'string';
};

export type NewTrainRequestType = Pick<
    TrainingsResponseType,
    'date' | 'exercises' | 'name' | 'isImplementation' | 'parameters'
>;

export type ChangeFutureTrainRequestType = { body: NewTrainRequestType; id: string };

export type ResponseUserInfoType = {
    email: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    tariff?: {
        tariffId: string;
        expired: string;
    };
};

export type ImageUpdateResponseType = {
    name: string;
    url: string;
};

export type ImageUpdateRequestType = {
    imageFile: File;
};

export type RequestUserInfoType = {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
};

export type TariffResponseType = {
    _id: string;
    name: string;
    periods: [
        {
            text: string;
            cost: number;
            days: number;
        },
    ];
};

export type RequestChangeTariffType = {
    tariffId: string;
    days: number;
};

export type PartnersResponseType = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: InviteStatusType | null;
};
export type QueryPartnersTrainingType = {
    trainingType: string;
};

export type InviteStatusType = 'accepted' | 'rejected' | 'pending' | null;

export type RequestPartnersByInterestType = 'random' | 'similar';

export type UserShortDataType = {
    _id: string;
    firstName: string | null;
    lastName: string | null;
    imageSrc: string | null;
};

export type InvitationResponseType = {
    _id: string;
    from: UserShortDataType;
    training: TrainingsResponseType;
    status: InviteStatusType;
    createdAt: string;
    to: UserShortDataType;
};

export type InvitationRequestType = {
    to: string;
    trainingId: string;
};

export type InvitationAnswerRequestType = {
    id: string;
    status: InviteStatusType;
};

export type AllInvitationsResponseType = Omit<InvitationResponseType, 'to'>;
