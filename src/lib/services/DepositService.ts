import { Deposit } from '@/src/lib/types/deposit';
import { BaseDepositRepo } from '@/src/lib/repositories/deposit/BaseDepositRepo';
import { MockDepositRepo } from '@/src/lib/repositories/deposit/MockDepositRepo';

export class DepositService {
    private depositRepo: BaseDepositRepo;

    constructor(depositRepo: BaseDepositRepo) {
        this.depositRepo = depositRepo;
    }

    async getAllDeposits(): Promise<Deposit[]> {
        return await this.depositRepo.getDeposits();
    }

    async getDepositById(id: string): Promise<Deposit> {
        return await this.depositRepo.getDepositById(id);
    }

    async getDepositsByUserId(userId: string): Promise<Deposit[]> {
        return await this.depositRepo.getDepositsByUserId(userId);
    }

    async updateDepositById(id: string, updatedData: Partial<Deposit>): Promise<Deposit> {
        return await this.depositRepo.updateDepositById(id, updatedData);
    }

    async deleteDeposit(id: string): Promise<Deposit> {
        return await this.depositRepo.deleteDeposit(id);
    }
}


const mockRepository = new MockDepositRepo()
export const depositService = new DepositService(mockRepository)
