import { FC, useCallback, useState } from 'react';
import { SearchByNameBlock } from '@components/search-by-name-block';
import { usePartnersSelector } from '@redux/selectors';
import { Pagination } from 'antd';

import { EmptyPartnersBlock } from '../empty-partners-block';
import { PartnersCards } from '../partners-cards';

import classes from './similar-partners-block.module.css';

export const SimilarPartnersBlock: FC = () => {
    const { similarPartners } = usePartnersSelector();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedName, setSelectedName] = useState('');
    const pageSize = 16;

    const filteredPartners = similarPartners.filter((partner) =>
        selectedName
            ? partner.name.toLowerCase().trim().includes(selectedName.toLowerCase().trim())
            : true,
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPartners = filteredPartners.slice(startIndex, endIndex);

    const onPageChange = (page: number) => setCurrentPage(page);

    const changeSelection = useCallback((selected: string) => {
        setSelectedName(selected);
    }, []);

    if (!similarPartners || (similarPartners && similarPartners.length === 0)) {
        return <EmptyPartnersBlock />;
    }

    return (
        <div className={classes.wrapper}>
            <SearchByNameBlock action={() => {}} changeSelection={changeSelection} />
            <PartnersCards partners={currentPartners} selectedPhrase={selectedName} />
            <Pagination
                style={{ textAlign: 'left', marginTop: 16 }}
                className={classes.pagination}
                current={currentPage}
                pageSize={16}
                total={filteredPartners.length}
                onChange={onPageChange}
                hideOnSinglePage={true}
                size='small'
            />
        </div>
    );
};
