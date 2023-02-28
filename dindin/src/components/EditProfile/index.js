import './styles.css'
import { useState } from 'react'
import closebtn from '../../assets/closebtn.svg'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

const EditProfile = ({ setEditProfile }) => {
    const [form, setForm] = useState({ nome: '', email: '', senha: '' })
    const [confirmPassword, setconfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { nome, email, senha } = form

        if (!nome || !email || !senha) {
            return setError('Todos os campos são obrigatórios')
        }

        if (senha !== confirmPassword) {
            return setError('As senhas não são iguais. Tente novamente.')
        }

        try {
            const token = getItem('token')
            await api.put('/usuario', form, { headers: { 'Authorization': `Bearer ${token}` } })

            setEditProfile(false)
        } catch (error) {
            return setError(error.response.data.mensagem)
        }

    }

    return (
        <div className='container form-bg' style={{ zIndex: '2' }}>
            <form style={{ borderRadius: '20px', zIndex: '2' }} onSubmit={handleSubmit}>
                <img className='pointer' src={closebtn} alt='close' onClick={() => setEditProfile(false)} />
                <h1 style={{ color: '#555555' }}>Editar Perfil</h1>
                <div>
                    <label>Nome</label>
                    <input type='text' name='nome' value={form.nome} onChange={(e) => handleForm(e)} />
                    <label>E-mail</label>
                    <input type='text' name='email' value={form.email} onChange={(e) => handleForm(e)} />
                    <label>Senha</label>
                    <input type='password' name='senha' value={form.senha} onChange={(e) => handleForm(e)} />
                    <label>Confirmação de senha</label>
                    <input type='password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                </div>
                <button>Confirmar</button>
                {error && <span>{error}</span>}
            </form>
        </div>
    )
}

export default EditProfile