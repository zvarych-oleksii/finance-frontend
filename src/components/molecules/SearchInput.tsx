import React from 'react';
import { InputText } from 'primereact/inputtext';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
    <span className="p-input-icon-left">
    <i className="pi pi-search" />
    <InputText value={value} onChange={onChange} placeholder={placeholder} />
</span>
);

export default SearchInput;
