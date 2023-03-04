import './styles.css'
import avatar from '../../assets/avatar.svg'
import logout from '../../assets/logout.svg'
import EditProfile from '../EditProfile/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeItem } from '../../utils/storage'

const Avatar = ({ user }) => {
    const navigate = useNavigate()
    const [editProfile, setEditProfile] = useState(false)

    const handleLogout = () => {
        removeItem('token')
        navigate('/login')
    }

    return (
        <>
            {user && <div className='avatar'>
                <img className='pointer' src={avatar} alt='avatar' onClick={() => setEditProfile(true)} />
                <span>{user.nome}</span>
                <img className='pointer' src={logout} alt='logout' onClick={() => handleLogout()} />
            </div>}
            {editProfile && <EditProfile user={user} setEditProfile={setEditProfile} />}
        </>
    )
}

export default Avatar