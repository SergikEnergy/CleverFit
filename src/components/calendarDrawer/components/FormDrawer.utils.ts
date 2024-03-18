import { FormFieldsType, FormFieldType } from './FormDrawer.types';

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
                if (!train.approaches) train.approaches = 1;
                if (!train.replays) train.replays = 1;
                if (!train.weight) train.weight = 0;
                train.name = train.exercise;
                return train;
            });
            changeExercisesState(trainsCorrected, trainName);
        }
    } else {
        changeExercisesState([], trainName);
    }
};
