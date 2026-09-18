import "./styles.css"
import { useNavigate, NavLink } from "react-router-dom";


const HomePage = () => {

    const navigate = useNavigate();

    return (

        <main className="dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="dashboard-header__content">
                    <h1 className="dashboard-header__title">
                        Olá, Victor!
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
                            42
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
                            28
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
                            5
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
                            9
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

                        <article className="application-item">
                            <div className="application-item__info">

                                <div className="application-item__company-icon">
                                    A
                                </div>

                                <div className="application-item__details">
                                    <h3 className="application-item__title">
                                        Desenvolvedor Backend Python
                                    </h3>

                                    <span className="application-item__company">
                                        Empresa Alpha
                                    </span>
                                </div>
                            </div>

                            <div className="application-item__meta">
                                <span className="application-status application-status--interview">
                                    Entrevista
                                </span>

                                <time className="application-item__date">
                                    15/09/2026
                                </time>
                            </div>
                        </article>

                        <article className="application-item">
                            <div className="application-item__info">

                                <div className="application-item__company-icon">
                                    B
                                </div>

                                <div className="application-item__details">
                                    <h3 className="application-item__title">
                                        Desenvolvedor Python
                                    </h3>

                                    <span className="application-item__company">
                                        Empresa Beta
                                    </span>
                                </div>
                            </div>

                            <div className="application-item__meta">
                                <span className="application-status application-status--applied">
                                    Aplicada
                                </span>

                                <time className="application-item__date">
                                    14/09/2026
                                </time>
                            </div>
                        </article>

                        <article className="application-item">
                            <div className="application-item__info">

                                <div className="application-item__company-icon">
                                    G
                                </div>

                                <div className="application-item__details">
                                    <h3 className="application-item__title">
                                        Desenvolvedor Full Stack
                                    </h3>

                                    <span className="application-item__company">
                                        Empresa Gamma
                                    </span>
                                </div>
                            </div>

                            <div className="application-item__meta">
                                <span className="application-status application-status--rejected">
                                    Rejeitada
                                </span>

                                <time className="application-item__date">
                                    12/09/2026
                                </time>
                            </div>
                        </article>

                        <article className="application-item">
                            <div className="application-item__info">

                                <div className="application-item__company-icon">
                                    D
                                </div>

                                <div className="application-item__details">
                                    <h3 className="application-item__title">
                                        Backend Developer
                                    </h3>

                                    <span className="application-item__company">
                                        Empresa Delta
                                    </span>
                                </div>
                            </div>

                            <div className="application-item__meta">
                                <span className="application-status application-status--saved">
                                    Salva
                                </span>

                                <time className="application-item__date">
                                    10/09/2026
                                </time>
                            </div>
                        </article>

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

                        <div className="status-item">
                            <div className="status-item__header">
                                <div className="status-item__label">
                                    <span className="status-dot status-dot--saved"></span>
                                    Salvas
                                </div>

                                <strong className="status-item__value">
                                    8
                                </strong>
                            </div>

                            <div className="status-item__bar">
                                <span
                                    className="status-item__progress status-item__progress--saved"
                                    style={{ width: "19%" }}
                                ></span>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-item__header">
                                <div className="status-item__label">
                                    <span className="status-dot status-dot--applied"></span>
                                    Aplicadas
                                </div>

                                <strong className="status-item__value">
                                    28
                                </strong>
                            </div>

                            <div className="status-item__bar">
                                <span
                                    className="status-item__progress status-item__progress--applied"
                                    style={{ width: "67%" }}
                                ></span>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-item__header">
                                <div className="status-item__label">
                                    <span className="status-dot status-dot--interview"></span>
                                    Entrevistas
                                </div>

                                <strong className="status-item__value">
                                    5
                                </strong>
                            </div>

                            <div className="status-item__bar">
                                <span
                                    className="status-item__progress status-item__progress--interview"
                                    style={{ width: "12%" }}
                                ></span>
                            </div>
                        </div>

                        <div className="status-item">
                            <div className="status-item__header">
                                <div className="status-item__label">
                                    <span className="status-dot status-dot--rejected"></span>
                                    Rejeitadas
                                </div>

                                <strong className="status-item__value">
                                    9
                                </strong>
                            </div>

                            <div className="status-item__bar">
                                <span
                                    className="status-item__progress status-item__progress--rejected"
                                    style={{ width: "21%" }}
                                ></span>
                            </div>
                        </div>

                    </div>

                </aside>

            </section>        </main>
    )
}

export default HomePage;