import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';

export const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage />} />
        </Routes>
    </BrowserRouter>
);
