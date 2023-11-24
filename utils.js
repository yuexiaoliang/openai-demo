export const downloadFileByRes = (res, filename = 'test.mp3') => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = resToUrl(res)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}

export function resToUrl(res) {
  if (!res) return

  const { data } = res
  if (!data) return

  return window.URL.createObjectURL(new Blob([data]))
}

export function elementToHtmlString(element) {
  return element.outerHTML;
}

export function getElementByAttr(attr, value) {
  return document.querySelector(`[${attr}="${value}"]`);
}

export function getValueDom(className) {
  const parent = getElementByAttr('data-action', className);
  return [parent.querySelector(`.value`), parent.querySelector(`.reply`)];
}

export function dataToImagesHtmlStr(data) {
  let html = ''
  data.forEach(({ url }) => {
    const img = document.createElement('img');

    img.src = url;
    img.attributes.alt = prompt;

    html += elementToHtmlString(img);
  });

  return html
}
