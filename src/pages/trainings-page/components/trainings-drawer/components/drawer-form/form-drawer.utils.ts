import { ExerciseType, NewTrainRequestType } from '@redux/api/api-types';
import { dateFullStringFormat } from '@utils/constants/date-formats';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

import { FormFieldsType, FormFieldType } from './form-drawer.types';

export const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    !current.isSameOrAfter(moment());

export const prepareDataRequest = (values: FormFieldsType) => {
    if (values.trainingsDate && values.trainingsSelect) {
        const isPast = values.trainingsDate.isSameOrBefore(moment());

        const filteredByNameExercises = values.exercises.filter((elem) => elem.exercise);

        const exercises: ExerciseType[] = filteredByNameExercises.map((elem) => ({
            name: elem.exercise,
            replays: elem.replays,
            weight: elem.weight,
            approaches: elem.approaches,
        }));

        const requestBody: NewTrainRequestType = {
            date: values.trainingsDate.format(dateFullStringFormat),
            isImplementation: isPast,
            name: values.trainingsSelect,
            exercises,
        };

        if (values.withPeriodActivate && values.dayWeekSelect) {
            requestBody.parameters = {
                repeat: false,
                period: values.dayWeekSelect,
                jointTraining: false,
                participants: [],
            };
        } else if (values.withPeriodActivate && values.periodSelect) {
            requestBody.parameters = {
                repeat: true,
                period: values.periodSelect,
                jointTraining: false,
                participants: [],
            };
        }

        return requestBody;
    }

    return null;
};

export const finishFormHandler = (
    values: FormFieldsType,
    trainName: string,
    changeExercisesState: (trains: FormFieldType[], name: string) => void,
) => {
    if (values.exercises.length > 0) {
        const filteredResult = values.exercises.filter(
            (elem) => elem.exercise && elem.exercise.length > 0,
        );

        if (filteredResult.length > 0) {
            const trainsCorrected = filteredResult.map((train) => {
                const res: FormFieldType = { ...train };

                if (!train.approaches) res.approaches = 1;
                if (!train.replays) res.replays = 1;
                if (!train.weight) res.weight = 0;
                res.name = train.exercise;

                return res;
            });

            changeExercisesState(trainsCorrected, trainName);
        }
    } else {
        changeExercisesState([], trainName);
    }
};
