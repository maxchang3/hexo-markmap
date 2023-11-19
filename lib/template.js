const { mixin } = require('./mixiner')

const fixSVGAttrNaNTemplate =  /*javascript*/`const patchNaNChecker = () => {
    window.markmap.Markmap = class PatchMarkmap extends window.markmap.Markmap {
      handleZoom(t) {
        const {transform: e} = t
        if(Object.values(e).some(v=>isNaN(v))) e.k = 0, e.x = 0, e.y = 0
        this.g.attr("transform", e)
      }
      static create(svg, opts, data) {
        const r = new PatchMarkmap(svg, opts)
        return data && (r.setData(data), r.fit()), r
      }
    }
  }
`

const loadKaTeXTemplate = /*javascript*/`
    await loadScript(CDN.js.webfont_js)
    WebFont.load({
      custom: {
        families: ["KaTeX_AMS", "KaTeX_Caligraphic:n4,n7", "KaTeX_Fraktur:n4,n7", "KaTeX_Main:n4,n7,i4,i7", "KaTeX_Math:i4,i7", "KaTeX_Script", "KaTeX_SansSerif:n4,n7,i4", "KaTeX_Size1", "KaTeX_Size2", "KaTeX_Size3", "KaTeX_Size4", "KaTeX_Typewriter"]
      }
    })
`

const basicStlye = /*html*/`<style>.markmap-container{display:flex;justify-content:center;margin:0 auto;width:90%;height:500px}.markmap-container svg{width:100%;height:100%}@media(max-width:768px){.markmap-container{height:400px}}</style>`

const mainTemplate = ({ pjaxEnable, katexEnable, highlightEnable, userCDN, lockView, fixSVGAttrNaN, JSONOptions }) => /* javascript */`
  const CDN = ${mixin({ katexEnable, highlightEnable, userCDN })}
  const debounce = (callback, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => callback.apply(this, args), wait)
    }
  }
  const loadElement = (elname, attr) => {
    const el = document.createElement(elname)
    for (let [name, value] of Object.entries(attr)) {
      el[name] = value
    }
    document.body.appendChild(el);
    return new Promise((res, rej) => {
      el.onload = res
      el.onerror = rej
    })
  }
  const loadScript = (url) => loadElement('script', { 'src': url,  })
  const loadCSS = (url) => loadElement('link', { 'href': url, 'rel': "stylesheet", 'crossorigin':"anonymous"})
  const loadBasicStyle = (style) => document.head.insertAdjacentHTML("beforeend", '${basicStlye}')
  const loadExtStyle = () => Promise.all(CDN.css.map(loadCSS))
  const initMarkmap = async () => {
    const markmapResize = new CustomEvent('markmapResize')
    const robserver = new ResizeObserver((entries) => {
        entries.forEach(entry => entry.target.dispatchEvent(markmapResize))
    })
    ${pjaxEnable ? /* javascript */`document.addEventListener("pjax:send", () => { robserver.disconnect() })` : ''}
    const autoFit = (el, obj) => {
        robserver.observe(el.parentNode)
        el.parentNode.addEventListener('markmapResize', debounce(() => obj.fit(), 100))
    }
    const createMarkmap = () => {
        document.querySelectorAll('.markmap-container>svg').forEach(el => {
          let obj = markmap.Markmap.create(el, { autoFit: true, ...markmap.deriveOptions(${JSONOptions})}, JSON.parse(el.getAttribute('data')))
          autoFit(el, obj)
          ${lockView ? /* javascript */`obj.svg.on('wheel.zoom', null).on('mousedown.zoom', null).on('touchstart.zoom', null)` : ''}
        })
    }
    ${fixSVGAttrNaN ? fixSVGAttrNaNTemplate : ''}
    if (window.markmap && Object.keys(window.markmap).length != 0) { createMarkmap(); return }
    loadExtStyle()
    loadBasicStyle()
    ${katexEnable ? loadKaTeXTemplate : ""}
    await loadScript(CDN.js.d3)
    await loadScript(CDN.js.markmap_view)
    ${fixSVGAttrNaN ? /*javascript*/`patchNaNChecker()` : ""}
    createMarkmap()
  }
  if(document.querySelector('.markmap-container')) { initMarkmap() }
  ${pjaxEnable ? /*javascript*/`document.addEventListener("pjax:complete", initMarkmap)` : ''}
`

const containerTemplate = (svgData, { height }) => /*html*/`
<div class="markmap-container" style="height:${height}">
  <svg data="${escapeData(JSON.stringify(svgData))}"></svg>
</div>
`

const scriptTemplate = (root) => /*html*/`<script src="${root}js/markmap.js"></script>`

const escapeData = (s) =>
  !s ? "" : s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\'/g, "&#39;")
    .replace(/\"/g, "&quot;")

const afterRender = (content, html, { pjaxEnable }) => {
  // ref: https://blog.hvnobug.com/post/hexo-script#after_render
  if (pjaxEnable || /<\/body>/gi.test(content) && /<div class="[^"]*?markmap[^"]*?"/gi.test(content)) {
    const lastIndex = content.lastIndexOf('</body>')
    return content.substring(0, lastIndex) + html + content.substring(lastIndex, content.length)
  }
  return content
}

module.exports = { mainTemplate, containerTemplate, scriptTemplate, afterRender }
