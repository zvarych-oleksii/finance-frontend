import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import DepositEditForm from '@/src/components/molecules/DepositEditForm';
import { Deposit } from '@/src/lib/types/deposit';
import { Button } from 'primereact/button';
import { DepositEditFormData } from '@/src/lib/schemas/deposit/depositEditSchema';
import DepositPopUpHeader from '@/src/components/molecules/DepositPopUpHeader';

interface DepositEditPopUpProps {
    deposit: Deposit;
    visible: boolean;
    onClose: () => void;
    onSave: (updatedDeposit: Deposit) => void;
}

const DepositEditPopUp: React.FC<DepositEditPopUpProps> = ({ deposit, visible, onClose, onSave }) => {
    const handleFormSubmit = (data: DepositEditFormData) => {
        onSave({ ...deposit, ...data });
        onClose();
    };

    const submitRef = useRef<HTMLButtonElement | null >(null);

    const footerContent = (
        <span className="p-buttonset flex">
            <Button label="Cancel" icon="pi pi-times" onClick={onClose} />
            <Button label="Save" icon="pi pi-check" onClick={() => submitRef.current && submitRef.current.click()}/>
        </span>
    );

    return (
        <Dialog
            header={<DepositPopUpHeader status={deposit.status} accountNumber={deposit.accountNumber}></DepositPopUpHeader>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
            footer={footerContent}>
            <DepositEditForm submitRef={submitRef} depositToEdit={deposit} onSubmit={handleFormSubmit} formId="deposit-edit-form" />
        </Dialog>
    );
};

export default DepositEditPopUp;
