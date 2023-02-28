import { useState } from 'react'
import RegisterForm from '../RegisterForm'
import './styles.css'

const AddRegister = ({ categories }) => {
    const [registerForm, setRegisterForm] = useState(false)

    return (
        <>
            <button className='pointer' onClick={() => setRegisterForm(true)}>Adicionar Registro</button>
            {registerForm && <RegisterForm categories={categories} setRegisterForm={setRegisterForm} add />}
        </>
    )
}

export default AddRegister