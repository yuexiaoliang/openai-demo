import http from '../request';

export async function generateImages(prompt, n = 1) {

  const res = await http.post(`/v1/images/generations`, {
    model: 'dall-e-3',
    prompt,
    n
  });

  return res;
}

export async function createImageEdit(form) {
  const _form = {
    n: 1,
    ...form
  }

  const formData = new FormData();
  for (const key in _form) {
    formData.append(key, _form[key])
  }

  return await http.post(`/v1/images/edits`, formData);
}

export async function createImageVariation(form, n = 1) {
  const _form = {
    n: 1,
    ...form
  }

  const formData = new FormData();
  for (const key in _form) {
    formData.append(key, _form[key])
  }

  return await http.post(`/v1/images/variations`, formData);
}
