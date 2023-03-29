import './styles.css'
import orderby from '../../assets/orderby.svg'
import TableLine from '../TableLine/index'
import { useState } from 'react'

const Table = (props) => {
    const { categories, transictions } = props
    const [sort, setSort] = useState(true)

    return (

        <>
            {categories.length && <div className='table'>
                <ul style={{ fontWeight: '700' }}>
                    <li style={{ minWidth: '100px' }}>Data <img className='order pointer' src={orderby} alt='order' onClick={() => setSort(!sort)} style={{ transform: `rotate(${sort ? '180deg' : '0'})` }} /></li>
                    <li style={{ minWidth: '130px' }}>Dia da semana</li>
                    <li style={{ minWidth: '210px' }}>Descrição</li>
                    <li style={{ minWidth: '120px' }}>Categoria</li>
                    <li style={{ minWidth: '125px' }}>Valor</li>
                    <li style={{ minWidth: '110px' }}></li>
                </ul>

                {sort ?
                    transictions.sort((a, b) => Date.parse(a.data) - Date.parse(b.data)).map((transiction) =>
                        <TableLine key={transiction.id} categories={categories} transiction={transiction} transictions={transictions} />)
                    :
                    transictions.sort((a, b) => Date.parse(b.data) - Date.parse(a.data)).map((transiction) =>
                        <TableLine key={transiction.id} categories={categories} transiction={transiction} transictions={transictions} />)
                }
            </div>}
        </>
    )
}

export default Table