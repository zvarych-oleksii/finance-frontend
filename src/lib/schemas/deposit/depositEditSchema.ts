import { z } from 'zod';

export const depositEditSchema = z.object({
    telegramUsername: z.string().nonempty("Telegram username is required"),
    telegramNumber: z.string().nonempty("Telegram number is required"),
    network: z.string().nonempty("Network is required"),
});

export type DepositEditFormData = z.infer<typeof depositEditSchema>;
