import { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarTwoTone, HeartFilled } from '@ant-design/icons';
import { CardMainAction } from '@components/card-main-action';
import { ProfileIconComponent } from '@components/custom-icons/profile-icon';
import { useGetAllUserTrainings } from '@hooks/use-get-all-user-trainings';
import { history } from '@redux/configure-store';
import { primaryLight } from '@utils/constants/colors';
import { Button, Col, Row, Typography } from 'antd';
import classnames from 'classnames';

import { DATA_TEST_ID } from '../../data/data-test-ids';
import { useCollapseContext } from '../../react-contexts';
import { Paths } from '../../routes/pathes';

import classes from './cards-section.module.css';

export const CardsSection: FC = () => {
    const navigate = useNavigate();
    const fetchAllTrainings = useGetAllUserTrainings();

    const handleCalendarPageClick = () => {
        fetchAllTrainings();
        history.push(Paths.CALENDAR_PAGE, { allowRequest: true });
    };

    const handleMoveToTrainingsPage = async () => {
        const result = await fetchAllTrainings();

        console.log(result);

        if (result) {
            history.push(Paths.TRAININGS_PAGE, { allowRequest: true });
        }
    };

    const handleMoveToProfilePage = () => navigate(Paths.PROFILE_PAGE, { replace: true });

    const { collapsed } = useCollapseContext();

    return (
        <Fragment>
            <Row
                className={classnames(classes.title, {
                    [classes.collapsed]: collapsed,
                })}
            >
                <Col>
                    <Typography.Title className={classnames(classes.title__text, classes.antFixed)}>
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
                        body='Расписать тренировки'
                        action={
                            <Button
                                block={true}
                                onClick={handleMoveToTrainingsPage}
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
                        body='Назначить календарь'
                        action={
                            <Button
                                onClick={handleCalendarPageClick}
                                data-test-id='menu-button-calendar'
                                type='text'
                                block={true}
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
                        body='Заполнить профиль'
                        action={
                            <Button
                                data-test-id={DATA_TEST_ID.menuButtonProfile}
                                block={true}
                                onClick={handleMoveToProfilePage}
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
        </Fragment>
    );
};
