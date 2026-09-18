import { useState, type ChangeEvent, type FormEvent } from "react";
import ApplicationDetailField from "../../components/ApplicationDetailField";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../../services/applications";
import "./styles.css";

type ApplicationForm = {
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    status: string;
    appliedAt: string;
    notes: string;
}

type ApplicationFormErrors = Partial<Record<keyof ApplicationForm, string>>

const emptyApplication: ApplicationForm = {
    jobTitle: '',
    companyName: '',
    source: '',
    applicationPlatform: '',
    jobUrl: '',
    status: '',
    appliedAt: '',
    notes: '',
}

function isValidUrl(value: string) {
    try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
        return false
    }
}

function isValidDate(value: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false
    }

    const date = new Date(`${value}T00:00:00`)
    return !Number.isNaN(date.getTime())
}

function validateApplication(application: ApplicationForm): ApplicationFormErrors {
    const errors: ApplicationFormErrors = {}
    const jobTitle = application.jobTitle.trim()
    const companyName = application.companyName.trim()
    const source = application.source.trim()
    const applicationPlatform = application.applicationPlatform.trim()
    const jobUrl = application.jobUrl.trim()
    const status = application.status.trim()
    const appliedAt = application.appliedAt.trim()

    if (!jobTitle) {
        errors.jobTitle = 'Informe o cargo.'
    } else if (jobTitle.length > 255) {
        errors.jobTitle = 'O cargo deve ter no máximo 255 caracteres.'
    }

    if (companyName.length > 100) {
        errors.companyName = 'O nome da empresa deve ter no máximo 100 caracteres.'
    }

    if (!source) {
        errors.source = 'Informe a origem da vaga.'
    } else if (source.length > 100) {
        errors.source = 'A origem deve ter no máximo 100 caracteres.'
    }

    if (!applicationPlatform) {
        errors.applicationPlatform = 'Informe a plataforma da candidatura.'
    } else if (applicationPlatform.length > 100) {
        errors.applicationPlatform = 'A plataforma deve ter no máximo 100 caracteres.'
    }

    if (!jobUrl) {
        errors.jobUrl = 'Informe o link da vaga.'
    } else if (jobUrl.length > 2048) {
        errors.jobUrl = 'O link deve ter no máximo 2048 caracteres.'
    } else if (!isValidUrl(jobUrl)) {
        errors.jobUrl = 'Informe um link válido, começando com http:// ou https://.'
    }

    if (status.length > 100) {
        errors.status = 'O status deve ter no máximo 100 caracteres.'
    }

    if (appliedAt && !isValidDate(appliedAt)) {
        errors.appliedAt = 'Use uma data válida no formato AAAA-MM-DD.'
    }

    return errors
}

const ApplicationCreatePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ApplicationFormErrors>({});
    const [application, setApplication] = useState<ApplicationForm>(emptyApplication);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateApplication(application)
        setFieldErrors(errors)

        if (Object.keys(errors).length > 0) {
            setError('Revise os campos destacados para criar a candidatura.')
            return
        }

        setIsLoading(true);
        setError(null);

        try {
            await createApplication({
                job_title: application.jobTitle.trim(),
                company_name: application.companyName.trim() || null,
                source: application.source.trim(),
                application_platform: application.applicationPlatform.trim(),
                job_url: application.jobUrl.trim(),
                status: application.status.trim() || 'saved',
                applied_at: application.appliedAt.trim() || null,
                notes: application.notes.trim() || null,
            });
            navigate('/applications');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível criar a candidatura.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setApplication({
            ...application,
            [name]: value
        });
        setFieldErrors((current) => ({
            ...current,
            [name]: undefined,
        }))
    }

    const handleCancel = () => {
        navigate('/applications');
    }

    return (
        <main className="content application-create">
            <form className="application-create-card" onSubmit={handleSubmit} noValidate>
                <h1>Create Application</h1>
                <div className="application-create-fields">
                    <ApplicationDetailField label="Job Title" value={application.jobTitle} onChange={handleChange} required error={fieldErrors.jobTitle} maxLength={255} />
                    <ApplicationDetailField label="Company Name" value={application.companyName} onChange={handleChange} error={fieldErrors.companyName} maxLength={100} />
                    <ApplicationDetailField label="Source" value={application.source} onChange={handleChange} required error={fieldErrors.source} maxLength={100} />
                    <ApplicationDetailField label="Application Platform" value={application.applicationPlatform} onChange={handleChange} required error={fieldErrors.applicationPlatform} maxLength={100} />
                    <ApplicationDetailField label="Job URL" value={application.jobUrl} wide onChange={handleChange} required error={fieldErrors.jobUrl} inputType="url" maxLength={2048} />
                    <ApplicationDetailField label="Status" value={application.status} onChange={handleChange} error={fieldErrors.status} maxLength={100} />
                    <ApplicationDetailField label="Applied At" value={application.appliedAt} onChange={handleChange} error={fieldErrors.appliedAt} inputType="date" />
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
