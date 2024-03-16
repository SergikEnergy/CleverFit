import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/pathes';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { resetCredentials } from '@redux/reducers/authSlice';
import { BasePagesLayout } from '@pages/basePagesLayout';
import { WithoutComments } from '@components/withoutComments';
import { Feedbacks } from '@components/feedbacks';
import { ModalReportContext, LoaderStateContext } from '../../reactContexts';
import { useGetAllFeedbacksQuery } from '@redux/API/feedbacksAPI';
import { ShowFetchDataError } from '@components/showFetchDataError';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';

export const FeedbacksPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const { setNode, openModal, setWidthModal } = useContext(ModalReportContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { data, isLoading: isQueryLoading, error, isError } = useGetAllFeedbacksQuery();

    useEffect(() => {
        if (isQueryLoading) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isQueryLoading]);

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
    }, [error, isError]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    return (
        <BasePagesLayout isFeedbackPage>
            {(!data || (Array.isArray(data) && data.length === 0)) && <WithoutComments />}
            {data && Array.isArray(data) && data.length > 0 && <Feedbacks feedbacks={data} />}
        </BasePagesLayout>
    );
};
