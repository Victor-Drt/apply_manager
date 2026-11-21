import { useNavigate } from 'react-router-dom';
import { getApplicationStatusLabel } from '../../types/api/application';
import { formatApplicationDate } from '../../utils/formatters';

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

    return (
        <tr onClick={() => navigate(`/application/${id}`)}>
            <td>{jobTitle}</td>
            <td>{companyName || '—'}</td>
            <td>{location || '—'}</td>
            <td>{WORK_MODEL_LABELS[workModel] || workModel}</td>
            <td>
                <span className={`applications-status-badge applications-status--${status}`}>
                    {getApplicationStatusLabel(status)}
                </span>
            </td>
            <td>{formatApplicationDate(lastDate)}</td>
        </tr>
    );
};

export default ApplicationRow;
