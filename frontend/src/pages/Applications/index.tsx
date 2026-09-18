import './styles.css'
import ApplicationsTable from '../../components/ApplicationsTable';
import { getApplications } from '../../services/applications';
import { useEffect, useState } from 'react';
import type { ApplicationResponse } from '../../types/application';

const applications = [
    {
        id: '1',
        jobTitle: 'Software Engineer',
        companyName: 'Google',
        source: 'LinkedIn',
        status: 'Pending',
        appliedAt: '2026-01-01'
    },
    {
        id: '2',
        jobTitle: 'Software Engineer',
        companyName: 'Google',
        source: 'LinkedIn',
        status: 'Pending',
        appliedAt: '2026-01-01'
    },
]

const ApplicationsPage = () => {
    const [applications, setApplications] = useState<ApplicationResponse[]>([])

    useEffect(() => {
        getApplications(0, 10).then(setApplications)
    }, [])

    return (
        <main className="content">
            <ApplicationsTable applications={applications} setApplications={setApplications} />
        </main>
    )
}

export default ApplicationsPage;