import { useEffect, useState } from 'react'
import './styles.css'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

const Resume = ({ transictions }) => {
    const [extract, setExtract] = useState()

    const handleTransictions = async () => {
        try {
            const token = getItem('token')
            const { data } = await api.get('/transacao/extrato', { headers: { 'Authorization': `Bearer ${token}` } })
            setExtract(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleTransictions()
    }, [transictions, extract])

    return (
        <>
            {
                extract &&
                <div className='resume'>
                    <h1>Resumo</h1>
                    <div className='resume-info column'>
                        <label>Entradas<span style={{ color: '#645FFB' }}>
                            {`${(extract.entrada / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}`}
                        </span></label>
                        <label>Saídas<span style={{ color: '#FA8C10' }}>
                            {`${(extract.saida / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}`}
                        </span></label>
                        <div />
                        <label style={{ fontWeight: '700' }}>Saldo<span style={{ color: `${extract.entrada - extract.saida > 0 ? '#3A9FF1' : '#FF576B'}` }}>
                            {`${((extract.entrada - extract.saida) / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}`}
                        </span>
                        </label>
                    </div>
                </div>

            }
        </>
    )
}

export default Resume