import { FC } from 'react';
import { useUserTrainingsSelector } from '@redux/selectors';
import { dateFullFormatWithDash } from '@utils/constants/date-formats';
import classnames from 'classnames';
import moment, { Moment } from 'moment';

import classes from './form-drawer-cell-render.module.css';

type DataCellRenderType = {
    date: Moment;
};

export const DataCellRender: FC<DataCellRenderType> = ({ date }) => {
    const { userTrainings } = useUserTrainingsSelector();
    const dateToString = date.format(dateFullFormatWithDash);
    const existingDates = userTrainings.map((training) => training.date);
    const isToday = moment().format(dateFullFormatWithDash) === dateToString;
    const isExistingTrainingsNotToday = existingDates.includes(dateToString) && !isToday;

    return (
        <div
            className={classnames(classes.cell, {
                [classes.existing]: isExistingTrainingsNotToday,
                [classes.today]: isToday,
            })}
        >
            {date.date()}
        </div>
    );
};
