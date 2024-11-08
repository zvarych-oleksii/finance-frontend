import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepositEditFormData, depositEditSchema } from '@/src/lib/schemas/deposit/depositEditSchema';
import { Deposit } from '@/src/lib/types/deposit';
import { InputText } from 'primereact/inputtext';

interface DepositEditFormProps {
    depositToEdit: Deposit;
    onSubmit: (data: DepositEditFormData) => void;
    formId?: string;
    submitRef: any
}

const DepositEditForm: React.FC<DepositEditFormProps> = ({submitRef, depositToEdit, onSubmit, formId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<DepositEditFormData>({
        resolver: zodResolver(depositEditSchema),
        defaultValues: {
            telegramUsername: depositToEdit.telegramUsername,
            telegramNumber: depositToEdit.telegramNumber,
            network: depositToEdit.network,
        },
    });

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
            <div className="p-fluid">

                <div className="field p-fluid">
                    <label htmlFor="telegramUsername">Telegram Username</label>
                    <InputText id="telegramUsername" type="text" className={errors.telegramUsername ? 'p-invalid' : ''} {...register('telegramUsername', { required: 'Telegram Username is required' })} />
                    {errors.telegramUsername && <small className="p-error">{errors.telegramUsername.message}</small>}
                </div>

                <div className="field p-fluid">
                    <label htmlFor="telegramNumber">Telegram Number</label>
                    <InputText id="telegramNumber" type="text" className={errors.telegramNumber ? 'p-invalid' : ''} {...register('telegramNumber', { required: 'Telegram Number is required' })} />
                    {errors.telegramNumber && <small className="p-error">{errors.telegramNumber.message}</small>}
                </div>

                <div className="field p-fluid">
                    <label htmlFor="network">Network</label>
                    <InputText id="network" type="text" className={errors.network ? 'p-invalid' : ''} {...register('network', { required: 'Network is required' })} />
                    {errors.network && <small className="p-error">{errors.network.message}</small>}
                </div>
            </div>

            <button ref={submitRef} style={{ display: 'none' }} type="submit"></button>
        </form>
    );
};

export default DepositEditForm;
