import { FC, useContext } from 'react';
import { CollapsedContext } from '../../reactContexts/collapse-context';

import { Col, Row, Typography, Button } from 'antd';
import { HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { CardMainAction } from '@components/cardMainAction';
import { ProfileIconComponent } from '@components/customIcon/profileIcon';
import { primaryLight } from '@utils/constants/colors';

import classes from './cardsSection.module.css';
import classnames from 'classnames';

export const CardsSection: FC = () => {
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
