import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderStateContext, CollapsedContext, ModalReportContext } from '../../reactContexts';
import { Col, Row, Typography, Button } from 'antd';
import { HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { CardMainAction } from '@components/cardMainAction';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { primaryLight } from '@utils/constants/colors';
import { useGetAllUserTrainings } from '@hooks/useGetAllUserTrainings';

import classes from './cardsSection.module.css';
import classnames from 'classnames';

export const CardsSection: FC = () => {
    const navigate = useNavigate();
    const { startLoader, stopLoader } = useContext(LoaderStateContext);
    const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    const [getAllTrainings, { data, isLoading: isFetchingAllTrains }] =
        useLazyGetAllTrainingsQuery();

    useEffect(() => {
        if (data && !isFetchBaseQueryError(data)) {
            dispatch(setUserTrainsFromServer(data));
        }
    }, [data]);

    const resetUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
        dispatch(resetCredentials());
        navigate(Paths.AUTH, { replace: true });
    };

    useEffect(() => {
        if (isFetchingAllTrains) {
            startLoader();
        } else {
            stopLoader();
        }
    }, [isFetchingAllTrains, startLoader, stopLoader]);

    const handleGetTrainingsError = (error: unknown) => {
        dispatch(resetUserTrainsFromServer());
        if (isFetchBaseQueryError(error) && error.status === 403) {
            resetUser();
        } else {
            setNode(<ShowFetchDataError forPage='calendar' />);
            setWidthModal('clamp(328px, 100%, 539px)');
            openModal();
        }
    };

    const fetchAllTrainings = async () => {
        try {
            const trainings = await getAllTrainings();
            if (trainings.data) {
                dispatch(setUserTrainsFromServer(trainings.data));
                history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
            } else if (isFetchBaseQueryError(trainings)) {
                handleGetTrainingsError(trainings);
            }
        } catch (error) {
            handleGetTrainingsError(error);
        } finally {
            stopLoader();
        }
    };
    return fetchAllTrainings;

    const getAllUserTrainings = useGetAllUserTrainings();

    const handleCalendarPageClick = async () => {
        await getAllUserTrainings();
    };

    const { collapsed } = useContext(CollapsedContext);

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
                                onClick={handleCalendarPageClick}
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
