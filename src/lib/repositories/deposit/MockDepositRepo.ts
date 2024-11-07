import axios from 'axios';
import { Deposit } from '@/src/lib/types/deposit';
import { BaseDepositRepo } from '@/src/lib/repositories/deposit/BaseDepositRepo';

export class MockDepositRepo extends BaseDepositRepo {
    private async fetchAllDeposits(): Promise<Deposit[]> {
        try {
            const response = await axios.get('/demo/data/deposits.json', {
                headers: { 'Cache-Control': 'no-cache' }
            });
            return response.data['data'] as Deposit[];
        } catch (error) {
            console.error('Error fetching deposits:', error);
            return [];
        }
    }

    async getDeposits(): Promise<Deposit[]> {
        return this.fetchAllDeposits();
    }

    async getDepositById(id: string): Promise<Deposit> {
        const deposits = await this.fetchAllDeposits();
        const deposit = deposits.find(deposit => deposit.id === id);

        if (!deposit) {
            throw new Error(`Deposit with id ${id} not found`);
        }

        return deposit;
    }

    async getDepositsByUserId(userId: string): Promise<Deposit[]> {
        const deposits = await this.fetchAllDeposits();
        return deposits.filter(deposit => deposit.assignedTo && deposit.assignedTo.username === userId);
    }

    async updateDepositById(id: string, updatedData: Partial<Deposit>): Promise<Deposit> {
        const deposits = await this.fetchAllDeposits();
        const index = deposits.findIndex(deposit => deposit.id === id);

        if (index === -1) {
            throw new Error(`Deposit with id ${id} not found`);
        }

        deposits[index] = { ...deposits[index], ...updatedData };

        return deposits[index];
    }

    async deleteDeposit(id: string): Promise<Deposit> {
        const deposits = await this.fetchAllDeposits();
        const index = deposits.findIndex(deposit => deposit.id === id);

        if (index === -1) {
            throw new Error(`Deposit with id ${id} not found`);
        }

        const [deletedDeposit] = deposits.splice(index, 1);

        return deletedDeposit;
    }
}
