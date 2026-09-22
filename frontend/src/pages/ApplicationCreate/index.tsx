import { useState, type ChangeEvent, type FormEvent } from "react";
import ApplicationDetailField from "../../components/ApplicationDetailField";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../../services/applications";
import { APPLICATION_STATUSES, isApplicationStatus, type ApplicationStatus } from "../../types/application";
import "./styles.css";

type ApplicationForm = {
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    status: ApplicationStatus;
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
    status: 'saved',
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

    if (!isApplicationStatus(status)) {
        errors.status = 'Selecione um status válido.'
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
                status: isApplicationStatus(application.status) ? application.status : 'saved',
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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                <header className="application-create-header">
                    <div className="application-create-header-copy">
                        <h1>Nova candidatura</h1>
                        <p>Cadastre a vaga com empresa, origem, link e status para acompanhar o processo.</p>
                    </div>
                </header>

                <div className="application-create-fields">
                    <ApplicationDetailField name="jobTitle" label="Titulo da Vaga" value={application.jobTitle} onChange={handleChange} required error={fieldErrors.jobTitle} maxLength={255} />
                    <ApplicationDetailField name="companyName" label="Empresa" value={application.companyName} onChange={handleChange} error={fieldErrors.companyName} maxLength={100} />
                    <ApplicationDetailField name="source" label="Origem" value={application.source} onChange={handleChange} required error={fieldErrors.source} maxLength={100} />
                    <ApplicationDetailField name="applicationPlatform" label="Plataforma" value={application.applicationPlatform} onChange={handleChange} required error={fieldErrors.applicationPlatform} maxLength={100} />
                    <ApplicationDetailField name="jobUrl" label="Link da Vaga" value={application.jobUrl} wide onChange={handleChange} required error={fieldErrors.jobUrl} inputType="url" maxLength={2048} />
                    <ApplicationDetailField name="status" label="Status" value={application.status} onChange={handleChange} required error={fieldErrors.status} options={APPLICATION_STATUSES} />
                    <ApplicationDetailField name="appliedAt" label="Data de Aplicação" value={application.appliedAt} onChange={handleChange} error={fieldErrors.appliedAt} inputType="date" />
                    <ApplicationDetailField name="notes" label="Notas" value={application.notes} wide onChange={handleChange} />
                </div>

                {error ? <div className="application-create-error">{error}</div> : null}

                <div className="application-create-actions">
                    <button type="button" className="application-create-action-button" onClick={handleCancel}>Cancelar</button>
                    <button type="submit" className="application-create-action-button application-create-action-button--primary" disabled={isLoading}>
                        {isLoading ? 'Salvando...' : 'Criar candidatura'}
                    </button>
                </div>
            </form>
        </main>
    );
}

export default ApplicationCreatePage;
