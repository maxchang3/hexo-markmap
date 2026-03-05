[**English**](./README.md)

<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/hexo-markmap-logo.png" alt="Hexo logo" width="100" height="100" align="right" />

# hexo-markmap  <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

在你的 Hexo 博客中插入思维导图，使用 [markmap](https://markmap.js.org/)。

## 安装

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```

```
yarn add hexo-markmap -D
```

> [!TIP]
> 试试我们的新 VS Code 扩展 [markmap-universe](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe)，直接预览你的 `hexo-markmap` 思维导图。

## 使用

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

### 行内选项

你可以在 markmap 标签（`{% markmap %} ... {% endmarkmap %}`）中自定义每个思维导图。

#### Frontmatter 选项

就像你在 Hexo 中的 Markdown 文件中使用 frontmatter 一样，你可以在 `markmap` 标签中使用 frontmatter 来自定义你的思维导图！

所有 frontmatter 选项都是可选的。

- **`id`**：用于定义 `markmap-wrap` 元素的 ID。  

- **`markmap`**：对应 markmap 项目中的 [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html)。有关更多详细信息，请参考 [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list)。

<details>

</details>

#### 标签选项

你还可以直接在标签中指定思维导图的高度，默认情况下会根据内容进行计算。

```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

- **`height`** : 用于指定思维导图的高度。

### 配置

将相应内容追加到 `config.yml` 中。

约定大于配置，如果你不需要以下某个功能，那么无需添加该配置项。 

默认情况下即可正常工作。每个选项都有默认值。

#### 默认配置

```yaml
hexo_markmap:
  darkThemeCssSelector: '.dark'
  CDN: 'fastly'
```

- **`darkThemeCssSelector`** : 用于指定暗黑主题的CSS选择器。
- **`CDN`** : 用于指定 Markmap 的 CDN。目前支持的值有 `fastly` 、 `jsdelivr`、 `unpkg`。
  - 如果设置为 `custom`，则 `customCDN` 的值将被用作 CDN 的前缀。
- **`customCDN`** : 为 Markmap 定义自定义 CDN URL。这必须是一个有效的 URL。
- **`globalOptions`** : 用于为所有思维导图定义全局选项。  
  - 对应上面的 [Frontmatter 选项](#frontmatter-选项)。

## 示例

<details>

````markdown
{% markmap %}
---
markmap:
  colorFreezeLevel: 2
---

## Links

- [Website](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## Related Projects

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## Features

Note that if blocks and lists appear at the same level, the lists will be ignored.

### Lists

- **strong** ~~del~~ *italic* ==highlight==
- `inline code`
- [x] checkbox
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [More Katex Examples](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- Now we can wrap very very very very long text based on `maxWidth` option
- Ordered list
  1. item 1
  2. item 2

### Blocks
<!-- 为了避免 hexo 将以下内容视为代码块，我们需要使用列表 -->
- ```js 
  console.log('hello, JavaScript')
  ```

| -      | Products | Price |
| ------ | -------- |
| Apple  | 4        |
| Banana | 2        |

- ![](https://markmap.js.org/favicon.png)
````
</details>

## 贡献者

感谢所有的贡献者🥰！

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

## Credits

- 如果没有 [markmap](https://markmap.js.org/)，这个项目不可能存在。
- 最初受到了 [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap) 的启发。
- 感谢 [@coderxi1](https://github.com/coderxi1/) 对最初 2.0 版本的构思和实现！

