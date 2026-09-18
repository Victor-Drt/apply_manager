import { useNavigate } from 'react-router-dom';

export interface ApplicationRowProps {
    id: string;
    jobTitle: string;
    companyName: string;
    source: string;
    status: string;
    appliedAt: string;
    createdAt: string;
    updatedAt: string;
}

const ApplicationRow = ({ id, jobTitle, companyName, source, status, appliedAt }: ApplicationRowProps) => {
    const navigate = useNavigate();

    return (
        <tr key={id} onClick={() => navigate(`/application/${id}`)}>
            <td>{jobTitle}</td>
            <td>{companyName}</td>
            <td>{source}</td>
            <td>{status}</td>
            <td>{appliedAt}</td>
        </tr>
    )
}

export default ApplicationRow;