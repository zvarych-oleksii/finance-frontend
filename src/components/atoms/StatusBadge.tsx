import styles from './status-badge.module.scss';
import React from 'react';
import { Status } from '@/src/lib/types/deposit';

export interface StatusBadgeProps {
    status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <span className={`${styles[`badge-${status.toLowerCase()}`]} ${styles['status-badge']}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
