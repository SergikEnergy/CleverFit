import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Feedbacks } from '@components/feedbacks';
import { ShowFetchDataError } from '@components/show-fetch-data-error';
import { WithoutComments } from '@components/without-comments';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { BasePagesLayout } from '@pages/base-pages-layout';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/api/api-data';
import { isFetchBaseQueryError } from '@redux/api/errors-catching';
import { useGetAllFeedbacksQuery } from '@redux/api/feedbacks-api';
import { resetCredentials } from '@redux/reducers/auth-slice';
import { useAuthSelector } from '@redux/selectors';

import { LoaderStateContext, ModalReportContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

export const FeedbacksPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token } = useAuthSelector();
    const { setNode, openModal, setWidthModal } = useContext(ModalReportContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { data, isLoading: isQueryLoading, error, isError } = useGetAllFeedbacksQuery();

    useEffect(() => {
        if (isQueryLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isQueryLoading, startLoader, stopLoader]);

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            if (error.status === 403) {
                localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
                dispatch(resetCredentials());
                navigate(Paths.AUTH, { replace: true });
            } else {
                setNode(<ShowFetchDataError forPage='feedback' />);
                setWidthModal('clamp(328px, 100%, 539px)');
                openModal();
            }
        }
    }, [dispatch, error, isError, navigate, openModal, setNode, setWidthModal]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    return (
        <BasePagesLayout isFeedbackPage={true}>
            {(!data || (Array.isArray(data) && data.length === 0)) && <WithoutComments />}
            {data && Array.isArray(data) && data.length > 0 && <Feedbacks feedbacks={data} />}
        </BasePagesLayout>
    );
};
