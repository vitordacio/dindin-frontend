
import { useEffect, useState } from 'react'
import './styles.css'

const Filters = (props) => {
    const { setFiltering, filtering, setTransictions, categories, transictions } = props

    const [originalTransictions, setOriginalTransictions] = useState()
    const [filters, setFilters] = useState([])

    const handleColor = (category_id) => {
        return filters.find((filter_id) => filter_id === category_id)
    }

    const handleFilter = () => {
        const filtered = transictions.filter((transiction) => {
            for (let category_id of filters) {
                if (transiction.categoria_id === category_id) return transiction
            }
        })

        setTransictions(filtered)
        setFilters([])
    }

    const handleClean = () => {
        setTransictions(originalTransictions)
    }

    useEffect(() => {
        setOriginalTransictions(transictions)
        setFiltering(true)

        return () => {
            setFiltering(false)
        }
    }, [])

    return (
        <div className='filters'>
            <h2>Categoria</h2>
            <div className='filters-options'>
                {
                    categories &&
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
                <button style={{ backgroundColor: '#7978D9', color: '#fff' }} onClick={() => handleFilter()}>Aplicar Filtros</button>
            </div>
        </div>
    )
}

export default Filters