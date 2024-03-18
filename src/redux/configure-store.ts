import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authApi } from './API/authAPI';
import { feedbackApi } from './API/feedbacksAPI';
import { authReducer } from './reducers/authSlice';
import { userReducer } from './reducers/userSlice';
import { calendarReducer } from './reducers/calendarSlice';
import { feedbackReducer } from './reducers/feedbackSlice';
import { calendarAPI } from './API/calendarAPI';

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
