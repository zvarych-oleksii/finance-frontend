import React from 'react';
import SearchInput from '@/src/components/molecules/SearchInput';
import { Button } from 'primereact/button';

interface DataTableHeaderProps {
    globalFilterValue: string;
    onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({ globalFilterValue, onGlobalFilterChange, onClear }) => (
    <div className="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={onClear} />
        <SearchInput value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
    </div>
);

export default DataTableHeader;
