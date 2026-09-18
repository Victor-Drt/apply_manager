import { useNavigate } from 'react-router-dom';
import ApplicationRow from '../ApplicationRow';
import { useState } from 'react';

interface ApplicationsTableProps {
    applications: any[];
}

const PAGE_SIZE = 10

const ApplicationsTable = ({ applications }: ApplicationsTableProps) => {
    const navigate = useNavigate();
    const [offset, setOffset] = useState(0);

    const total = applications.length
    const maxOffset = total === 0 ? 0 : Math.floor((total - 1) / PAGE_SIZE) * PAGE_SIZE
    const pageOffset = Math.min(offset, maxOffset)
    const from = total === 0 ? 0 : pageOffset + 1
    const to = Math.min(pageOffset + PAGE_SIZE, total)
    const pageItems = applications.slice(pageOffset, pageOffset + PAGE_SIZE)
    const canGoPrevious = pageOffset > 0
    const canGoNext = pageOffset + PAGE_SIZE < total

    const handlePaginationPrevious = () => {
        setOffset((current) => Math.max(0, current - PAGE_SIZE))
    }

    const handlePaginationNext = () => {
        setOffset((current) => {
            const nextOffset = current + PAGE_SIZE
            return nextOffset < total ? nextOffset : current
        })
    }

    return (
        <div className="applications-card">
            <div className="applications-card-header">
                <h1>Candidaturas</h1>
                <button type="button"
                    className="applications-create-button"
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
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Applied At</th>
                    </tr>
                </thead>


                {pageItems.length > 0 ? (
                    <tbody>
                        {pageItems.map((application) => (
                            <ApplicationRow
                                key={application.id}
                                {...application}
                            />
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr className="applications-table-empty">
                            <td colSpan={5}>Nenhuma candidatura encontrada</td>
                        </tr>
                    </tbody>
                )}
            </table>
            <div className="applications-pagination">
                <span className="applications-pagination-info">{from}–{to} de {total}</span>
                <div className="applications-pagination-actions">
                    <button type="button" className="applications-pagination-button" disabled={!canGoPrevious} aria-label="Página anterior" onClick={handlePaginationPrevious}>‹</button>
                    <button type="button" className="applications-pagination-button" disabled={!canGoNext} aria-label="Próxima página" onClick={handlePaginationNext}>›</button>
                </div>
            </div>
        </div>

    )
}

export default ApplicationsTable;
