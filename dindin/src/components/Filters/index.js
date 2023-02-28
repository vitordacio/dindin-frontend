
import './styles.css'

const Filters = ({ categories }) => {


    return (
        <div className='filters'>
            <h2>Categoria</h2>
            <div className='filters-options'>
                {categories && categories.map((filter) => <div>{filter.descricao} +</div>)}
            </div>
            <div className='filters-buttons'>
                <button>Limpar Filtros</button>
                <button style={{ backgroundColor: '#7978D9', color: '#fff' }}>Aplicar Filtros</button>
            </div>
        </div>
    )
}

export default Filters