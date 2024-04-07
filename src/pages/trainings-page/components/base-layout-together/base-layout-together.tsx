import { FC, ReactNode } from 'react';
import { TogetherTrainingButtons } from '@components/together-trainings-buttons';
import { TogetherTrainingsTitle } from '@components/together-trainings-title';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetRandomPartners } from '@hooks/use-get-random-partners';
import { useGetSimilarPartners } from '@hooks/use-get-similar-partners';
import { changeTrainingsMode } from '@redux/reducers/trainings-partners-slice';
import { usePartnersSelector } from '@redux/selectors';

import classes from './base-layout-together.module.css';

type BaseLayoutTogetherPropsType = {
    children: ReactNode;
};

export const BaseLayoutTogether: FC<BaseLayoutTogetherPropsType> = ({ children }) => {
    const { trainingType } = usePartnersSelector();
    const getRandomPartners = useGetRandomPartners();
    const getSimilarPartners = useGetSimilarPartners();
    const dispatch = useAppDispatch();

    const randomClickHandler = async () => {
        await getRandomPartners();
        dispatch(changeTrainingsMode('random'));
    };

    const similarClickHandler = async () => {
        await getSimilarPartners({ trainingType });
        dispatch(changeTrainingsMode('similar'));
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
