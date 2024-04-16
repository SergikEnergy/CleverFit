import { TrainingsResponseType } from '@redux/api/api-types';

type DiagramDataType = { type: string; quantity: number };

export const createDataForDiagram = (trainings: TrainingsResponseType[]) => {
    if (trainings.length === 0) return null;

    const allExercisesNames = trainings
        .map((elem) => elem.exercises.map((exercise) => exercise.name))
        .flat();

    const namesQuantity: Record<string, number> = allExercisesNames.reduce((acc, curr) => {
        const temp: Record<string, number> = acc;

        if (curr in temp) {
            temp[curr] += 1;
        } else {
            temp[curr] = 1;
        }

        return temp;
    }, {});

    const entries = Object.entries(namesQuantity);
    const summaryValues = entries.reduce((acc, curr) => acc + curr[1], 0);
    const dataForDiagram: DiagramDataType[] = [];

    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        const roundedQuantity = Math.round((100 * value) / summaryValues);

        dataForDiagram.push({ type: key, quantity: roundedQuantity });
    }

    return dataForDiagram;
};
