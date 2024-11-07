import React, { useState, useEffect } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import DataTableHeader from '../molecules/DataTableHeader';
import { Deposit } from '@/src/lib/types/deposit';
import { Column } from 'primereact/column';
import StatusBadge from '@/src/components/atoms/StatusBadge';
import { Button } from 'primereact/button';

export interface DepositListProps {
    deposits: Deposit[];
    formatDateTime: (dateTime: Date) => string;
    openDetail: (deposit: Deposit) => void;
    openEdit: (deposit: Deposit) => void;
}

const DepositList: React.FC<DepositListProps> = ({  formatDateTime, deposits, openDetail, openEdit }) => {
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        initFilters();
    }, []);

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            accountNumber: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        setGlobalFilterValue('');
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters((prev) => ({ ...prev, global: { value, matchMode: FilterMatchMode.CONTAINS } }));
        setGlobalFilterValue(value);
    };

    return (
        <div className="card">
            <h5>Deposits</h5>
            <DataTable
                value={deposits}
                rows={8}
                paginator
                responsiveLayout="scroll"
                header={<DataTableHeader globalFilterValue={globalFilterValue} onGlobalFilterChange={onGlobalFilterChange} onClear={initFilters} />}
                filters={filters}
                filterDisplay="menu"
            >
                    <Column field="accountNumber" header="Account Number" sortable style={{ width: '15%' }} />
                    <Column field="telegramUsername" header="Telegram Username" sortable style={{ width: '15%' }} />
                    <Column field="network" header="Network" sortable style={{ width: '15%' }} />
                    <Column field="status" header="Status" body={(data: Deposit) => <StatusBadge status={data.status} />} style={{ width: '15%' }} sortable />
                    <Column field="createdAt" header="Created At" body={(data: Deposit) => formatDateTime(data.createdAt)} style={{ width: '20%' }} sortable />
                    <Column field="updatedAt" header="Updated At" body={(data: Deposit) => formatDateTime(data.updatedAt)} style={{ width: '20%' }} sortable />
                    <Column header="View" body={(data: Deposit) => <Button icon="pi pi-search" text onClick={() => openDetail(data)} />} style={{ width: '5%' }} />
                    <Column header="Edit" body={(data: Deposit) => <Button icon="pi pi-pencil" text onClick={() => openEdit(data)} />} style={{ width: '5%' }} />
            </DataTable>
        </div>
    );
};

export default DepositList;

