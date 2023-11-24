import axios from 'axios';
import { OPENAI_CONFIG } from './constants';

const http = axios.create({
  baseURL: OPENAI_CONFIG.base,
})

export default http