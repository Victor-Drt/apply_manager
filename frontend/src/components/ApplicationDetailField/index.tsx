import type { ChangeEvent } from 'react';
import './styles.css'

export interface ApplicationDetailFieldProps {
    label: string;
    value: string;
    disabled?: boolean;
    wide?: boolean;
    name?: string;
    error?: string;
    required?: boolean;
    inputType?: string;
    maxLength?: number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationDetailField = ({
    label,
    value,
    disabled = false,
    wide = false,
    name,
    error,
    required = false,
    inputType = 'text',
    maxLength,
    onChange,
}: ApplicationDetailFieldProps) => {
    const fieldId = label.toLowerCase().replace(/\s+/g, '-')
    const fieldName = name ?? fieldId.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
    const errorId = `${fieldId}-error`

    return (
        <div className={wide ? 'application-detail-field application-detail-field-wide' : 'application-detail-field'}>
            <label htmlFor={fieldId}>{label}{required ? ' *' : ''}</label>
            <input
                id={fieldId}
                name={fieldName}
                type={inputType}
                placeholder={label}
                disabled={disabled}
                value={value}
                onChange={onChange}
                required={required}
                maxLength={maxLength}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={error ? 'is-invalid' : undefined}
            />
            {error ? <span id={errorId} className="application-detail-field-error">{error}</span> : null}
        </div>
    );
}

export default ApplicationDetailField;
