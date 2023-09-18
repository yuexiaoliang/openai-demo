export function queryFiles() {
  return axios.get(`/openai/v1/files`);
}
