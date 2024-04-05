import { FC, ReactNode } from 'react';
import { TogetherTrainingButtons } from '@components/together-trainings-buttons';
import { TogetherTrainingsTitle } from '@components/together-trainings-title';
import { useGetRandomPartners } from '@hooks/use-get-random-partners';

import classes from './base-layout-together.module.css';

type BaseLayoutTogetherPropsType = {
    children: ReactNode;
    setRandomSelection: () => void;
};

export const BaseLayoutTogether: FC<BaseLayoutTogetherPropsType> = ({
    children,
    setRandomSelection,
}) => {
    const getRandomPartners = useGetRandomPartners();

    const randomClickHandler = () => {
        getRandomPartners();
        setRandomSelection();
    };

    const similarClickHandler = () => {
        console.log('similar clicked');
    };

    return (
        <div className={classes.base}>
            <TogetherTrainingsTitle />
            <TogetherTrainingButtons
                clickFirst={randomClickHandler}
                clickSecond={similarClickHandler}
            />
            {children}
        </div>
    );
};
