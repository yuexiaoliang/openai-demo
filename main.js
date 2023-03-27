import axios from 'axios';
import { OPENAI_CONFIG } from './constants';

getModels();

async function getModels() {
  try {
    const res = await axios.get(`${OPENAI_CONFIG.base}/v1/models`);

    setContent(JSON.stringify(res.data, null, 2));
  } catch (error) {
    setContent('error => ', error.toString());
  }
}

function setContent(data) {
  const pre = document.createElement('pre');
  pre.innerHTML = data;
  document.getElementById('app').appendChild(pre);
}
