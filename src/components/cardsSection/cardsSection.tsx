import { FC } from 'react';
import { Col, Row, Typography, Button } from 'antd';
import { HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { CardMainAction } from '@components/cardMainAction';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { primaryLight } from '@utils/constants/colors';

import classes from './cardsSection.module.css';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const CardsSection: FC = () => {
    const collapsed = useAppSelector((state) => state.collapse.collapsed);
    return (
        <>
            <Row className={`${classes.title} ${collapsed ? `${classes.collapsed}` : ''}`}>
                <Col>
                    <Typography.Title className={classes['title__text']}>
                        CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                        фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                    </Typography.Title>
                </Col>
            </Row>
            <Row
                justify='space-between'
                gutter={16}
                className={`${classes.cards} ${collapsed ? `${classes.collapsed}` : ''}`}
            >
                <Col span={8}>
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
                <Col span={8}>
                    <CardMainAction
                        body={'Назначить календарь'}
                        action={
                            <Button
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
                <Col span={8}>
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
