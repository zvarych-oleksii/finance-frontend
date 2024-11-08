import styles from './status-badge.module.scss';
import React from 'react';
import { Status } from '@/src/lib/types/deposit';

export interface StatusBadgeProps extends React.HTMLProps<HTMLSpanElement> {
    status: Status;
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
    return (
        <span className={`${styles[`badge-${status.toLowerCase()}`]} ${styles['status-badge']} ${className}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
