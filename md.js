import MarkdownIt from 'markdown-it';
import mdhljs from 'markdown-it-highlightjs';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export default function createMD() {
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
  return md;
}
