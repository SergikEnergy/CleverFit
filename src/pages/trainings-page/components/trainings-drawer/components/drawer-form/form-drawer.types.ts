import { ReactNode } from 'react';
import { Moment } from 'moment';

export type FormDrawerPropsType = {
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
export type FormFieldsType = {
    exercises: FormFieldType[];
    trainingsSelect?: string;
    trainingsDate?: Moment;
    withPeriodActivate?: boolean;
    periodSelect?: string;
    dayWeekSelect?: string;
};
