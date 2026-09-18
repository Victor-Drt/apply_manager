import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationDetailField from '../../components/ApplicationDetailField';
import './styles.css'
import DeleteApplicationModal from '../../components/DeleteApplicationModal';
import { deleteApplication, getApplication, updateApplication } from '../../services/applications';
import { APPLICATION_STATUSES, isApplicationStatus, type ApplicationResponse, type ApplicationStatus } from '../../types/application';

type ApplicationForm = {
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    status: ApplicationStatus;
    appliedAt: string;
    notes: string;
    createdAt: string;
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
    createdAt: '',
}

function toDateInputValue(value: string | null | undefined) {
    if (!value) {
        return ''
    }
    return value.slice(0, 10)
}

function toForm(application: ApplicationResponse): ApplicationForm {
    return {
        jobTitle: application.job_title ?? '',
        companyName: application.company_name ?? '',
        source: application.source ?? '',
        applicationPlatform: application.application_platform ?? '',
        jobUrl: application.job_url ?? '',
        status: isApplicationStatus(application.status) ? application.status : 'saved',
        appliedAt: toDateInputValue(application.applied_at),
        notes: application.notes ?? '',
        createdAt: toDateInputValue(application.created_at),
    }
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

const ApplicationDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [application, setApplication] = useState<ApplicationForm>(emptyApplication);
    const [savedApplication, setSavedApplication] = useState<ApplicationForm>(emptyApplication);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ApplicationFormErrors>({});

    const applicationId = id ? Number(id) : NaN
    const hasValidId = Number.isInteger(applicationId) && applicationId > 0

    useEffect(() => {
        if (!hasValidId) {
            navigate('/applications', { replace: true })
            return
        }

        let cancelled = false
        setIsLoading(true)
        setError(null)
        setFieldErrors({})
        setIsEditing(false)

        getApplication(applicationId)
            .then((data) => {
                if (cancelled) return
                const form = toForm(data)
                setApplication(form)
                setSavedApplication(form)
            })
            .catch((err) => {
                if (cancelled) return
                setApplication(emptyApplication)
                setSavedApplication(emptyApplication)
                setError(err instanceof Error ? err.message : 'Não foi possível carregar a candidatura.')
            })
            .finally(() => {
                if (!cancelled) {
                    setIsLoading(false)
                }
            })

        return () => {
            cancelled = true
        }
    }, [applicationId, hasValidId, navigate]);

    const handleEdit = () => {
        setIsEditing(true);
        setError(null);
        setFieldErrors({});
    }

    const handleCancel = () => {
        setApplication(savedApplication);
        setFieldErrors({});
        setError(null);
        setIsEditing(false);
    }

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!hasValidId) {
            return
        }

        const errors = validateApplication(application)
        setFieldErrors(errors)

        if (Object.keys(errors).length > 0) {
            setError('Revise os campos destacados para salvar a candidatura.')
            return
        }

        setIsSaving(true);
        setError(null);

        try {
            await updateApplication(applicationId, {
                job_title: application.jobTitle.trim(),
                company_name: application.companyName.trim() || null,
                source: application.source.trim(),
                application_platform: application.applicationPlatform.trim(),
                job_url: application.jobUrl.trim(),
                status: isApplicationStatus(application.status) ? application.status : 'saved',
                applied_at: application.appliedAt.trim() || null,
                notes: application.notes.trim() || null,
            });
            const data = await getApplication(applicationId)
            const form = toForm(data)
            setApplication(form)
            setSavedApplication(form)
            setIsEditing(false)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível atualizar a candidatura.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        setApplication((current) => ({
            ...current,
            [name]: value
        }));
        setFieldErrors((current) => ({
            ...current,
            [name]: undefined,
        }))
    }

    const handleDelete = async () => {
        setIsModalOpen(true);
        try {
            await deleteApplication(applicationId)
            navigate('/applications')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível deletar a candidatura.')
        }
    }

    const confirmDelete = () => {
        setIsModalOpen(false);
        navigate('/applications');
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const fieldsDisabled = !isEditing || isLoading || isSaving

    return (
        <main className="content application-detail">
            {isModalOpen && (
                <DeleteApplicationModal
                    onDelete={confirmDelete}
                    onCancel={closeModal}
                />
            )}

            <form className="application-detail-card" onSubmit={handleSave} noValidate>
                <h1>Detalhes da candidatura</h1>
                <div className="application-detail-fields">
                    <ApplicationDetailField name="jobTitle" label="Titulo da Vaga" value={application.jobTitle} onChange={handleChange} disabled={fieldsDisabled} required error={fieldErrors.jobTitle} maxLength={255} />
                    <ApplicationDetailField name="companyName" label="Empresa" value={application.companyName} onChange={handleChange} disabled={fieldsDisabled} error={fieldErrors.companyName} maxLength={100} />
                    <ApplicationDetailField name="source" label="Origem" value={application.source} onChange={handleChange} disabled={fieldsDisabled} required error={fieldErrors.source} maxLength={100} />
                    <ApplicationDetailField name="applicationPlatform" label="Plataforma" value={application.applicationPlatform} onChange={handleChange} disabled={fieldsDisabled} required error={fieldErrors.applicationPlatform} maxLength={100} />
                    <ApplicationDetailField name="jobUrl" label="Link da Vaga" value={application.jobUrl} wide onChange={handleChange} disabled={fieldsDisabled} required error={fieldErrors.jobUrl} inputType="url" maxLength={2048} />
                    <ApplicationDetailField name="status" label="Status" value={application.status} onChange={handleChange} disabled={fieldsDisabled} required error={fieldErrors.status} options={APPLICATION_STATUSES} />
                    <ApplicationDetailField name="appliedAt" label="Data de Aplicação" value={application.appliedAt} onChange={handleChange} disabled={fieldsDisabled} error={fieldErrors.appliedAt} inputType="date" />
                    <ApplicationDetailField name="notes" label="Notas" value={application.notes} wide onChange={handleChange} disabled={fieldsDisabled} />
                    <ApplicationDetailField name="createdAt" label="Data de Criação" value={application.createdAt} disabled />
                </div>
                <div className="application-detail-actions">
                    {isEditing ? (
                        <>
                            <button type="button" className="application-detail-action-button" onClick={handleCancel} disabled={isSaving}>Cancelar</button>
                            <button type="submit" className="application-detail-action-button" disabled={isSaving}>Salvar</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="application-detail-action-button" onClick={handleEdit} disabled={isLoading || Boolean(error)}>Editar</button>
                            <button type="button" className="application-detail-action-button" onClick={handleDelete} disabled={isLoading || Boolean(error)}>Excluir</button>
                        </>
                    )}
                </div>
            </form>
            {isLoading && <div className="application-detail-status">Carregando candidatura...</div>}
            {error && <div className="application-detail-error">{error}</div>}
        </main>
    );
}

export default ApplicationDetailPage;
