import { NewUser } from '@/src/lib/types/user';

export enum Status {
    NEW = 'new',
    PROCESSING = 'processing',
    FINISHED = 'finished',
}


export interface Deposit {
   id: string; //uuid
   accountNumber: string;
   telegramUsername: string;
   telegramNumber: string;
   network: string;
   TxId: string;
   status: Status;
   createdAt: Date;
   updatedAt: Date;
   assignedTo: NewUser
}
