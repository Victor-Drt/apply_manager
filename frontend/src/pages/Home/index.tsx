import "./styles.css"
import { getDashboard } from "../../services/applications";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, useOutletContext } from "react-router-dom";
import { getApplicationStatusLabel, type DashboardResponse } from "../../types/application";
import type { User } from "../../types/users";



const STATUS_BADGES = ['saved', 'applied', 'interview', 'rejected'] as const
type StatusBadge = (typeof STATUS_BADGES)[number]

function formatApplicationDate(value: string | null | undefined) {
    if (!value) {
        return ''
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return value.slice(0, 10)
    }

    return date.toLocaleDateString('pt-BR')
}

function getCompanyInitial(companyName: string | null, jobTitle: string) {
    const source = companyName?.trim() || jobTitle.trim()
    return source ? source.charAt(0).toUpperCase() : '?'
}

function getStatusModifier(status: string): StatusBadge {
    return STATUS_BADGES.includes(status as StatusBadge) ? status as StatusBadge : 'saved'
}

function getStatusPercent(count: number, total: number) {
    if (total <= 0) {
        return 0
    }

    return Math.round((count / total) * 100)
}

const HomePage = () => {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
    const { user } = useOutletContext<{ user: User | null }>()

    useEffect(() => {
        getDashboard().then((data) => setDashboard(data)).catch((error) => console.error(error));
    }, []);

    const recentApplications = dashboard?.last_applications ?? []
    const totalApplications = dashboard?.total_applications ?? 0
    const statusOverview = [
        { key: 'saved', label: 'Salvas', count: dashboard?.saved_applications ?? 0 },
        { key: 'applied', label: 'Aplicadas', count: dashboard?.applied_applications ?? 0 },
        { key: 'interview', label: 'Entrevistas', count: dashboard?.interviews_applications ?? 0 },
        { key: 'rejected', label: 'Rejeitadas', count: dashboard?.rejected_applications ?? 0 },
    ] as const

    return (

        <main className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-header__content">
                    <h1 className="dashboard-header__title">
                        Olá, {user?.name}
                    </h1>

                    <p className="dashboard-header__subtitle">
                        Acompanhe suas candidaturas e mantenha seu processo organizado.
                    </p>
                </div>

                <button
                    type="button" className="dashboard-header__action"
                    onClick={() => navigate('/application/create')}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round"
                        className="lucide lucide-plus preview-icon">
                        <path d="M5 12h14" /><path d="M12 5v14" />
                    </svg>
                    Nova candidatura
                </button>

            </header>

            {/* Summary Cards */}
            <section className="summary-section">
                <div className="summary-grid">

                    <article className="summary-card summary-card--total">
                        <div className="summary-card__header">
                            <span className="summary-card__label">
                                Total
                            </span>

                            <span className="summary-card__icon">
                                #
                            </span>
                        </div>

                        <strong className="summary-card__value">
                            {dashboard?.total_applications || 0}
                        </strong>

                        <span className="summary-card__description">
                            candidaturas cadastradas
                        </span>
                    </article>

                    <article className="summary-card summary-card--applied">
                        <div className="summary-card__header">
                            <span className="summary-card__label">
                                Aplicadas
                            </span>

                            <span className="summary-card__icon">
                                ↗
                            </span>
                        </div>

                        <strong className="summary-card__value">
                            {dashboard?.applied_applications || 0}
                        </strong>

                        <span className="summary-card__description">
                            candidaturas enviadas
                        </span>
                    </article>

                    <article className="summary-card summary-card--interview">
                        <div className="summary-card__header">
                            <span className="summary-card__label">
                                Entrevistas
                            </span>

                            <span className="summary-card__icon">
                                ✓
                            </span>
                        </div>

                        <strong className="summary-card__value">
                            {dashboard?.interviews_applications || 0}
                        </strong>

                        <span className="summary-card__description">
                            processos em andamento
                        </span>
                    </article>

                    <article className="summary-card summary-card--rejected">
                        <div className="summary-card__header">
                            <span className="summary-card__label">
                                Rejeitadas
                            </span>

                            <span className="summary-card__icon">
                                ×
                            </span>
                        </div>

                        <strong className="summary-card__value">
                            {dashboard?.rejected_applications || 0}
                        </strong>

                        <span className="summary-card__description">
                            candidaturas encerradas
                        </span>
                    </article>

                </div>
            </section>

            {/* Main Content */}
            <section className="dashboard-content">

                {/* Recent Applications */}
                <div className="recent-applications">
                    <div className="section-header">
                        <div className="section-header__content">
                            <h2 className="section-header__title">
                                Candidaturas recentes
                            </h2>

                            <p className="section-header__subtitle">
                                Suas últimas candidaturas cadastradas.
                            </p>
                        </div>

                        <NavLink className="section-header__link" to="/applications">Ver Todas</NavLink>
                    </div>

                    <div className="applications-list">
                        {recentApplications.length > 0 ? recentApplications.map((application) => {
                            const statusModifier = getStatusModifier(application.status)
                            const applicationDate = formatApplicationDate(application.applied_at || application.created_at)

                            return (
                                <article
                                    key={application.id}
                                    className="application-item"
                                    onClick={() => navigate(`/application/${application.id}`)}
                                >
                                    <div className="application-item__info">
                                        <div className="application-item__company-icon">
                                            {getCompanyInitial(application.company_name, application.job_title)}
                                        </div>

                                        <div className="application-item__details">
                                            <h3 className="application-item__title">
                                                {application.job_title}
                                            </h3>

                                            <span className="application-item__company">
                                                {application.company_name || 'Empresa não informada'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="application-item__meta">
                                        <span className={`application-status application-status--${statusModifier}`}>
                                            {getApplicationStatusLabel(application.status)}
                                        </span>

                                        {applicationDate ? (
                                            <time className="application-item__date" dateTime={application.applied_at || application.created_at}>
                                                {applicationDate}
                                            </time>
                                        ) : null}
                                    </div>
                                </article>
                            )
                        }) : (
                            <p className="applications-list-empty">Nenhuma candidatura cadastrada ainda.</p>
                        )}
                    </div>
                </div>

                {/* Status Overview */}
                <aside className="status-overview">

                    <div className="section-header">
                        <div className="section-header__content">
                            <h2 className="section-header__title">
                                Status
                            </h2>

                            <p className="section-header__subtitle">
                                Distribuição das candidaturas.
                            </p>
                        </div>
                    </div>

                    <div className="status-list">
                        {statusOverview.map((status) => (
                            <div className="status-item" key={status.key}>
                                <div className="status-item__header">
                                    <div className="status-item__label">
                                        <span className={`status-dot status-dot--${status.key}`}></span>
                                        {status.label}
                                    </div>

                                    <strong className="status-item__value">
                                        {status.count}
                                    </strong>
                                </div>

                                <div className="status-item__bar">
                                    <span
                                        className={`status-item__progress status-item__progress--${status.key}`}
                                        style={{ width: `${getStatusPercent(status.count, totalApplications)}%` }}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>

                </aside>

            </section>
        </main>
    )
}

export default HomePage;