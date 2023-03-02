import './styles.css'
import { useEffect, useState } from 'react'
import closebtn from '../../assets/closebtn.svg'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

const RegisterForm = (props) => {
    const { transiction, categories, setRegisterForm, add } = props

    const [form, setForm] = useState({ tipo: 'saida', valor: '', categoria_id: '', data: '', descricao: '' })
    const [register, setRegister] = useState('')
    const [entry, setEntry] = useState(false)
    const [exit, setExit] = useState(true)
    const [newValue, setNewValue] = useState()
    const [newDate, setNewDate] = useState()
    const [newCategory, setNewCategory] = useState()
    const [formatedForm, setFormatedForm] = useState({})

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEntry = () => {
        setEntry(true)
        setExit(false)
        setForm({ ...form, tipo: 'entrada' })
    }

    const handleExit = () => {
        setExit(true)
        setEntry(false)
        setForm({ ...form, tipo: 'saida' })
    }

    const formatForm = () => {
        const { valor, data, categoria_id } = form

        if (valor) {
            const formatedValue = Number(valor).toFixed(2)
            setNewValue(Number(formatedValue.split('.')[0] + formatedValue.split('.')[1]))
        }

        if (data) {
            const formatedDate = new Date(data.split('-')[0].slice(0, 4), data.split('-')[1] - 1, data.split('-')[2]);
            setNewDate(formatedDate.toISOString())
        }

        if (categoria_id) {
            const formatedCategory = categories.find((category) => category.descricao === categoria_id)
            setNewCategory(formatedCategory.id)
        }


        setFormatedForm({
            ...form,
            valor: newValue,
            data: newDate,
            categoria_id: newCategory
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { valor, categoria_id, data, descricao } = form

        if (!valor || !categoria_id || !data || !descricao) {
            return setRegister('Todos os campos são obrigatórios')
        }

        const token = getItem('token')

        if (!add) {
            try {

                await api.put(`/transacao/${transiction.id}`, formatedForm, { headers: { 'Authorization': `Bearer ${token}` } })

                setRegisterForm(false)
                return
            } catch (error) {
                return setRegister('Erro interno do servidor')
            }
        }

        try {

            await api.post('/transacao', formatedForm, { headers: { 'Authorization': `Bearer ${token}` } })

            setRegisterForm(false)
        } catch (error) {
            return setRegister('Erro interno do servidor')
        }
    }

    useEffect(() => {
        formatForm()
    }, [form])

    return (
        <div className='container form-bg' style={{ zIndex: '2' }}>
            <form style={{ borderRadius: '20px', zIndex: '2' }} onSubmit={handleSubmit}>
                <img className='pointer' src={closebtn} alt='close' onClick={() => setRegisterForm(false)} />
                <h1 style={{ color: '#000' }}>{add ? 'Adicionar Registro' : 'Editar Registro'}</h1>
                <div className='type'>
                    <div className='flex-center pointer' style={{ backgroundColor: `${entry ? '#3A9FF1' : '#B9B9B9'}` }} onClick={handleEntry}>Entrada</div>
                    <div className='flex-center pointer' style={{ backgroundColor: `${exit ? '#FF576B' : '#B9B9B9'}` }} onClick={handleExit}>Saída</div>
                </div>
                <div>
                    <label>Valor</label>
                    <input type='number' name='valor' value={form.valor} onChange={(e) => handleForm(e)} />
                    <label>Categoria</label>
                    <select name="categoria_id" onChange={(e) => handleForm(e)}>
                        <option value=""></option>
                        {categories && categories.map((category) => <option key={category.id} value={category.descricao}>{category.descricao}</option>)}
                    </select>
                    <label>Data</label>
                    <input type='date' name='data' value={form.data} onChange={(e) => handleForm(e)} />
                    <label>Descrição</label>
                    <input type='text' name='descricao' value={form.descricao} onChange={(e) => handleForm(e)} />


                </div>
                <button>Confirmar</button>
                {register && <span>{register}</span>}
            </form>
        </div>
    )
}

export default RegisterForm