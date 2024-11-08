'use client';

import React, { useEffect, useState } from 'react';
import DepositList from '@/src/components/organisms/DepositList';
import DepositDetailPopUp from '@/src/components/organisms/DepositDetailPopUp';
import DepositEditPopUp from '@/src/components/organisms/DepositEditPopUp';
import { Deposit } from '@/src/lib/types/deposit';
import { depositService } from '@/src/lib/services/DepositService';
import authService from '@/src/lib/services/AuthService';

const Dashboard = () => {
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const depositsData = await depositService.getAllDeposits();
                await authService.fetchMe();
                setDeposits(depositsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const formatDateTime = (dateTime: Date) => new Date(dateTime).toLocaleString();

    const openDetail = (deposit: Deposit) => {
        setSelectedDeposit(deposit);
        setDetailVisible(true);
    };

    const openEdit = (deposit: Deposit) => {
        setSelectedDeposit(deposit);
        setEditVisible(true);
    };

    const closeDetail = () => {
        setDetailVisible(false);
        setSelectedDeposit(null);
    };

    const closeEdit = () => {
        setEditVisible(false);
        setSelectedDeposit(null);
    };

    const handleSaveEdit = (updatedDeposit: Deposit) => {
        setDeposits((prevDeposits) =>
            prevDeposits.map((deposit) => (deposit.id === updatedDeposit.id ? updatedDeposit : deposit))
        );
        depositService.updateDepositById(updatedDeposit.id, updatedDeposit)
            .then()
        closeEdit();
    };

    return (
        <div className="grid">
            <div className="col-24 xl:col-12">
                <DepositList
                    formatDateTime={formatDateTime}
                    deposits={deposits}
                    openEdit={openEdit}
                    openDetail={openDetail}
                />
            </div>

            {selectedDeposit && detailVisible && (
                <DepositDetailPopUp
                    deposit={selectedDeposit}
                    visible={detailVisible}
                    onClose={closeDetail}
                    formatDateTime={formatDateTime}
                />
            )}

            {selectedDeposit && editVisible && (
                <DepositEditPopUp
                    deposit={selectedDeposit}
                    visible={editVisible}
                    onClose={closeEdit}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default Dashboard;
