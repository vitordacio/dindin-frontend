import './styles.css'
import orderby from '../../assets/orderby.svg'
import api from '../../services/api'
import TableLine from '../TableLine/index'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'

const Table = (props) => {
    const { setGetTransitions, categories } = props
    const [transictions, setTransictions] = useState([])

    const handleTransictions = async () => {
        try {
            const token = getItem('token')
            const { data } = await api.get('/transacao', { headers: { 'Authorization': `Bearer ${token}` } })
            setTransictions(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setGetTransitions(transictions)
        handleTransictions()
    }, [transictions])

    return (
        <div className='table'>
            <ul style={{ fontWeight: '700' }}>
                <li style={{ minWidth: '100px' }}>Data <img className='order' src={orderby} alt='order' /></li>
                <li style={{ minWidth: '130px' }}>Dia da semana</li>
                <li style={{ minWidth: '210px' }}>Descrição</li>
                <li style={{ minWidth: '120px' }}>Categoria</li>
                <li style={{ minWidth: '125px' }}>Valor</li>
                <li style={{ minWidth: '110px' }}></li>
            </ul>
            {transictions && transictions.map((transiction) => <TableLine key={transiction.id} categories={categories} transiction={transiction} />)}
        </div>
    )
}

export default Table