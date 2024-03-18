import { FC, useContext } from 'react';
import { TrainingsResponseType } from '@redux/API/api-types';
import { DrawerTrainsContext } from '../../../reactContexts';
import { Badge, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getColorTrainByName } from '@components/calendarWithData/CalendarWithData.utils';

import classes from './TrainWithBadge.module.css';
import classnames from 'classnames';

type TrainWithBadgePropsType = {
    train: TrainingsResponseType;
    index: number;
    changeFlowToEdit: () => void;
};

export const TrainWithBadge: FC<TrainWithBadgePropsType> = ({ train, changeFlowToEdit, index }) => {
    const { changeEditedTrainData } = useContext(DrawerTrainsContext);
    const handleEditClick = () => {
        if (!train.isImplementation) {
            changeEditedTrainData(train._id, train.name);
            changeFlowToEdit();
        }
    };

    return (
        <li className={classes.train}>
            <Badge
                className={classnames(classes.badge, {
                    [classes.implemented]: train.isImplementation,
                })}
                color={getColorTrainByName(train.name)}
                text={train.name}
            />

            <Button
                type='text'
                onClick={handleEditClick}
                className={classnames(classes.highlighter, {
                    [classes.implemented]: train.isImplementation,
                })}
                disabled={train.isImplementation ? true : false}
                data-test-id={`modal-update-training-edit-button${index}`}
                icon={
                    <EditOutlined
                        className={classes['edit__icon']}
                        disabled={train.isImplementation ? true : false}
                        style={{
                            textAlign: 'right',
                            color: `${train.isImplementation ? 'gray' : 'blue'}`,
                        }}
                    />
                }
            />
        </li>
    );
};
