import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetCredentials } from '@redux/reducers/authSlice';
import { setUserTrainsFromServer, resetUserTrainsFromServer } from '@redux/reducers/calendarSlice';
import { CollapsedContext } from '../../reactContexts/collapse-context';
import { ModalReportContext } from '../../reactContexts/modalReport-context';
import { LoaderStateContext } from '../../reactContexts/loader-context';
import { history } from '@redux/configure-store';
import { Paths } from '../../routes/pathes';
import { ShowFetchDataError } from '@components/showFetchDataError';

import { Col, Row, Typography, Button } from 'antd';
import { HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { CardMainAction } from '@components/cardMainAction';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { primaryLight } from '@utils/constants/colors';
import { useLazyGetAllTrainingsQuery } from '@redux/API/calendarAPI';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { useGetAllUserTrains } from '@hooks/useGetAllUserTrains';

import classes from './cardsSection.module.css';
import classnames from 'classnames';

export const CardsSection: FC = () => {
    const fetchAllTrainings = useGetAllUserTrains();
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    // const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);
    // const { startLoader, stopLoader } = useContext(LoaderStateContext);
    // const [getAllTrainings, { isLoading: isFetchingAllTrains }] = useLazyGetAllTrainingsQuery();

    // const resetUser = () => {
    //     localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
    //     dispatch(resetCredentials());
    //     navigate(Paths.AUTH, { replace: true });
    // };

    // const fetchAllTrainings = async () => {
    //     try {
    //         const trains = await getAllTrainings();
    //         if (trains.data) {
    //             dispatch(setUserTrainsFromServer(trains.data));
    //         }
    //     } catch (error) {
    //         dispatch(resetUserTrainsFromServer());
    //         if (isFetchBaseQueryError(error)) {
    //             if (error.status === 403) {
    //                 resetUser();
    //             } else {
    //                 setNode(<ShowFetchDataError forPage='calendar' />);
    //                 setWidthModal('clamp(328px, 100%, 539px)');
    //                 openModal();
    //             }
    //         }
    //     } finally {
    //         stopLoader();
    //     }
    // };

    // useEffect(() => {
    //     if (isFetchingAllTrains) {
    //         startLoader();
    //     } else {
    //         stopLoader();
    //     }
    // }, [isFetchingAllTrains, startLoader, stopLoader]);

    const { collapsed } = useContext(CollapsedContext);

    const handleMoveToCalendarPage = () => {
        console.log('start');
        fetchAllTrainings().then(() => {
            console.log('end');
            history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
        });
    };

    return (
        <>
            <Row
                className={classnames(classes.title, {
                    [classes.collapsed]: collapsed,
                })}
            >
                <Col>
                    <Typography.Title
                        className={classnames(classes['title__text'], classes.antFixed)}
                    >
                        CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                        фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Typography.Title>
                </Col>
            </Row>
            <Row
                justify='space-between'
                gutter={16}
                className={classnames(classes.cards, classes.antFixed, {
                    [classes.collapsed]: collapsed,
                })}
            >
                <Col lg={8} md={8} xs={24} sm={24}>
                    <CardMainAction
                        body={'Расписать тренировки'}
                        action={
                            <Button
                                block
                                type='text'
                                icon={
                                    <HeartFilled
                                        style={{ color: `${primaryLight.primaryLight9}` }}
                                    />
                                }
                            >
                                Тренировки
                            </Button>
                        }
                    />
                </Col>
                <Col lg={8} md={8} xs={24} sm={24}>
                    <CardMainAction
                        body={'Назначить календарь'}
                        action={
                            <Button
                                onClick={handleMoveToCalendarPage}
                                data-test-id='menu-button-calendar'
                                type='text'
                                block
                                icon={
                                    <CalendarTwoTone
                                        twoToneColor={`${primaryLight.primaryLight9}`}
                                    />
                                }
                            >
                                Календарь
                            </Button>
                        }
                    />
                </Col>
                <Col lg={8} md={8} xs={24} sm={24}>
                    <CardMainAction
                        body={'Заполнить профиль'}
                        action={
                            <Button
                                block
                                type='text'
                                icon={
                                    <ProfileIconComponent
                                        style={{ color: `${primaryLight.primaryLight9}` }}
                                    />
                                }
                            >
                                Профиль
                            </Button>
                        }
                    />
                </Col>
            </Row>
        </>
    );
};
