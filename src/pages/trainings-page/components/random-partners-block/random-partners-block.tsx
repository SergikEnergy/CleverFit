import { FC } from 'react';
import { usePartnersSelector } from '@redux/selectors';

import { EmptyPartnersBlock } from '../empty-partners-block';
import { RandomPartnersCards } from '../random-partners-cards/random-partners-cards';

export const RandomPartnersBlock: FC = () => {
    const { randomPartners } = usePartnersSelector();

    if (!randomPartners || (randomPartners && randomPartners.length === 0)) {
        return <EmptyPartnersBlock />;
    }

    return <RandomPartnersCards />;
};
