import { Deposit } from '@/src/lib/types/deposit';

export abstract class BaseDepositRepo {
    abstract getDeposits(): Promise<Deposit[]>;
    abstract getDepositById(id: string): Promise<Deposit>;
    abstract getDepositsByUserId(userId: string): Promise<Deposit[]>;
    abstract updateDepositById(id: string, updatedData: Partial<Deposit>): Promise<Deposit>;
    abstract deleteDeposit(id: string): Promise<Deposit>;
}
