import { useNavigate } from 'react-router-dom';
import { formatApplicationDate } from '../../utils/formatters';
import StatusBadge from '../StatusBadge';

export interface ApplicationRowProps {
    id: string;
    jobTitle: string;
    companyName: string;
    workModel: string;
    location: string;
    status: string;
    appliedAt: string;
    createdAt: string;
    updatedAt: string;
}

const WORK_MODEL_LABELS: Record<string, string> = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    on_site: 'Presencial',
};

const ApplicationRow = ({
    id,
    jobTitle,
    companyName,
    workModel,
    location,
    status,
    appliedAt,
    createdAt,
    updatedAt,
}: ApplicationRowProps) => {
    const navigate = useNavigate();

    // Prioriza a última atualização; se não houver, usa data de aplicação ou criação
    const lastDate = updatedAt || appliedAt || createdAt;
    const openApplication = () => navigate(`/application/${id}`);

    return (
        <tr
            tabIndex={0}
            onClick={openApplication}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openApplication();
                }
            }}
        >
            <td>{jobTitle}</td>
            <td>{companyName || '—'}</td>
            <td>{location || '—'}</td>
            <td>{WORK_MODEL_LABELS[workModel] || workModel}</td>
            <td>
                <StatusBadge status={status} />
            </td>
            <td>{formatApplicationDate(lastDate)}</td>
        </tr>
    );
};

export default ApplicationRow;
