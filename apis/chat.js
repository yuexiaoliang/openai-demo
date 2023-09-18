import { fetchEventSource } from '@microsoft/fetch-event-source';

import createMD from '../md';
import { OPENAI_CONFIG } from '../constants';

const md = createMD();

export async function startChat() {
  const askDom = document.querySelector('.ask');
  const answerDom = document.querySelector('.answer');

  const url = `${OPENAI_CONFIG.base}/v1/chat/completions`;

  let resText = '';
  await fetchEventSource(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      messages: [{ role: 'user', content: askDom.innerText }],
      // model: 'gpt-3.5-turbo',

      model: 'ft:gpt-3.5-turbo-0613:yuexiaoliang::7yH93UEm',
      stream: true
    }),

    onmessage(ev) {
      if (ev.data === '[DONE]') {
        console.log(`完整回答为：\n${resText}`);
        return;
      }

      const data = JSON.parse(ev.data);
      const { choices } = data;

      const arr = choices.filter((item) => item.finish_reason !== 'stop');

      arr.forEach((item) => {
        resText += item.delta.content;
      });

      answerDom.innerHTML = md.render(resText);
    }
  });
}
