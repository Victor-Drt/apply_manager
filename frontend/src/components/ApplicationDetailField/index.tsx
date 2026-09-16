import type { ChangeEvent } from 'react';

export interface ApplicationDetailFieldProps {
    label: string;
    value: string;
    disabled?: boolean;
    wide?: boolean;
    name?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ApplicationDetailField = ({ label, value, disabled = false, wide = false, name, onChange }: ApplicationDetailFieldProps) => {
    const fieldId = label.toLowerCase().replace(/\s+/g, '-')
    const fieldName = name ?? fieldId.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

    return (
        <div className={wide ? 'application-detail-field application-detail-field-wide' : 'application-detail-field'}>
            <label htmlFor={fieldId}>{label}</label>
            <input
                id={fieldId}
                name={fieldName}
                type="text"
                placeholder={label}
                disabled={disabled}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default ApplicationDetailField;
