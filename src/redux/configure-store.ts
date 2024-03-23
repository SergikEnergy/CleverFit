import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { authApi } from './api/auth-api';
import { calendarAPI } from './api/calendar-api';
import { feedbackApi } from './api/feedbacks-api';
import { authReducer } from './reducers/auth-slice';
import { calendarReducer } from './reducers/calendar-slice';
import { feedbackReducer } from './reducers/feedback-slice';
import { userReducer } from './reducers/user-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: {
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [calendarAPI.reducerPath]: calendarAPI.reducer,
        auth: authReducer,
        user: userReducer,
        feedback: feedbackReducer,
        calendar: calendarReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            routerMiddleware,
            authApi.middleware,
            feedbackApi.middleware,
            calendarAPI.middleware,
        ]),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
