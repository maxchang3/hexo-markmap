| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

> [!WARNING]
> 这是 `hexo-markmap@1` 的文档。如果你正在使用 `hexo-markmap@2`，请查看 [这里](https://github.com/markmap-universe/hexo-markmap)。
>
> 如果你想升级到 `hexo-markmap@2`，请查看 [这里](#升级到-hexo-markmap2)。

依赖于 [markmap](https://github.com/gera2ld/markmap)，灵感来自 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap)。

# hexo-markmap  <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

在你的博客中使用 markdown 插入思维导图，使用 markmap。

现已经支持 链接、代码块、markdown、KaTeX、多行代码语法的渲染！

> 多行代码仍有一定渲染问题，可能出现报错。

更多预览和说明见 [我的博客](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# 安装

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```

```
yarn add hexo-markmap -D
```

# 使用

```
{% markmap height [depth] %}
- Markdown
- Syntax
{% endmarkmap %}
```

## 参数

- `height`: 画布高度
- `depth`: 可选，自动折叠层数深于 `depth` 的节点

## 示例

````
{% markmap 400px %}
- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
- ```js
  console.log('code block');
  console.log('code block');
  ```
- KaTeX - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$
{% endmarkmap %}
````

## 配置文件

将相应内容追加到 config.yml 中。

约定大于配置，如果你不需要以下某个功能，那么无需添加该配置项。 

默认情况下，他可以很好的正常工作。每个选项都有缺省项。

### pjax 修复

默认值 `false`

```yaml
hexo_markmap:
  pjax: true
```
如果你的博客安装了 pjax 请开启此项配置。

### KaTeX

默认值 `false`

```yaml
hexo_markmap:
  katex: true
```

如果你需要使用 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 请开启此项配置以插入 CSS 文件。如果博客本身已经通过其他方式配置 $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ 则无需开启.

> 如果你同时装有 `mathjax`，也请打开此项。

### Prism

默认值 `false`

```yaml
hexo_markmap:
  prism: true
```

如果需要插入代码块，请开启此项配置以插入 CSS 文件。如果博客本身已经通过其他方式配置 prism 则无需开启.

### 自定义 CDN

```yaml
hexo_markmap:
  userCDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### 锁定视图

默认值 `false`

关闭视图的放缩（zoom）、平移（pan）功能。

```yaml
hexo_markmap:
  lockView: true
```

### 修复未知原因导致的 SVG 属性错误

默认值 `false`

由于未知原因，在一些 hexo 主题下（如 [hexo-theme-volantis](https://github.com/volantis-x/hexo-theme-volantis/)），加载页面的过程中， markmap 会报错 `Error: <g> attribute transform: Expected number, "translate(NaN,NaN) scale(N…".` 。

这是由于 d3.js 的 zoom 事件返回了 `NaN` 值的 x, y, k 属性。由于这是一个上游问题，原因暂时未知，目前通过比较脏的补丁方法来修复此问题，无论开启与否，该问题均不会影响正常使用。

```yaml
hexo_markmap:
  fixSVGAttrNaN: true
```

### 缺省项

```yaml
hexo_markmap:
  pjax: false
  katex: false
  prism: false
  userCDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
  lockView: false
  fixSVGAttrNaN: false
```

# 升级到 `hexo-markmap@2`

`hexo-markmap@2` 是由 [@coderxi1](https://github.com/coderxi1/) 与 [@maxchang3](https://github.com/maxchang3/) 全新重构的版本。该版本升级至最新的 Markmap，引入了更多自定义选项，具体改进包括：

- 可在单个 Markmap 标签中，通过 frontmatter 自定义：
  - CSS 样式（实现自定义高度、宽度、响应式布局等）
    - 自 v2.0.5 起，不再支持在 frontmatter 中设置样式。但你可以结合 `id` 选项直接在 `<style>` 标签中定义样式。
  - Markmap 的 [JSON Options](https://markmap.js.org/docs/json-options#option-list)
- 利用 Markmap 内置的 URL Builder 自动生成 CDN 地址
- 根据语法自动生成相应的 CDN 标签
- 支持深色模式与全屏按钮
- 使用 TypeScript 重构，并覆盖了测试用例

需要注意的是，由于部分实现细节已与 `hexo-markmap@1` 不同，如对上述新功能没有强烈需求，仍可继续使用 `hexo-markmap@1`。

若需升级至 `hexo-markmap@2`，请参考以下步骤：

1. 使用你喜欢的包管理器安装 `hexo-markmap@2`：
    ```bash
    pnpm add hexo-markmap@2 -D
    ```
    ```bash
    npm install hexo-markmap@2 --save-dev
    ```
    ```bash
    yarn add hexo-markmap@2 -D
    ```
2. 根据需要修改 `config.yml` 中的配置：

   - 以下配置项**已不再支持**：
      ```diff
      hexo_markmap:
      -  pjax: false
      -  katex: false
      -  prism: false
      -  lockView: false
      -  fixSVGAttrNaN: false
      ```
      - 当前版本已放弃对 `pjax` 的兼容性；
      - KaTeX 与 Prism.js 现可自动检测并生成相应的 CDN 标签；
      - 同时将 frontmatter 中 `markmap` 的 `pan` 和 `zoom` 设为 `false`，即可达到与 `lockView` 相同的效果。

   - `CDN` 配置逻辑也有所调整：
      ```diff
      hexo_markmap:
      -  userCDN:
      -    d3_js: https://fastly.jsdelivr.net/npm/d3@6
      -    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
      -    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
      -    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
      +  CDN: 'custom'
      +  customCDN: 'https://fastly.jsdelivr.net/npm/'
      ```
      - 现在的 `CDN` 配置支持 `fastly`、`jsdelivr`、`unpkg` 三个选项以及 `custom` 自定义选项；
      - 如果选择 `custom`，则 `customCDN` 的值将作为 CDN 前缀使用。

   - 此外，之前可传入的 `depth` 参数以指定折叠深度已移除，你可以在 frontmatter 中使用 `options` 配置 `initialExpandLevel`。
3. 更新你的 Markdown 文件中的 `markmap` 标签：

  - 现在 `markmap` 标签支持 frontmatter 选项。你可以直接在标签中指定选项，例如：
    ```markdown
    {% markmap %}
    ---
    markmap:
      colorFreezeLevel: 2
    ---
    # Markdown
    # Syntax
    {% endmarkmap %}
    ```

  - 你仍然可以直接在标签中自定义思维导图的高度，但默认情况下会根据内容进行计算：
    ```diff
    - {% markmap 300px %}
    + {% markmap %}
    # Markdown
    # Syntax
    {% endmarkmap %}
    ```

4. 最后，重新生成你的博客。


# 贡献者

感谢所有的贡献者🥰！

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>
