import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routes/pathes';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { resetCredentials } from '@redux/reducers/authSlice';
import { BaseMainFeedbacksLayout } from '@pages/baseMainFeedbacks';
import { WithoutComments } from '@components/withoutComments';
import { Feedbacks } from '@components/feedbacks';
import { ModalFeedbackContext } from '../../reactContexts/modalFeedback-context';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { useGetAllFeedbacksQuery } from '@redux/API/feedbacksAPI';
import { ShowFeedbackError } from '@components/showFeedbackError';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';

export const FeedbacksPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const { setNode, openModal, setWidthModal } = useContext(ModalFeedbackContext);
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
                localStorage.removeItem('userCleverFit');
                dispatch(resetCredentials());
                navigate(Paths.AUTH, { replace: true });
            } else {
                setNode(<ShowFeedbackError />);
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
        <BaseMainFeedbacksLayout isFeedbackPage={true}>
            {(!data || (Array.isArray(data) && data.length === 0)) && <WithoutComments />}
            {data && Array.isArray(data) && data.length > 0 && <Feedbacks feedbacks={data} />}
        </BaseMainFeedbacksLayout>
    );
};
