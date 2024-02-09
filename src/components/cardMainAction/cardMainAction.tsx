import { FC, ReactNode } from 'react';

import classes from './cardMainAction.module.css';

type CardMainActionProps = {
    body: string;
    action: ReactNode;
};

export const CardMainAction: FC<CardMainActionProps> = ({ body, action }) => {
    return (
        <div className={classes.card}>
            <div className={classes.body}>{body}</div>
            <div className={classes.action}>{action}</div>
        </div>
    );
};
