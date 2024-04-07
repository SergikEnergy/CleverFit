import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { authApi } from './api/auth-api';
import { feedbackApi } from './api/feedbacks-api';
import { invitationsAPI } from './api/invitations-api';
import { profileAPI } from './api/profile-api';
import { settingsAPI } from './api/settings-api';
import { trainingsAPI } from './api/trainings-api';
import { authReducer } from './reducers/auth-slice';
import { feedbackReducer } from './reducers/feedback-slice';
import { personalInfoReducer } from './reducers/personal-info-slice';
import { tariffInfoReducer } from './reducers/tariff-slice';
import { partnersReducer } from './reducers/trainings-partners-slice';
import { trainingsReducer } from './reducers/trainings-slice';
import { uploadProgressReducer } from './reducers/upload-progress-slice';
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
        [trainingsAPI.reducerPath]: trainingsAPI.reducer,
        [profileAPI.reducerPath]: profileAPI.reducer,
        [settingsAPI.reducerPath]: settingsAPI.reducer,
        [invitationsAPI.reducerPath]: invitationsAPI.reducer,
        auth: authReducer,
        user: userReducer,
        feedback: feedbackReducer,
        personalInfo: personalInfoReducer,
        uploadProgress: uploadProgressReducer,
        tariffsList: tariffInfoReducer,
        userTrainings: trainingsReducer,
        trainingPartners: partnersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            routerMiddleware,
            authApi.middleware,
            feedbackApi.middleware,
            trainingsAPI.middleware,
            profileAPI.middleware,
            settingsAPI.middleware,
            invitationsAPI.middleware,
        ]),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
