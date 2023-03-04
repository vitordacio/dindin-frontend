import './styles.css'
import edit from '../../assets/edit.svg'
import erase from '../../assets/erase.svg'
import { useEffect, useState } from 'react'
import RegisterForm from '../RegisterForm'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

const TableLine = (props) => {
    const { categories, transiction, transictions } = props
    const [deleteItem, setDeleteItem] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)

    const [data, setData] = useState({})


    const handleData = () => {

        const fullDate = transiction.data.split('T')[0]
        const date = `${fullDate.split('-')[2]}/${fullDate.split('-')[1]}/${fullDate.split('-')[0]}`

        const category = categories.find((category) => category.id === transiction.categoria_id)

        let stringDay = ''
        const day = new Date(transiction.data).getDay()
        if (day === 0) stringDay = 'Domingo'
        if (day === 1) stringDay = 'Segundo'
        if (day === 2) stringDay = 'Terça'
        if (day === 3) stringDay = 'Quarta'
        if (day === 4) stringDay = 'Quinta'
        if (day === 5) stringDay = 'Sexta'
        if (day === 6) stringDay = 'Sabado'

        setData({
            data: date,
            dia: stringDay,
            descricao: transiction.descricao,
            categoria: category.descricao,
            valor: (transiction.valor / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
        })
    }

    const handleDelete = async () => {
        try {
            const token = getItem('token')
            await api.delete(`/transacao/${transiction.id}`, { headers: { 'Authorization': `Bearer ${token}` } })

            setDeleteItem(false)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleData()
    }, [transictions])

    return (
        <>
            {(data, transictions) &&
                <ul style={{ position: 'relative' }}>
                    <li style={{ minWidth: '100px', fontWeight: '700' }}>{data.data}</li>
                    <li style={{ minWidth: '130px' }}>{data.dia}</li>
                    <li style={{ minWidth: '210px' }}>{data.descricao}</li>
                    <li style={{ minWidth: '120px' }}>{data.categoria}</li>
                    <li style={{ minWidth: '125px', color: `${transiction.tipo === 'entrada' ? '#3A9FF1' : '#FF576B'}` }}>
                        {data.valor}</li>
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
                </ul>}
        </>
    )
}

export default TableLine