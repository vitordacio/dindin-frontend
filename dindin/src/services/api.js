import axios from 'axios'

export default axios.create({
    baseURL: 'https://nice-jade-coypu-gown.cyclic.app',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})