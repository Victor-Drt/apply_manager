import type { ApplicationStatus } from "../api/application";

type ApplicationForm = {
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    status: ApplicationStatus;
    appliedAt: string;
    notes: string;
    salaryExpectations: number;
}

export type { ApplicationForm };