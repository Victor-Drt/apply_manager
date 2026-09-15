type NaoFoiPossivelProps = {
    message: string
    isError?: boolean
}

const NaoFoiPossivel = ({ message, isError = false }: NaoFoiPossivelProps) => {
    return (
        <p role={isError ? 'alert' : 'status'}>{message}</p>
    )
}

export default NaoFoiPossivel;