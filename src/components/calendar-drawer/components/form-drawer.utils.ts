import { FormFieldsType, FormFieldType } from './form-drawer.types';

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
