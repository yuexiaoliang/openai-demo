import { fetchEventSource } from '@microsoft/fetch-event-source';
import http from '../request'

import { OPENAI_CONFIG } from '../constants';

export async function startChatNoStream(value, call, model = 'gpt-3.5-turbo') {
  const { data } = await http.post(`/v1/chat/completions`, {
    messages: [{ role: 'user', content: value }],
    model,
    max_tokens: 4096
  });

  const { choices } = data;
  const [{ message }] = choices

  call & call(message.content)

  return res
}

export async function startChat(value, call, model = 'gpt-3.5-turbo') {
  const url = `${OPENAI_CONFIG.base}/v1/chat/completions`;

  let resText = '';
  await fetchEventSource(url, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      messages: [{ role: 'user', content: value }],
      model,
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
        if (item.delta.content) resText += item.delta.content;
      });

      call & call(resText)
    }
  });
}
