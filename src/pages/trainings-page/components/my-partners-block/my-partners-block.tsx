import { FC } from 'react';
import { PartnersShortCard } from '@components/partners-short-card';
import { usePartnersSelector } from '@redux/selectors';
import { sortPartnersByNameAndStatus } from '@utils/sort-status-name-users';

import classes from './my-partners-block.module.css';

export const MyPartnersBlock: FC = () => {
    const { userPartners } = usePartnersSelector();
    const sortedPartners = userPartners.length > 0 ? sortPartnersByNameAndStatus(userPartners) : [];

    return (
        <div className={classes.wrapper}>
            <p className={classes.title}>Мои партнёры по тренировкам</p>
            <div className={classes.cards}>
                {sortedPartners.map((user, index) => (
                    <PartnersShortCard index={index} key={user.id} partner={user} />
                ))}
            </div>
        </div>
    );
};
