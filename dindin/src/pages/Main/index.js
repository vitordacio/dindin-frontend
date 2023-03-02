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
    const [transictions, setTransictions] = useState([])
    const [filtering, setFiltering] = useState(false)

    const handleMain = async () => {
        const token = getItem('token')
        try {
            const { data: user } = await api.get('/usuario', { headers: { 'Authorization': `Bearer ${token}` } })
            setUser(user)

            const { data: category } = await api.get('/categoria', { headers: { 'Authorization': `Bearer ${token}` } })
            setCategories(category)

            const { data: transictions } = await api.get('/transacao', { headers: { 'Authorization': `Bearer ${token}` } })
            setTransictions(transictions)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (filtering) return

        if (!filtering) handleMain()
    }, [user, transictions, filtering])

    return (
        <div className='container'>
            <img src={logo} alt='logo' />
            <Avatar user={user} />
            <div className='top' />
            <div className='main column'>
                <div className='filter flex-center' onClick={() => setOpenFilter(!openFilter)}>
                    <img src={filter} alt='filter' />
                    <span>Filtrar</span>
                </div>

                {
                    openFilter && <Filters setFiltering={setFiltering} filtering={filtering} setTransictions={setTransictions} transictions={transictions} categories={categories} />
                }

                {
                    categories.length
                        ?
                        <div style={{ height: '100%' }} className='flex-center'>
                            <Table transictions={transictions} categories={categories} />
                            <div className='resume-container'>
                                <Resume transictions={transictions} />
                                <AddRegister categories={categories} />
                            </div>
                        </div>
                        :
                        ''
                }
            </div>
        </div>
    )
}

export default Main