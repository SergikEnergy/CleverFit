import { FC } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';

import classes from './tarif-card.module.css';
import classnames from 'classnames';

import freeTariffImg from '/images/freeTariff.png';
import proActiveImg from '/images/proActive.png';
import proDisableImg from '/images/proDisable.png';

type TariffCardPropsType = {
    extraClickHandler: () => void;
    tariff?: 'pro' | 'free';
    isPaid?: boolean;
    activateClickHandler?: () => void;
    period?: string;
};

export const TariffCard: FC<TariffCardPropsType> = ({
    tariff = 'free',
    isPaid = false,
    extraClickHandler,
    activateClickHandler,
    period,
}) => {
    let imageSrc = freeTariffImg;

    if (isPaid && tariff === 'pro') imageSrc = proActiveImg;
    if (!isPaid && tariff === 'pro') imageSrc = proDisableImg;

    return (
        <Card
            title={`${tariff.toUpperCase()} tarif`}
            extra={
                <Button type='link' onClick={extraClickHandler}>
                    Подробнее
                </Button>
            }
            bodyStyle={{ padding: 0 }}
            className={classes.card}
        >
            <img src={imageSrc} alt={`${tariff} tariff`} />
            {tariff === 'free' && (
                <div className={classes.status}>
                    <span>активен</span>
                    <CheckOutlined style={{ fontSize: 12 }} />
                </div>
            )}
            {tariff === 'pro' && !isPaid && (
                <div className={classes.status}>
                    <Button
                        type='primary'
                        size='large'
                        className={classes.activate}
                        onClick={activateClickHandler}
                    >
                        Активировать
                    </Button>
                </div>
            )}
            {tariff === 'pro' && isPaid && (
                <div className={classnames(classes.status, classes.paid)}>
                    <span>активен</span>
                    <span>до&nbsp;{period}</span>
                </div>
            )}
        </Card>
    );
};
