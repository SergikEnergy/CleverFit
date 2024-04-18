import { FC, useCallback, useState } from 'react';
import { SearchByNameBlock } from '@components/search-by-name-block';
import { useWindowWidth } from '@hooks/use-window-size';
import { usePartnersSelector } from '@redux/selectors';
import { Pagination } from 'antd';

import { useCollapseContext } from '../../../../react-contexts';
import { EmptyPartnersBlock } from '../empty-partners-block';
import { PartnersCards } from '../partners-cards';

export const SimilarPartnersBlock: FC = () => {
    const { similarPartners } = usePartnersSelector();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedName, setSelectedName] = useState('');
    const { collapsed } = useCollapseContext();
    const innerWindowWidth = useWindowWidth();
    let pageSize = 16;

    if (collapsed && innerWindowWidth > 1100) pageSize = 15;
    if (innerWindowWidth < 1100) pageSize = 8;

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
        <div>
            <SearchByNameBlock action={() => {}} changeSelection={changeSelection} />
            <PartnersCards partners={currentPartners} selectedPhrase={selectedName} />
            <Pagination
                style={{ textAlign: 'left', marginTop: 16 }}
                current={currentPage}
                pageSize={pageSize}
                total={filteredPartners.length}
                onChange={onPageChange}
                hideOnSinglePage={true}
                size='small'
            />
        </div>
    );
};
