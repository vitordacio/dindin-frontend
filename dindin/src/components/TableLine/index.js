import './styles.css'
import edit from '../../assets/edit.svg'
import erase from '../../assets/erase.svg'
import { useState } from 'react'
import RegisterForm from '../RegisterForm'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

const TableLine = (props) => {
    const { categories, transiction } = props
    const [deleteItem, setDeleteItem] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)

    const date = `${transiction.data.split('T')[0].split('-')[2]}/${transiction.data.split('T')[0].split('-')[1]}/${transiction.data.split('T')[0].split('-')[0]}`

    const handleTest = () => {
        return categories.find((category) => category.id === transiction.categoria_id).descricao
    }

    const handleDay = () => {
        const day = new Date(transiction.data).getDay()
        if (day === 0) return 'Domingo'
        if (day === 1) return 'Segunda'
        if (day === 2) return 'Terça'
        if (day === 3) return 'Quarta'
        if (day === 4) return 'Quinta'
        if (day === 5) return 'Sexta'
        if (day === 6) return 'Sabado'
    }
    const token = getItem('token')

    const handleDelete = async () => {
        try {
            await api.delete(`/transacao/${transiction.id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            setDeleteItem(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ul style={{ position: 'relative' }}>
            <li style={{ minWidth: '100px', fontWeight: '700' }}>{date}</li>
            <li style={{ minWidth: '130px' }}>{handleDay()}</li>
            <li style={{ minWidth: '210px' }}>{transiction.descricao}</li>
            <li style={{ minWidth: '120px' }}>{handleTest()}</li>
            <li style={{ minWidth: '125px', color: `${transiction.tipo === 'entrada' ? '#3A9FF1' : '#FF576B'}` }}>{`${(transiction.valor / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}`}</li>
            <li style={{ minWidth: '110px', gap: '.7rem' }}>
                <img className='pointer' src={edit} alt='edit' onClick={() => setRegisterForm(true)} />
                <img className='pointer' src={erase} alt='erase' onClick={() => setDeleteItem(true)} />
            </li>

            {
                registerForm &&
                <RegisterForm transiction={transiction} categories={categories} setRegisterForm={setRegisterForm} />
            }

            {
                deleteItem &&
                <div className='delete-item flex-center column'>
                    <p>Apagar item?</p>
                    <div className='delete-buttons flex-center'>
                        <button style={{ backgroundColor: '#3A9FF1' }} onClick={handleDelete}>Sim</button>
                        <button style={{ backgroundColor: '#FF576B' }} onClick={() => setDeleteItem(false)}>Não</button>
                    </div>
                </div>
            }
        </ul>
    )
}

export default TableLine