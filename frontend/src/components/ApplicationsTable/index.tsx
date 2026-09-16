import type { ApplicationRowProps } from '../ApplicationRow';
import ApplicationRow from '../ApplicationRow';

interface ApplicationsTableProps {
    applications: ApplicationRowProps[];
}

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
    return (
        <div className="applications-card">
            <h1>Applications</h1>

            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Applied At</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <ApplicationRow {...application} />
                    ))}
                </tbody>
            </table>
            <div className="applications-pagination">
                <span className="applications-pagination-info">1–10 de 27</span>
                <div className="applications-pagination-actions">
                    <button type="button" className="applications-pagination-button" disabled aria-label="Página anterior">‹</button>
                    <button type="button" className="applications-pagination-button" aria-label="Próxima página">›</button>
                </div>
            </div>
        </div>

    )
}

export default ApplicationsTable;