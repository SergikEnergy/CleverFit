import { FC } from 'react';
import { TogetherTrainingButtons } from '@components/together-trainings-buttons';
import { TogetherTrainingsTitle } from '@components/together-trainings-title';

import { MyPartnersBlock } from '../my-partners-block';

import classes from './empty-together-trainings.module.css';

export const EmptyTogetherTrainings: FC = () => {
    const randomClickHandler = () => {
        console.log('random clicked');
    };

    const similarClickHandler = () => {
        console.log('similar clicked');
    };

    return (
        <div className={classes.empty}>
            <TogetherTrainingsTitle />
            <TogetherTrainingButtons
                clickFirst={randomClickHandler}
                clickSecond={similarClickHandler}
            />
            <MyPartnersBlock />
        </div>
    );
};
