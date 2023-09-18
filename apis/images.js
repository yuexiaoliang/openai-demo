import axios from 'axios';

export async function generateImages(prompt, n = 1) {
  const imagesDom = document.querySelector('.images-gen');

  const {
    data: { data }
  } = await axios.post(`/openai/v1/images/generations`, {
    prompt,
    n
  });

  data.forEach(({ url }) => {
    const img = document.createElement('img');

    img.src = url;
    img.attributes.alt = prompt;

    imagesDom.appendChild(img);
  });

  imagesDom.style.display = 'block';
}


export async function createImageEdit(image, n = 1) {
  const imagesDom = document.querySelector('.images-edit-new');
  const prompt = document.querySelector('#file-edit-input').value;

  const formData = new FormData();
  formData.append('image', image);
  formData.append('n', n);
  formData.append('prompt', prompt);

  const {
    data: { data }
  } = await axios.post(`/openai/v1/images/edits`, formData);

  data.forEach(({ url }, index) => {
    const img = document.createElement('img');

    img.src = url;
    img.attributes.alt = `新图-${index}`;

    imagesDom.appendChild(img);
  });

  imagesDom.style.display = 'block';
}

export function onEditFileChange(e) {
  const file = e.target.files[0];

  // 渲染图片
  const url = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = url
  img.attributes.alt = '上传的图片';

  const imagesDom = document.querySelector('.images-edit-old');
  imagesDom.appendChild(img)

  imagesDom.style.display = 'block';

  createImageEdit(file)
}

export async function createImageVariation(image, n = 1) {
  const imagesDom = document.querySelector('.images-variations-new');

  const formData = new FormData();
  formData.append('image', image);
  formData.append('n', n);

  const {
    data: { data }
  } = await axios.post(`/openai/v1/images/variations`, formData);

  data.forEach(({ url }, index) => {
    const img = document.createElement('img');

    img.src = url;
    img.attributes.alt = `新图-${index}`;

    imagesDom.appendChild(img);
  });

  imagesDom.style.display = 'block';
}

export function onVariationFileChange(e) {
  const file = e.target.files[0];

  // 渲染图片
  const url = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = url
  img.attributes.alt = '上传的图片';

  const imagesDom = document.querySelector('.images-variations-old');
  imagesDom.appendChild(img)

  imagesDom.style.display = 'block';

  createImageVariation(file)
}
