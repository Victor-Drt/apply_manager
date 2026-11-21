import ApplicationRow from "../ApplicationRow";
import {
  APPLICATION_STATUSES,
  type ApplicationResume,
  type ApplicationStatus,
} from "../../types/api/application";
import { getApplications } from "../../services/applications";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

interface ApplicationsTableProps {
  applications: ApplicationResume[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationResume[]>>;
}

const ApplicationsTable = ({
  applications,
  setApplications,
}: ApplicationsTableProps) => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | null>(
    null,
  );
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const next = searchInput.trim();
      setSearch((current) => {
        if (current === next) return current;
        setOffset(0);
        setApplications([]);
        setTotal(0);
        setLoading(true);
        setError(null);
        return next;
      });
    }, 300);

    return () => window.clearTimeout(handle);
  }, [searchInput, setApplications]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    getApplications(offset, PAGE_SIZE, statusFilter ?? undefined, search || undefined)
      .then((data) => {
        if (cancelled) return;
        setApplications(data.results);
        setTotal(data.count);
      })
      .catch(() => {
        if (cancelled) return;
        setApplications([]);
        setTotal(0);
        setError("Não foi possível carregar as candidaturas.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [offset, statusFilter, search, setApplications]);

  const handleStatusFilter = (status: ApplicationStatus | null) => {
    if (status === statusFilter) return;
    setStatusFilter(status);
    setOffset(0);
    setApplications([]);
    setTotal(0);
    setLoading(true);
    setError(null);
  };

  // Cálculos do texto estilo Gmail ("1–10 de 47")
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + applications.length, total);

  const canGoPrevious = offset > 0;
  const canGoNext = offset + PAGE_SIZE < total;

  const handlePaginationPrevious = () => {
    setOffset((current) => Math.max(0, current - PAGE_SIZE));
  };

  const handlePaginationNext = () => {
    setOffset((current) =>
      current + PAGE_SIZE < total ? current + PAGE_SIZE : current,
    );
  };

  return (
    <div className="applications-card">
      <div className="applications-card-header">
        <h1>Candidaturas</h1>
        <div className="applications-search">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Pesquisar por vaga, empresa ou local"
            aria-label="Pesquisar candidaturas"
          />
        </div>
        <button
          type="button"
          className="applications-create-button"
          onClick={() => navigate("/application/create")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus preview-icon"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Nova candidatura
        </button>
      </div>
      <div className="applications-filters" role="group" aria-label="Filtrar por status">
        <button
          type="button"
          className={`applications-filter-badge applications-filter-badge--all${statusFilter === null ? " is-active" : ""}`}
          aria-pressed={statusFilter === null}
          onClick={() => handleStatusFilter(null)}
        >
          Todas
        </button>
        {APPLICATION_STATUSES.map((status) => (
          <button
            key={status.value}
            type="button"
            className={`applications-filter-badge applications-status--${status.value}${statusFilter === status.value ? " is-active" : ""}`}
            aria-pressed={statusFilter === status.value}
            onClick={() =>
              handleStatusFilter(
                statusFilter === status.value ? null : status.value,
              )
            }
          >
            {status.label}
          </button>
        ))}
      </div>
      <div className="applications-table-scroll">
      <table>
        <thead>
          <tr>
            <th>Título da Vaga</th>
            <th>Empresa</th>
            <th>Local</th>
            <th>Regime</th>
            <th>Status</th>
            <th>Data da Última Atualização</th>
          </tr>
        </thead>

        {applications.length > 0 ? (
          <tbody>
            {applications.map((application) => (
              <ApplicationRow
                key={application.id}
                id={application.id.toString()}
                jobTitle={application.job_title}
                companyName={application.company_name || ""}
                workModel={application.work_model}
                location={application.location || ""}
                status={application.status}
                appliedAt={application.applied_at || ""}
                createdAt={application.created_at}
                updatedAt={application.updated_at || ""}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="applications-table-empty">
              <td colSpan={6}>
                {loading
                  ? "Carregando candidaturas..."
                  : error
                    ? error
                    : search
                      ? "Nenhuma candidatura encontrada para essa pesquisa."
                      : statusFilter
                        ? "Nenhuma candidatura com esse status."
                        : "Nenhuma candidatura encontrada"}
              </td>
            </tr>
          </tbody>
        )}
      </table>
      </div>
      <div className="applications-pagination">
        <span className="applications-pagination-info">
          {from}–{to} de {total}
        </span>
        <div className="applications-pagination-actions">
          <button
            type="button"
            className="applications-pagination-button"
            disabled={!canGoPrevious || loading}
            aria-label="Página anterior"
            onClick={handlePaginationPrevious}
          >
            ‹
          </button>
          <button
            type="button"
            className="applications-pagination-button"
            disabled={!canGoNext || loading}
            aria-label="Próxima página"
            onClick={handlePaginationNext}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTable;
