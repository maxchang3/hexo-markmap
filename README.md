[**简体中文**](./README.zh.md)

<img src="https://raw.githubusercontent.com/markmap-universe/logo/master/hexo-markmap-logo.png" alt="Hexo logo" width="100" height="100" align="right" />

# hexo-markmap <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

Insert a mindmap into your Hexo blog using [markmap](https://markmap.js.org/).

## Install

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```


```
yarn add hexo-markmap --dev
```


> [!TIP]
> Try our new VS Code extension, [markmap-universe](https://marketplace.visualstudio.com/items?itemName=maxchang.vscode-markmap-universe), to directly preview your `hexo-markmap` mindmaps.

## Usage

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

### Inline Options

You can customize each mindmap individually in the markmap tag (`{% markmap %} ... {% endmarkmap %}`).

#### Frontmatter Options

Just like you use frontmatter in your Markdown files in Hexo, you can use frontmatter in the `markmap` tag to customize your mindmap!

All frontmatter options are optional.

- **`id`** : Used to define the ID of the `markmap-wrap` element.  

- **`markmap`** : Correspond to the [`IMarkmapJSONOptions`](https://markmap.js.org/api/interfaces/markmap-view.IMarkmapJSONOptions.html) in the markmap project. For more details, please refer to [`jsonOptions`](https://markmap.js.org/docs/json-options#option-list).

#### Tag Options

You can also specify the height of the mindmap directly in the tag. By default, it will be calculated based on the content.

```markdown
{% markmap 300px %}
# Markdown
# Syntax
{% endmarkmap %}
```

### Config

Add your options to `config.yml`.

Convention over configuration, if you don't need any of the following features, then you don't need to add these configs.

By default, it works well. Each option has a default value.

#### Default options

```yaml
hexo_markmap:
  darkThemeCssSelector: '.dark'
  CDN: 'fastly' 
```

- **`darkThemeCssSelector`** : Used to specify the CSS selector for the dark theme.  
- **`CDN`** : Used to specify the CDN for Markmap. The supported values are `fastly`, `jsdelivr`, `unpkg`, and `custom`.
  - If set to `custom`, the `customCDN` value will be used as the CDN prefix.
- **`customCDN`** : Defines a custom CDN URL for Markmap. This must be a valid URL.
- **`globalOptions`** : Used to define global options for all mindmaps.    
  - Correspond to the [Frontmatter Options](#frontmatter-options) above.

## Example 

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
<!-- To avoid hexo treat the following as code block, we need to use a list -->
- ```js 
  console.log('hello, JavaScript')
  ```

- | Products | Price |
  |-|-|
  | Apple | 4 |
  | Banana | 2 |

- ![](https://markmap.js.org/favicon.png)
{% endmarkmap %}
````

</details>

## Contributors

Thanks to all contributors🥰!

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>

## Credits

- This project would not have been possible without [markmap](https://markmap.js.org/).
- Originally inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).
- Thanks to [@coderxi1](https://github.com/coderxi1/) for conceiving and implementing the initial version 2!
