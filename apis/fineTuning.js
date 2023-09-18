import axios from 'axios';

export function getFinTuningJobs() {
  return axios.get('/openai/v1/fine_tuning/jobs');
}

export function createFineTuningJob(training_file) {
  return axios.post('/openai/v1/fine_tuning/jobs', {
    training_file,
    model: 'gpt-3.5-turbo-0613'
  });
}

export function cancelFinTuningJob(id) {
  return axios.post(`/openai/v1/fine_tuning/jobs/${id}/cancel`);
}
