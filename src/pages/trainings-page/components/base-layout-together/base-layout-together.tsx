import { FC, ReactNode } from 'react';
import { TogetherTrainingButtons } from '@components/together-trainings-buttons';
import { TogetherTrainingsTitle } from '@components/together-trainings-title';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetRandomPartners } from '@hooks/use-get-random-partners';
import { changeTrainingsMode } from '@redux/reducers/trainings-partners-slice';

import classes from './base-layout-together.module.css';

type BaseLayoutTogetherPropsType = {
    children: ReactNode;
};

export const BaseLayoutTogether: FC<BaseLayoutTogetherPropsType> = ({ children }) => {
    const getRandomPartners = useGetRandomPartners();
    const dispatch = useAppDispatch();

    const randomClickHandler = () => {
        getRandomPartners();
        dispatch(changeTrainingsMode('random'));
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
