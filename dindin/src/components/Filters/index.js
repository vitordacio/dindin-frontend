
import { useEffect, useState } from 'react'
import './styles.css'

const Filters = (props) => {
    const { setTransictions, categories, transictions } = props


    const [originalTransictions, setOriginalTransictions] = useState()
    const [filters, setFilters] = useState([])




    const handleColor = (a) => {
        return filters.find((x) => x === a)
    }

    const handleFilter = () => {

        const a = transictions.filter((transiction) => {
            for (let i of filters) {
                if (transiction.categoria_id === i) return transiction
            }
        })

        setTransictions(a)
        setFilters([])
    }

    const handleClean = () => {
        setTransictions(originalTransictions)
    }

    useEffect(() => {
        setOriginalTransictions(transictions)
    }, [])

    return (
        <div className='filters'>
            <h2>Categoria</h2>
            <div className='filters-options'>
                {categories &&
                    categories.map((category) =>
                        <div key={category.id}
                            onClick={() => {
                                setFilters((filters) => ([...filters, category.id]));
                            }}
                            style={handleColor(category.id) ? { backgroundColor: '#7978D9', color: '#fff' } : { backgroundColor: '#FAFAFA', color: '#000' }}
                        >
                            {category.descricao} +
                        </div>)
                }
            </div>
            <div className='filters-buttons'>
                <button onClick={handleClean}>Limpar Filtros</button>
                <button style={{ backgroundColor: '#7978D9', color: '#fff' }} onClick={handleFilter}>Aplicar Filtros</button>
            </div>
        </div>
    )
}

export default Filters