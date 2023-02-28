import './styles.css'
import logo from '../../assets/logo.svg'
import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ nome: '', email: '', senha: '' })
    const [confirmarSenha, setconfirmarSenha] = useState('')
    const [error, setError] = useState('')

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { nome, email, senha } = form

        if (!nome || !email || !senha || !confirmarSenha) {
            return setError('Todos os campos são obrigatórios')
        }

        if (senha !== confirmarSenha) {
            return setError('As senhas não são iguais. Tente novamente.')
        }

        try {
            await api.post('/usuario', form)

            navigate('/login')
        } catch (error) {
            return setError(error.response.data.mensagem)
        }
    }

    return (
        <div className='signup container background flex-center' >
            <img src={logo} alt='logo' />
            <form onSubmit={handleSubmit} className='signup-form'>
                <h1>Cadastre-se</h1>
                <div>
                    <label>Nome</label>
                    <input type='text' name='nome' value={form.nome} onChange={(e) => handleForm(e)} />
                    <label>E-mail</label>
                    <input type='text' name='email' value={form.email} onChange={(e) => handleForm(e)} />
                    <label>Senha</label>
                    <input type='password' name='senha' value={form.senha} onChange={(e) => handleForm(e)} />
                    <label>Confirmação de senha</label>
                    <input type='password' value={confirmarSenha} onChange={(e) => setconfirmarSenha(e.target.value)} />
                </div>
                <button>Cadastre-se</button>
                <p onClick={() => navigate('/login')}>Já tem cadastro? Clique aqui!</p>
                {error && <span>{error}</span>}
            </form>
        </div>
    )
}

export default SignUp