import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';

import classes from './App.module.css';

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
