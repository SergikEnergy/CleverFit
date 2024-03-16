import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderStateContext, CollapsedContext, ModalReportContext } from '../../reactContexts';
import { useGetAllTrainingsQuery, useLazyGetAllTrainingsQuery } from '@redux/API/calendarAPI';
import { isFetchBaseQueryError } from '@redux/API/errorsCatching';
import { history } from '@redux/configure-store';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { resetCredentials } from '@redux/reducers/authSlice';
import { LOCAL_STORAGE_AUTH_PARAM } from '@redux/API/api-data';
import { Paths } from '../../routes/pathes';

import { Col, Row, Typography, Button } from 'antd';
import { HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { CardMainAction } from '@components/cardMainAction';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { ShowFetchDataError } from '@components/showFetchDataError';
import { primaryLight } from '@utils/constants/colors';
import { useGetAllUserTrainings } from '@hooks/useGetAllUserTrainings';

import classes from './cardsSection.module.css';
import classnames from 'classnames';

export const CardsSection: FC = () => {
    const fetchAllTrainings = useGetAllUserTrainings();
    // const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    // const { startLoader, stopLoader } = useContext(LoaderStateContext);
    // const { setNode, setWidthModal, openModal } = useContext(ModalReportContext);

    // const [getAllTrainings, { isLoading }] = useLazyGetAllTrainingsQuery();

    // const resetUser = () => {
    //     localStorage.removeItem(LOCAL_STORAGE_AUTH_PARAM);
    //     dispatch(resetCredentials());
    //     navigate(Paths.AUTH, { replace: true });
    // };

    // useEffect(() => {
    //     isLoading ? startLoader() : stopLoader();
    // }, [isLoading, startLoader, stopLoader]);

    // const handleGetTrainingsError = (error: unknown) => {
    //     if (isFetchBaseQueryError(error) && error.status === 403) {
    //         resetUser();
    //     } else {
    //         setNode(<ShowFetchDataError forPage='calendar' />);
    //         setWidthModal('clamp(328px, 100%, 539px)');
    //         openModal();
    //     }
    // };

    // const fetchAllTrainings = async () => {
    //     try {
    //         await getAllTrainings().unwrap();
    //         history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
    //     } catch (error) {
    //         handleGetTrainingsError(error);
    //     } finally {
    //         stopLoader();
    //     }
    // };

    const handleCalendarPageClick = () => {
        fetchAllTrainings();
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
