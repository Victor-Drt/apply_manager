import "./styles.css";

interface DeleteApplicationModalProps {
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteApplicationModal = ({ onDelete, onCancel }: DeleteApplicationModalProps) => {
    return (
        <div className="modal" onClick={onCancel} role="presentation">
            <div
                className="modal-content"
                role="dialog"
                aria-labelledby="delete-application-title"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="delete-application-title" className="modal-title">Excluir candidatura</h2>
                <p className="modal-description">Essa ação não pode ser desfeita. Deseja excluir esta candidatura?</p>
                <div className="modal-actions">
                    <button type="button" className="modal-action-button" onClick={onCancel}>Cancelar</button>
                    <button type="button" className="modal-action-button modal-action-button--danger" onClick={onDelete}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteApplicationModal;
