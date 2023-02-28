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

    const handleLogout = (e) => {
        // e.stopPropagation()
        removeItem('token')
        navigate('/login')
    }

    return (
        <>
            <div className='avatar'>
                <img className='pointer' src={avatar} alt='avatar' onClick={() => setEditProfile(true)} />
                <span>{user.nome}</span>
                <img className='pointer' src={logout} alt='logout' onClick={(e) => handleLogout(e)} />
            </div>
            {editProfile && <EditProfile setEditProfile={setEditProfile} />}
        </>
    )
}

export default Avatar