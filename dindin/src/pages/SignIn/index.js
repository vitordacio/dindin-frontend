import './styles.css'
import logo from '../../assets/logo.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { getItem, setItem } from '../../utils/storage'

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !senha) {
            return setError('Todos os campos são obrigatórios')
        }

        try {
            const { data } = await api.post('/login', { email, senha })

            const { token } = data
            setItem('token', token)

            navigate('/main')
        } catch (error) {
            return setError(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        if (getItem('token')) {
            navigate('/main')
        }
    }, [navigate])

    return (
        <div className='signin container background flex-center'>
            <img src={logo} alt='logo' />
            <div className='signin-description flex-center column'>
                <h1>Controle suas <span>finanças</span>, sem planilha chata.</h1>
                <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                <button onClick={() => navigate('/signup')}>Cadastre-se</button>
            </div>
            <div className='signin-form flex-center'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <label>E-mail</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type='password' value={senha} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button>Entrar</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
        </div>
    )
}

export default SignIn