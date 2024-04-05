import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useGetAllRandomPartnersQuery } from '@redux/api/trainings-api';
import { setRandomPartners } from '@redux/reducers/trainings-partners-slice';
import { usePartnersSelector } from '@redux/selectors';

import { BaseLayoutTogether } from '../base-layout-together';
import { EmptyPartnersBlock } from '../empty-partners-block';
import { MyPartnersBlock } from '../my-partners-block';
import { RandomPartnersBlock } from '../random-partners-block';

import classes from './together-trainings-content.module.css';

type MyOrRandomPartnersType = 'random' | 'user';

export const TogetherTrainingsContent: FC = () => {
    const dispatch = useAppDispatch();
    const [selection, setSelection] = useState<MyOrRandomPartnersType>('user');
    const { data: randomPartners, isSuccess } = useGetAllRandomPartnersQuery();
    const { userPartners } = usePartnersSelector();

    useEffect(() => {
        if (randomPartners && isSuccess) {
            dispatch(setRandomPartners(randomPartners));
        }
    }, [dispatch, isSuccess, randomPartners]);

    return (
        <div className={classes.content}>
            <BaseLayoutTogether setRandomSelection={() => setSelection('random')}>
                {selection === 'user' && userPartners.length === 0 && <EmptyPartnersBlock />}
                {selection === 'user' && userPartners.length > 0 && <MyPartnersBlock />}
                {selection === 'random' && randomPartners && randomPartners.length > 0 && (
                    <RandomPartnersBlock />
                )}
            </BaseLayoutTogether>
        </div>
    );
};
