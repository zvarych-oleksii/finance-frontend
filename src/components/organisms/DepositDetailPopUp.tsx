// DepositDetailPopUp.tsx
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Deposit, Status } from '@/src/lib/types/deposit'; // Adjust the import path based on your structure
import { Button } from 'primereact/button';
import StatusBadge from '@/src/components/atoms/StatusBadge';
import DepositPopUpHeader from '@/src/components/molecules/DepositPopUpHeader';

interface DepositDetailPopUpProps {
    deposit: Deposit | null;
    visible: boolean;
    onClose: () => void;
    formatDateTime: (date: Date) => string;
}

const DepositDetailPopUp: React.FC<DepositDetailPopUpProps> = ({ deposit, visible, onClose, formatDateTime }) => {
    if (!deposit) return null;

    return (
        <Dialog
            header={<DepositPopUpHeader status={deposit.status} accountNumber={deposit.accountNumber}></DepositPopUpHeader>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
        >
            <div>
                <p><strong>Account Number:</strong> {deposit.accountNumber}</p>
                <p><strong>Telegram Username:</strong> {deposit.telegramUsername}</p>
                <p><strong>Telegram Number:</strong> {deposit.telegramNumber}</p>
                <p><strong>Network:</strong> {deposit.network}</p>
                <p><strong>Transaction ID:</strong> {deposit.TxId}</p>
                <p><strong>Status:</strong> {deposit.status}</p>
                <p><strong>Created At:</strong> {formatDateTime(deposit.createdAt)}</p>
                <p><strong>Updated At:</strong> {formatDateTime(deposit.updatedAt)}</p>
                <p><strong>Assigned To:</strong> {deposit.assignedTo?.username}</p>
            </div>
        </Dialog>
    );
};

export default DepositDetailPopUp;
