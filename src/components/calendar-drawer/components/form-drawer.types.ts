import { ReactNode } from 'react';

export type FormDrawerPropsType = {
    editMode: boolean;
    children?: ReactNode;
};

export type FormFieldType = {
    key: string;
    name: string;
    exercise: string;
    replays: number;
    weight: number;
    approaches: number;
};
export type FormFieldsType = { exercises: FormFieldType[] };
