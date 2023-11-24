import './style.scss';

import createMD from './md';
import { elementToHtmlString, getValueDom, resToUrl, getElementByAttr, dataToImagesHtmlStr } from './utils'

import { startChat, startChatNoStream } from './apis/chat'
import { createAudioSpeech } from './apis/audio'
import { generateImages, createImageEdit, createImageVariation } from './apis/images';

window.addEventListener('click', async (e) => {
  const target = e.target;
  if (target.tagName !== 'BUTTON') return;

  const ancestor = target.closest('[data-action]');
  if (!ancestor) return;

  const action = ancestor.getAttribute('data-action');

  const events = {
    'chat': chat,
    'chat-vision': chatVision,
    'audio-speech': textToAudio,
    'image-generate': textToImage,
    'image-edit': imageEdit,
    'image-variation': imageVariation
  }
  if (!events[action]) return;

  const replyDom = ancestor.querySelector('.reply');
  replyDom.innerHTML = '请稍等...'

  const value = await events[action]();
  if (value) {
    replyDom.innerHTML = value
  }
})


window.addEventListener('change', (e) => {
  const target = e.target;
  if (target.tagName !== 'INPUT') return;

  const ancestor = target.closest('[data-action]');
  if (!ancestor) return;

  const files = e.target.files;
  const uploadWrap = ancestor.querySelector('.upload-images');

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url
    img.attributes.alt = '上传的图片';

    uploadWrap.appendChild(img)
  }
});

async function chat() {
  const [valueDom, replyDom] = getValueDom('chat')
  const md = createMD();

  startChat(valueDom.value, (val) => {
    replyDom.innerHTML = md.render(val);
  })

  return false
}

async function chatVision() {

  const parent = getElementByAttr('data-action', 'chat-vision')
  const filesInput = parent.querySelector('.file-input');

  const image = filesInput.files[0]
  if (!image) {
    alert('请上传图片')
    return
  }
  const base64 = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      resolve(reader.result);
    };
  });

  const [valueDom, replyDom] = getValueDom('chat-vision')

  if (!valueDom.value) {
    alert('请输入内容')
    return
  }

  const md = createMD();

  const value = [
    { type: 'text', text: valueDom.value, },
    { type: 'image_url', image_url: { url: base64 } }
  ]

  startChatNoStream(value, (val) => {
    replyDom.innerHTML = md.render(val);
  }, 'gpt-4-vision-preview')

  return false
}

async function textToAudio() {
  const [valueDom] = getValueDom('audio-speech')

  const res = await createAudioSpeech(valueDom.value)

  const audio = new Audio();
  audio.src = resToUrl(res);
  audio.controls = true;

  return elementToHtmlString(audio);
}

async function textToImage() {
  const [valueDom] = getValueDom('image-generate')

  const {
    data: { data }
  } = await generateImages(valueDom.value)

  return dataToImagesHtmlStr(data)
}

async function imageVariation() {
  const parent = getElementByAttr('data-action', 'image-variation')
  const filesInput = parent.querySelector('.file-input');

  const image = filesInput.files[0]
  if (!image) {
    alert('请上传图片')
    return
  }

  const {
    data: { data }
  } = await createImageVariation({
    image,
  })

  return dataToImagesHtmlStr(data)
}

async function imageEdit() {
  const [valueDom] = getValueDom('image-edit')
  const parent = getElementByAttr('data-action', 'image-edit')
  const filesInput = parent.querySelector('.file-input');

  const image = filesInput.files[0]
  if (!image) {
    alert('请上传图片')
    return
  }

  const {
    data: { data }
  } = await createImageEdit({
    image,
    prompt: valueDom.value
  })

  return dataToImagesHtmlStr(data)
}