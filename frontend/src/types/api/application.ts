const APPLICATION_STATUSES = [
    { value: 'saved', label: 'Salva' },
    { value: 'applied', label: 'Aplicada' },
    { value: 'interview', label: 'Entrevista' },
    { value: 'technical_test', label: 'Teste técnico' },
    { value: 'offer', label: 'Oferta' },
    { value: 'hired', label: 'Contratado' },
    { value: 'rejected', label: 'Rejeitada' },
    { value: 'withdrawn', label: 'Desistência' },
    { value: 'no_response', label: 'Sem resposta' },
] as const

const APPLICATION_WORK_MODELS = [
    { value: 'remote', label: "Remoto" },
    { value: 'hybrid', label: "Hibrído" },
    { value: 'on_site', label: "Presencial" },
] as const

type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]['value']

type ApplicationWorkModels = (typeof APPLICATION_WORK_MODELS)[number]['value']

function isApplicationStatus(value: string): value is ApplicationStatus {
    return APPLICATION_STATUSES.some((status) => status.value === value)
}

function getApplicationStatusLabel(value: string) {
    return APPLICATION_STATUSES.find((status) => status.value === value)?.label ?? value
}

function isApplicationWorkModel(value: string): value is ApplicationWorkModels {
    return APPLICATION_WORK_MODELS.some((work_model) => work_model.value === value)
}

function getApplicationWorkModelLabel(value: string) {
    return APPLICATION_WORK_MODELS.find((work_model) => work_model.value === value)?.label ?? value
}

interface ApplicationResponse {
    id: number
    job_title: string
    company_name: string | null
    source: string
    application_platform: string
    job_url: string
    location: string
    work_model: ApplicationWorkModels
    status: ApplicationStatus
    salary_expectations: number
    applied_at: string | null
    notes: string | null
    created_at: string
    updated_at: string | null
}

interface ApplicationCreate {
    job_title: string
    company_name: string | null
    source: string
    application_platform: string
    job_url: string
    location: string
    work_model: ApplicationWorkModels
    status: ApplicationStatus
    applied_at: string | null
    notes: string | null
    salary_expectations: number
}

interface ApplicationUpdate {
    job_title?: string
    company_name?: string | null
    source?: string
    application_platform?: string
    job_url?: string
    location?: string
    work_model?: ApplicationWorkModels
    status?: ApplicationStatus
    applied_at?: string | null
    notes?: string | null
    salary_expectations?: number | null
}

interface DashboardResponse {
    total_applications: number
    saved_applications: number
    applied_applications: number
    interviews_applications: number
    rejected_applications: number
    last_applications: ApplicationResponse[]
}


export type { ApplicationResponse, ApplicationCreate, ApplicationUpdate, ApplicationStatus, DashboardResponse, ApplicationWorkModels }
export { APPLICATION_STATUSES, APPLICATION_WORK_MODELS, isApplicationStatus, getApplicationStatusLabel, isApplicationWorkModel, getApplicationWorkModelLabel }
