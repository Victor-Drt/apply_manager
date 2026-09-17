import { useState, type ChangeEvent, type FormEvent } from "react";
import ApplicationDetailField from "../../components/ApplicationDetailField";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ApplicationCreatePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [application, setApplication] = useState({
        jobTitle: '',
        companyName: '',
        source: '',
        applicationPlatform: '',
        jobUrl: '',
        status: '',
        appliedAt: '',
        notes: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(application);
        setIsLoading(false);
        navigate('/applications');
        setError(null);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApplication({
            ...application,
            [e.target.name]: e.target.value
        });
    }

    const handleCancel = () => {
        navigate('/applications');
    }

    return (
        <main className="content application-create">
            <form className="application-create-card" onSubmit={handleSubmit}>
                <h1>Create Application</h1>
                <div className="application-create-fields">
                    <ApplicationDetailField label="Job Title" value={application.jobTitle} onChange={handleChange} />
                    <ApplicationDetailField label="Company Name" value={application.companyName} onChange={handleChange} />
                    <ApplicationDetailField label="Source" value={application.source} onChange={handleChange} />
                    <ApplicationDetailField label="Application Platform" value={application.applicationPlatform} onChange={handleChange} />
                    <ApplicationDetailField label="Job URL" value={application.jobUrl} wide onChange={handleChange} />
                    <ApplicationDetailField label="Status" value={application.status} onChange={handleChange} />
                    <ApplicationDetailField label="Applied At" value={application.appliedAt} onChange={handleChange} />
                    <ApplicationDetailField label="Notes" value={application.notes} wide onChange={handleChange} />
                </div>
                <div className="application-create-actions">
                    <button type="button" className="application-create-action-button" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="application-create-action-button" disabled={isLoading}>Create</button>
                </div>
            </form>
            {error && <div className="application-create-error">{error}</div>}
        </main>
    );
}

export default ApplicationCreatePage;