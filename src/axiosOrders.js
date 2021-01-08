import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-dae8e.firebaseio.com/'
})

export default instance;