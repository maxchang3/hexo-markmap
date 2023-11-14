const mixin = ({ katexEnable, highlightEnable, userCDN }) => {
    const CDN = { js: {}, css: [] }
    CDN.js.d3 = userCDN?.d3_js || 'https://fastly.jsdelivr.net/npm/d3@6'
    CDN.js.markmap_view = userCDN?.markmap_view_js || 'https://fastly.jsdelivr.net/npm/markmap-view@0.15.4'
    if (katexEnable) {
        CDN.js.webfont_js = userCDN?.webfontloader || 'https://fastly.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.js'
        CDN.css.push(userCDN?.katex_css || 'https://fastly.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css')
    }
    if (highlightEnable) {
        CDN.css.push(userCDN?.hljs_css || 'https://fastly.jsdelivr.net/npm/@highlightjs/cdn-assets@11.8.0/styles/default.min.css')
    }
    return JSON.stringify(CDN)
}

module.exports = { mixin }
