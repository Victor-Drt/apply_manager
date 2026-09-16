import { useState, type ChangeEvent, type FormEvent } from 'react';
import ApplicationDetailField from '../../components/ApplicationDetailField';
import './styles.css'

const initialApplication = {
    jobTitle: 'Software Engineer',
    companyName: 'Google',
    source: 'LinkedIn',
    applicationPlatform: 'LinkedIn',
    jobUrl: 'https://www.linkedin.com/jobs/view/1234567890',
    status: 'Pending',
    appliedAt: '2026-01-01',
    notes: 'Observações sobre a aplicação',
    createdAt: '2026-01-01'
}

const ApplicationDetailPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [application, setApplication] = useState(initialApplication);
    const [savedApplication, setSavedApplication] = useState(initialApplication);

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setApplication(savedApplication);
        setIsEditing(false);
    }

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSavedApplication(application);
        setIsEditing(false);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setApplication((current) => ({
            ...current,
            [name]: value
        }));
    }

    return (
        <main className="content application-detail">
            <form className="application-detail-card" onSubmit={handleSave}>
                <h1>Application Detail</h1>
                <div className="application-detail-fields">
                    <ApplicationDetailField label="Job Title" value={application.jobTitle} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Company Name" value={application.companyName} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Source" value={application.source} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Application Platform" value={application.applicationPlatform} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Job URL" value={application.jobUrl} wide onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Status" value={application.status} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Applied At" value={application.appliedAt} onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Notes" value={application.notes} wide onChange={handleChange} disabled={!isEditing} />
                    <ApplicationDetailField label="Created At" value={application.createdAt} disabled />
                </div>
                <div className="application-detail-actions">
                    {isEditing ? (
                        <>
                            <button type="button" className="application-detail-action-button" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="application-detail-action-button" onClick={() => handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="application-detail-action-button" onClick={handleEdit}>Edit</button>
                            <button type="button" className="application-detail-action-button">Delete</button>
                        </>
                    )}
                </div>
            </form>
        </main>
    );
}

export default ApplicationDetailPage;
