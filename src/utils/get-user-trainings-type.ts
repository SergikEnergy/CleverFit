import { AllowedTrainResponseType, TrainingsResponseType } from '@redux/api/api-types';

type PopularTrainingType = { key: string; power: number };

export const getUserTrainingsType = (
    trainings: TrainingsResponseType[],
    allowedList: AllowedTrainResponseType[],
) => {
    const popularTrainings: PopularTrainingType[] = [];

    allowedList.forEach((item) => {
        const trainingByName = trainings.filter(
            (elem) => elem.name.toLowerCase() === item.name.toLowerCase(),
        );

        if (trainingByName.length > 0) {
            const data = trainingByName.map((elem) =>
                elem.exercises.reduce((acc, exercise) => {
                    const power = exercise.approaches * exercise.replays * exercise.weight;
                    let temp = acc;

                    temp += power;

                    return temp;
                }, 0),
            );

            if (data && data.length > 0) {
                const hardestExercise = Math.max(...data);

                popularTrainings.push({ key: item.key, power: hardestExercise });
            }
        }
    });

    if (popularTrainings.length > 0) {
        popularTrainings.sort((a, b) => b.power - a.power);
    }

    return popularTrainings.length > 0 ? popularTrainings[0].key : 'legs';
};
