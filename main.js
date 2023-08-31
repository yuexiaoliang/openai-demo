import { fetchEventSource } from '@microsoft/fetch-event-source';
import MarkdownIt from 'markdown-it';
import mdhljs from 'markdown-it-highlightjs';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { OPENAI_CONFIG } from './constants';

const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

md.use(mdhljs);

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
    model: 'gpt-3.5-turbo',
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
