import { getApplicationStatusLabel } from '../../types/api/application'
import './styles.css'

interface StatusBadgeProps {
    status: string
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    return (
        <span className={`status-badge status-badge--${status}`}>
            {getApplicationStatusLabel(status)}
        </span>
    )
}

export default StatusBadge
