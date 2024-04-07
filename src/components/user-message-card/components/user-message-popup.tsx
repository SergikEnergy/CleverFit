import { FC, RefObject, useState } from 'react';
import { TrainingsResponseType } from '@redux/api/api-types';
import { Button, Popover } from 'antd';

import { CustomOverlayMessage } from './custom-overlay-message';

import classes from './user-message-popup.module.css';

type TrainingsInfoPopoverPropsType = {
    training: TrainingsResponseType;
    parentRef: RefObject<HTMLDivElement>;
};

export const UserMessagePopover: FC<TrainingsInfoPopoverPropsType> = ({ training, parentRef }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleOpenPopover = () => setIsVisible(true);

    return (
        <Popover
            showArrow={false}
            align={{ offset: [0, -32] }}
            destroyTooltipOnHide={true}
            overlayStyle={{ boxShadow: '0px 2px 8px 0px #00000026', width: 312, padding: 0 }}
            overlayInnerStyle={{ padding: 0, width: '100%' }}
            getPopupContainer={() => parentRef.current as HTMLDivElement}
            className={classes.popover}
            content={
                <CustomOverlayMessage
                    key={`${training.date}${training.name}-message`}
                    training={training}
                    closeAction={() => setIsVisible(false)}
                />
            }
            trigger='click'
            open={isVisible}
            placement='bottomRight'
            overlayClassName={classes.overlay}
            zIndex={3}
        >
            <Button
                onClick={handleOpenPopover}
                type='link'
                className={classes.link}
                style={{ paddingLeft: 0, textAlign: 'left' }}
            >
                Посмотреть детали тренировки
            </Button>
        </Popover>
    );
};
