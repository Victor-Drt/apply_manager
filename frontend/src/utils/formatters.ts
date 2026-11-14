// Formata um número (ex: 5000.5) para exibição visual (ex: "R$ 5.000,50")
export function formatCurrency(value: number): string {
    if (!value) return '';
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

// Extrai os dígitos digitados e converte para número decimal (ex: "R$ 5.000,50" -> 5000.5)
export function parseCurrencyToNumber(rawValue: string): number {
    const digits = rawValue.replace(/\D/g, "");
    if (!digits) return 0;
    return Number(digits) / 100;
}

export function formatApplicationDate(value: string | null | undefined) {
    if (!value) {
        return ''
    }

    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
        return value.slice(0, 10)
    }

    return date.toLocaleDateString('pt-BR')
}
