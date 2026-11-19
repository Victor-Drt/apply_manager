import type { ApplicationStatus, ApplicationWorkModels } from "../api/application";

type ApplicationForm = {
    jobTitle: string;
    companyName: string;
    source: string;
    applicationPlatform: string;
    jobUrl: string;
    location: string;
    workModels: ApplicationWorkModels;
    status: ApplicationStatus;
    appliedAt: string;
    notes: string;
    salaryExpectations: number;
}

export type { ApplicationForm };