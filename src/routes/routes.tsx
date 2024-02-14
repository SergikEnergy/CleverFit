import { Routes, Route } from 'react-router-dom';

import { Paths } from './pathes';
import { MainPage } from '@pages/main-page';
import { EntryPage } from '@pages/entry-page';

export const routes = (
    <Routes>
        <Route path={Paths.AUTH} element={<EntryPage />} />
        <Route index={true} path={Paths.MAIN_PAGE} element={<MainPage />} />
    </Routes>
);
