import { Status } from '@/src/lib/types/deposit';
import StatusBadge from '@/src/components/atoms/StatusBadge';

export interface DepositPopUpHeaderProps {
    status: Status
    accountNumber: string
}

const DepositPopUpHeader: React.FC<DepositPopUpHeaderProps> = ({ status, accountNumber }) => {
    return (
        <div className={'flex justify-content-start gap-6 align-items-center'}>
            <p>Details for Account ${accountNumber}</p>
            <StatusBadge className={'mb-3'} status={status}></StatusBadge>
        </div>

    )
}


export default DepositPopUpHeader;
