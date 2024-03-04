import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@redux/configure-store';
import { CollapsedContextProvider } from './reactContexts/collapseContextProvider';
import { LoaderContextProvider } from './reactContexts/loaderStateContextProvider';
import { ModalFeedbackContextProvider } from './reactContexts/modalFeedbackContextProvider';
import { App } from './App';

import 'normalize.css';
import 'antd/dist/antd.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <CollapsedContextProvider>
                <LoaderContextProvider>
                    <ModalFeedbackContextProvider>
                        <App />
                    </ModalFeedbackContextProvider>
                </LoaderContextProvider>
            </CollapsedContextProvider>
        </Provider>
    </React.StrictMode>,
);
