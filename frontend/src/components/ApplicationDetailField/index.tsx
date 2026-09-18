import type { ChangeEvent } from 'react';
import './styles.css'

export interface ApplicationDetailFieldOption {
    value: string;
    label: string;
}

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
    options?: readonly ApplicationDetailFieldOption[];
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
    options,
    onChange,
}: ApplicationDetailFieldProps) => {
    const fieldName = name ?? label
        .toLowerCase()
        .replace(/\s+([a-z])/g, (_, letter: string) => letter.toUpperCase())
        .replace(/\s+/g, '')
    const fieldId = fieldName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    const errorId = `${fieldId}-error`
    const fieldClassName = error ? 'is-invalid' : undefined

    return (
        <div className={wide ? 'application-detail-field application-detail-field-wide' : 'application-detail-field'}>
            <label htmlFor={fieldId}>{label}{required ? ' *' : ''}</label>
            {options ? (
                <select
                    id={fieldId}
                    name={fieldName}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    required={required}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClassName}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
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
                    className={fieldClassName}
                />
            )}
            {error ? <span id={errorId} className="application-detail-field-error">{error}</span> : null}
        </div>
    );
}

export default ApplicationDetailField;
