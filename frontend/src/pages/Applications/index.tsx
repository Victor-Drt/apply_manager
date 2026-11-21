import './styles.css';
import ApplicationsTable from '../../components/ApplicationsTable';
import { useState } from 'react';
import type { ApplicationResume } from '../../types/api/application';

const ApplicationsPage = () => {
    const [applications, setApplications] = useState<ApplicationResume[]>([]);

    return (
        <main className="content">
            <ApplicationsTable
                applications={applications}
                setApplications={setApplications}
            />
        </main>
    );
};

export default ApplicationsPage;
