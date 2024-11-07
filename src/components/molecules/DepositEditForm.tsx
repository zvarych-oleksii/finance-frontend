import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepositEditFormData, depositEditSchema } from '@/src/lib/schemas/deposit/depositEditSchema';


interface DepositEditFormProps {
    defaultValues: DepositEditFormData;
    onSubmit: (data: DepositEditFormData) => void;
    onCancel: () => void;
    formId?: string;
}

const DepositEditForm: React.FC<DepositEditFormProps> = ({ defaultValues, onSubmit, onCancel, formId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<DepositEditFormData>({
        resolver: zodResolver(depositEditSchema),
        defaultValues,
    });

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        </form>
    );
};

export default DepositEditForm;
