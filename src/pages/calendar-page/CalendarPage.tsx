import { FC, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { CalendarDrawer } from '@components/calendarDrawer';
import {
    useLazyGetAllTrainingsQuery,
    useLazyGetAllowedTrainsListQuery,
} from '@redux/API/calendarAPI';
import { ModalReportContext } from '../../reactContexts/modalReport-context';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { DrawerTrainsContext } from '../../reactContexts/drawerTrains-context';
import { ITrainingsResponse } from '@redux/API/api-types';
import { Paths } from '../../routes/pathes';
import { BasePagesLayout } from '@pages/basePagesLayout';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { resetCredentials } from '@redux/reducers/authSlice';
import { ShowFetchDataError } from '@components/showFetchDataError';
import { CalenDarWithData } from '@components/calendarWithData';
import { ErrorShowAllowedTrainsList } from '@components/errorShowAllowedTrainsList';

import classes from './CalendarPage.module.css';

export const CalendarPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const { setNode, openModal, closeModal, setWidthModal } = useContext(ModalReportContext);
    const { updateAllowedTrains } = useContext(DrawerTrainsContext);
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const [
        getAllTrainings,
        {
            data: userTrainsData,
            error: errorGetAllTrains,
            isError: isGettingTrainsError,
            isLoading: isFetchingAllTrains,
        },
    ] = useLazyGetAllTrainingsQuery();

    const [
        getAllowedTrainsList,
        {
            data: allowedTrainsList,
            error: getAllowedTrainsError,
            isError: isGettingAllowedTrainsError,
            isLoading: isFetchingAllowedTrains,
        },
    ] = useLazyGetAllowedTrainsListQuery();

    const handlerToErrorCloseAction = () => {
        setNode(null);
        closeModal();
    };

    const refetchAllowedTrainsList = () => {
        setNode(null);
        closeModal();
        fetchAllowedTrainsList().finally(() => {
            stopLoader();
        });
    };

    const resetUser = () => {
        localStorage.removeItem('userCleverFit');
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    const fetchAllTrainings = async () => {
        try {
            await getAllTrainings();
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    navigate(Paths.MAIN_PAGE, { replace: true });
                    setNode(<ShowFetchDataError forPage='calendar' />);
                    setWidthModal('clamp(328px, 100%, 539px)');
                    openModal();
                }
            }
        } finally {
            stopLoader();
        }
    };

    const fetchAllowedTrainsList = async () => {
        try {
            const trainsAllowed = await getAllowedTrainsList();
            if (Array.isArray(trainsAllowed.data)) {
                updateAllowedTrains(trainsAllowed.data);
            }
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                if (error.status === 403) {
                    resetUser();
                } else {
                    setNode(
                        <ErrorShowAllowedTrainsList
                            status='info'
                            buttonActionClick={refetchAllowedTrainsList}
                            closeClickAction={handlerToErrorCloseAction}
                        />,
                    );
                    setWidthModal('clamp(328px, 100%, 384px)');
                    openModal();
                }
            }
        } finally {
            stopLoader();
        }
    };

    useEffect(() => {
        if (isFetchingAllTrains || isFetchingAllowedTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllTrains, isFetchingAllowedTrains]);

    useEffect(() => {
        if (!token) {
            navigate(Paths.AUTH, { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        if (location.state && location.state.allowRequest) {
            console.log('from main-page allow request');
            fetchAllTrainings().then(() => {
                fetchAllowedTrainsList();
            });
        }
    }, [
        errorGetAllTrains,
        isGettingTrainsError,
        isGettingAllowedTrainsError,
        getAllowedTrainsError,
    ]);
    const userTraining: ITrainingsResponse[] = [
        {
            _id: '1',
            name: 'Ноги',
            date: '2024-03-11T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Присяд',
                    replays: 3,
                    weight: 50,
                    approaches: 10,
                },
                {
                    _id: '2',
                    name: 'Толкание нагрузки',
                    replays: 3,
                    weight: 70,
                    approaches: 10,
                },
            ],
        },
        {
            _id: '2',
            name: 'Руки',
            date: '2024-03-11T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '2',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '3',
            name: 'Ноги',
            date: '2024-03-12T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '4',
            name: 'Руки',
            date: '2024-03-12T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '5',
            name: 'Силовая',
            date: '2024-03-11T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '6',
            name: 'Спина',
            date: '2024-03-11T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '7',
            name: 'Грудь',
            date: '2024-03-11T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '8',
            name: 'Ноги',
            date: '2024-03-13T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Присяд',
                    replays: 3,
                    weight: 50,
                    approaches: 10,
                },
                {
                    _id: '2',
                    name: 'Толкание нагрузки',
                    replays: 3,
                    weight: 70,
                    approaches: 10,
                },
            ],
        },
        {
            _id: '9',
            name: 'Руки',
            date: '2024-03-13T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '10',
            name: 'Силовая',
            date: '2024-03-14T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
        {
            _id: '11',
            name: 'Грудь',
            date: '2024-03-14T09:05:38.759Z',
            isImplementation: false,
            userId: '65b809899adc9e39e3660ae0',
            exercises: [
                {
                    _id: '1',
                    name: 'Упражнение',
                    replays: 1,
                    weight: 0,
                    approaches: 3,
                },
            ],
        },
    ];

    return (
        <>
            <BasePagesLayout isCalendarPage>
                <div className={classes.wrapper} id={'modalWrapperCalendar'}>
                    <CalenDarWithData
                        dataForRender={userTrainsData && allowedTrainsList ? userTraining : []}
                        allowedTrainsList={allowedTrainsList ? allowedTrainsList : []}
                    />
                </div>
            </BasePagesLayout>
            <CalendarDrawer />
        </>
    );
};
