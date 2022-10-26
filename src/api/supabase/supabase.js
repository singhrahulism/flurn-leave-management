import axios from 'axios'
import { API_KEY } from '../../constants/apiConstants'

const supabase = axios.create({
    baseURL: 'https://dkgicggupnrxldwvkeft.supabase.co',
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
})

export default supabase