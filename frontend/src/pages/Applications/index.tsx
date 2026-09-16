import './styles.css'
import ApplicationsTable from '../../components/ApplicationsTable';

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
    return (
        <main className="content">
            <ApplicationsTable applications={applications} />
        </main>
    )
}

export default ApplicationsPage;