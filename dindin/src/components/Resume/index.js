import './styles.css'

const Resume = ({ getTransitions }) => {


    return (
        <div className='resume'>
            <h1>Resumo</h1>
            <div className='resume-info column'>
                <label>Entradas<span style={{ color: '#645FFB' }}>R$ 200,00</span></label>
                <label>Saídas<span style={{ color: '#FA8C10' }}>R$ 70,50</span></label>
                <div />
                <label style={{ fontWeight: '700' }}>Saldo<span style={{ color: '#3A9FF1' }}>R$ 129,50</span></label>
            </div>
        </div>
    )
}

export default Resume