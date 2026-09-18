interface ApplicationResponse {
    id: number
    job_title: string
    company_name: string | null
    source: string
    status: string
    applied_at: string | null
    created_at: string
    updated_at: string | null
}

interface ApplicationCreate {
    job_title: string
    company_name: string | null
    source: string
    application_platform: string
    job_url: string
    status: string
    applied_at: string | null
    notes: string | null
}

export type { ApplicationResponse, ApplicationCreate }