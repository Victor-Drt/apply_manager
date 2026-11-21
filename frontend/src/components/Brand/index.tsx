interface BrandProps {
    size?: 'sidebar' | 'topbar' | 'hero'
}

const Brand = ({ size = 'sidebar' }: BrandProps) => {
    return (
        <span className={`brand brand--${size}`}>
            <svg
                className="brand__mark"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
            >
                <rect x="4" y="3" width="16" height="20" rx="2.5" stroke="#2563eb" strokeWidth="2" />
                <path d="M8 9h8M8 13h5" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M7 27.5 14 19l4 3.2L27 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.5 9H27v5.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="brand__name">
                Minha <span>Vaga</span>
            </span>
        </span>
    )
}

export default Brand
