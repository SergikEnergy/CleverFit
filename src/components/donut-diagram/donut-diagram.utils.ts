import { TrainingsResponseType } from '@redux/api/api-types';

export type DiagramDataType = { type: string; percentage: number };

export const createDataForDiagram = (trainings: TrainingsResponseType[]) => {
    if (trainings.length === 0) return null;

    const allExercisesNames = trainings
        .map((elem) => elem.exercises.map((exercise) => exercise.name))
        .flat();

    const namesQuantity: Record<string, number> = allExercisesNames.reduce((acc, curr) => {
        const temp: Record<string, number> = acc;

        if (curr.toLowerCase() in temp) {
            temp[curr.toLowerCase()] += 1;
        } else {
            temp[curr.toLowerCase()] = 1;
        }

        return temp;
    }, {});

    const entries = Object.entries(namesQuantity);
    const summaryValues = entries.reduce((acc, curr) => acc + curr[1], 0);
    const dataForDiagram: DiagramDataType[] = [];

    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        const roundedQuantity = Math.round((100 * value) / summaryValues);
        const firstLetterCapitalizedKey = key.charAt(0).toUpperCase() + key.substring(1);

        dataForDiagram.push({ type: firstLetterCapitalizedKey, percentage: roundedQuantity });
    }

    return dataForDiagram;
};
