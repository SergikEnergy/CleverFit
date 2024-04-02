import { FC, useEffect, useRef, useState } from 'react';
import { getColorTrainByName } from '@components/calendar-with-data/calendar-with-data.utils';
import { dateDayMonthYearDotFormat } from '@utils/constants/date-formats';
import { Badge, Drawer } from 'antd';

import { useCalendarTrainingsDrawerContext } from '../../react-contexts';

import { DrawerHeader } from './components/drawer-header';
import { FormDrawer } from './components/form-drawer';

import classes from './calendar-drawer.module.css';

export const CalendarDrawer: FC = () => {
    const { isDrawerOpen, drawerTitle, closeDrawer, trainName, date, editedTrainID } =
        useCalendarTrainingsDrawerContext();
    const [drawerWidth, setDrawerWidth] = useState(408);
    const submitRef = useRef<HTMLButtonElement | null>(null);

    const resizeChangeWidth = () => {
        if (window.innerWidth < 550) {
            setDrawerWidth(360);
        }
    };

    useEffect(() => {
        resizeChangeWidth();
        window.addEventListener('resize', resizeChangeWidth);

        return () => {
            window.removeEventListener('resize', resizeChangeWidth);
        };
    }, []);

    const closeDrawerWithCheckingData = () => {
        closeDrawer();
        if (submitRef.current) {
            submitRef.current.click();
        }
    };

    return (
        <Drawer
            className={classes.drawer}
            data-test-id='modal-drawer-right'
            title={<DrawerHeader title={drawerTitle} closeDrawer={closeDrawerWithCheckingData} />}
            width={drawerWidth}
            maskClosable={false}
            closeIcon={null}
            open={isDrawerOpen}
            bodyStyle={{ padding: '24px 32px' }}
        >
            <div className={classes.subtitle}>
                <Badge
                    className={classes.badge}
                    color={getColorTrainByName(trainName)}
                    text={trainName}
                />
                <div className={classes.date}>{date?.format(dateDayMonthYearDotFormat)}</div>
            </div>
            {isDrawerOpen && <FormDrawer editMode={!!editedTrainID} ref={submitRef} />}
        </Drawer>
    );
};
