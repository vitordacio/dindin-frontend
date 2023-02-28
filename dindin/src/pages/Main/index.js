import './styles.css'
import logo from '../../assets/logo.svg'
import Avatar from '../../components/Avatar'
import filter from '../../assets/filter.svg'
import Table from '../../components/Table/index'
import AddRegister from '../../components/AddRegister/index'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import Filters from '../../components/Filters'
import Resume from '../../components/Resume'

const Main = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [user, setUser] = useState({})
    const [categories, setCategories] = useState([])
    const [getTransitions, setGetTransitions] = useState()


    const handleMain = async () => {
        const token = getItem('token')
        try {
            const { data: user } = await api.get('/usuario', { headers: { 'Authorization': `Bearer ${token}` } })
            setUser(user)

            const { data: category } = await api.get('/categoria', { headers: { 'Authorization': `Bearer ${token}` } })
            setCategories(category)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleMain()
    }, [])

    return (
        <>
            {(user, categories) &&
                <div className='container'>
                    <img src={logo} alt='logo' />
                    <Avatar user={user} />
                    <div className='top' />
                    <div className='main column'>
                        <div className='filter flex-center' onClick={() => setOpenFilter(!openFilter)}>
                            <img src={filter} alt='filter' />
                            <span>Filtrar</span>
                        </div>
                        {openFilter && <Filters categories={categories} />}

                        <div style={{ height: '100%' }} className='flex-center'>
                            {categories && <Table setGetTransitions={setGetTransitions} categories={categories} />}

                            <div className='resume-container'>
                                <Resume getTransitions={getTransitions} />
                                {categories && <AddRegister categories={categories} />}
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Main