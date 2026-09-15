import './styles.css'

const ApplicationsPage = () => {
    return (
        <main className="content">
            <div className="applications-card">
                <h1>Applications</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Campany Name</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Software Engineer</td>
                            <td>Google</td>
                            <td>LinkedIn</td>
                            <td>Actions</td>
                        </tr>
                    </tbody>
                </table>
                <div className="applications-pagination">
                    <span className="applications-pagination-info">1–10 de 27</span>
                    <div className="applications-pagination-actions">
                        <button type="button" className="applications-pagination-button" disabled aria-label="Página anterior">‹</button>
                        <button type="button" className="applications-pagination-button" aria-label="Próxima página">›</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ApplicationsPage;