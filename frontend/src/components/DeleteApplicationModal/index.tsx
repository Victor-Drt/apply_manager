import { useState } from "react";
import "./styles.css";

interface DeleteApplicationModalProps {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteApplicationModal = ({ onDelete, onCancel }: DeleteApplicationModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="modal" onClick={onCancel} role="presentation">
            <div
                className="modal-content"
                role="dialog"
                aria-labelledby="delete-application-title"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="delete-application-title" className="modal-title">Delete Application</h2>
                <p className="modal-description">Are you sure you want to delete this application?</p>
                {error ? <div className="modal-error">{error}</div> : null}
                <div className="modal-actions">
                    <button type="button" className="modal-action-button" onClick={onCancel}>Cancel</button>
                    <button type="button" className="modal-action-button" disabled={isLoading} onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteApplicationModal;
