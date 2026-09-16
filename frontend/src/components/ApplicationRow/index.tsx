import { useNavigate } from 'react-router-dom';

export interface ApplicationRowProps {
    id: string;
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    status: string;
    appliedAt: string;
    notes: string;
    createdAt: string;
}

const ApplicationRow = ({ id, jobTitle, companyName, source, applicationPlatform, jobUrl, status, appliedAt, notes, createdAt }: ApplicationRowProps) => {
    const navigate = useNavigate();

    return (
        <tr key={id} onClick={() => navigate(`/application/${id}`)}>
            <td>{jobTitle}</td>
            <td>{companyName}</td>
            <td>{source}</td>
            <td>{applicationPlatform}</td>
            <td>{jobUrl}</td>
            <td>{status}</td>
            <td>{appliedAt}</td>
            <td>{notes}</td>
            <td>{createdAt}</td>
        </tr>
    )
}

export default ApplicationRow;