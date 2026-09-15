from app.schemas.applications import Application

applications: list[Application] = [
    {
        "id": 1,
        "user_id": 1,
        "job_title": "Software Engineer",
        "company_name": "Google",
        "source": "LinkedIn",
        "application_platform": "LinkedIn",
        "job_url": "https://www.linkedin.com/jobs/view/1234567890",
        "status": "saved",
    }
]