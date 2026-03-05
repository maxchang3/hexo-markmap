| [English](https://github.com/MaxChang3/hexo-markmap/blob/main/README.md)
| [简体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANS.md)
| [繁体中文](https://github.com/MaxChang3/hexo-markmap/blob/main/README_HANT.md)
|

> [!WARNING]
> This is the documentation for `hexo-markmap@1`. If you use `hexo-markmap@2`, please check [here](https://github.com/markmap-universe/hexo-markmap)
> 
> If you want to upgrade to `hexo-markmap@2`, please check [here](#upgrade-to-hexo-markmap-v2).


Depend on [markmap](https://github.com/gera2ld/markmap). Inspired by [hexo-simple-mindmap](https://github.com/HunterXuan/hexo-simple-mindmap).

# hexo-markmap <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/v/hexo-markmap"></a> <a href="https://npm.im/hexo-markmap"><img src="https://badgen.net/npm/dm/hexo-markmap"></a>

Insert mindmap in your hexo blog by markmap.

From now all the syntax like HTML codes, links, inline code, markdown KaTeX, and Codeblocks are possible to use.

> Codeblocks still have some problems which may throw some errors.
More preview in [my blog](https://zhangmaimai.com/2021/02/23/hexo-mindmap-plugin/).

# Install

```
pnpm add hexo-markmap -D
```

```
npm install hexo-markmap --save-dev
```


```
yarn add hexo-markmap --dev
```

# Usage

```
{% markmap height [depth] %}
- Markdown
- Syntax
{% endmarkmap %}
```

## Options

- `height`: mindmap canvas height
- `depth`: optional, when specified, automatically fold nodes with level greater than `depth`

## Example 

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

## Config

Add your options to config.yml.

Convention over configuration, if you don’t need any of the following features, then you don’t need to add these configs.

By default, it works well. Each option has a default value.


### pjax fixing

default value `false`

```yaml
hexo_markmap:
  pjax: true
```

If your blog has pjax installed, please turn it on.

### KaTeX

default value `false`

```yaml
hexo_markmap:
  katex: true
```

If you need to use $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$, please turn it on to insert the CSS links. If your $K\kern-.25em\raise.45ex {\scriptstyle{A}}\kern-.15em\TeX$ was already added in your blog by another way, then you needn't to do it.

> If your blog has MathJax installed, please turn it on.


### Prism

default value `false`

```yaml
hexo_markmap:
  prism: true
```

If you need to use code blocks, please turn it on to insert the CSS links. If prism.css has already been added to your blog by another way, then you don’t need to do it.

### Custom CDN

```yaml
hexo_markmap:
  userCDN:
    d3_js: https://fastly.jsdelivr.net/npm/d3@6
    markmap_view_js: https://fastly.jsdelivr.net/npm/markmap-view@0.2.7
    katex_css: https://fastly.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css
    prism_css: https://fastly.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css
```

### Lock view

default value `false`

Disable the zoom and pan of the view.

```yaml
hexo_markmap:
  lockView: true
```

### Fix SVG attribute errors caused by unknown reasons

Default value `false`

Due to unknown reasons, in some hexo themes (such as [hexo-theme-volantis](https://github.com/volantis-x/hexo-theme-volantis/)), during the process of loading the page, markmap will report an error `Error: <g> attribute transform: Expected number, "translate(NaN,NaN) scale(N…".`.

This is because the zoom event of d3.js returns x, y, k attributes with `NaN` values. As this is an upstream issue and the reason is currently unknown, this problem is fixed by a rather dirty patch method. This problem will not affect normal use whether it is turned on or off.

### default option
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

# Upgrade to `hexo-markmap` v2

`hexo-markmap@2` is a completely refactored version by [@coderxi1](https://github.com/coderxi1/) and [@maxchang3](https://github.com/maxchang3/). This version upgrades to the latest Markmap and introduces more customization options, including:

- Customization within a single Markmap tag using frontmatter:
  - CSS styles (custom height, width, responsive layout, etc.)
    - Since v2.0.5, setting styles in the frontmatter is no longer supported. Instead, you can define them directly within a `<style>` tag by combining it with the `id` option.
  - Markmap's [JSON Options](https://markmap.js.org/docs/json-options#option-list)
- Automatic CDN URL generation using Markmap's built-in URL builder
- On-demand CDN resource insertion based on syntax usage
- Support for dark mode and fullscreen button
- Refactored in TypeScript with test coverage

Note that some implementation details differ from `hexo-markmap@1`. If you do not require these new features, you may continue using `hexo-markmap@1`.

To upgrade to `hexo-markmap@2`, follow these steps:

1. Install `hexo-markmap@2` using your preferred package manager:

    ```bash
    pnpm add hexo-markmap@2 -D
    ```
    ```bash
    npm install hexo-markmap@2 --save-dev
    ```
    ```bash
    yarn add hexo-markmap@2 -D
    ```

2. Modify your `config.yml` as needed:

   - The following configuration options are **no longer supported**:
      ```diff
      hexo_markmap:
      -  pjax: false
      -  katex: false
      -  prism: false
      -  lockView: false
      -  fixSVGAttrNaN: false
      ```
      - The new version no longer supports `pjax` compatibility;
      - KaTeX and Prism.js are now automatically detected and generate corresponding CDN tags;
      - By setting both `pan` and `zoom` in the `markmap` frontmatter to `false`, you can achieve the same effect as `lockView`.

   - `CDN` configuration logic has also changed:
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
      - The new `CDN` setting supports `fastly`, `jsdelivr`, `unpkg`, and a `custom` option;
      - If you choose `custom`, the `customCDN` value will be used as the CDN prefix.

   - Additionally, the previous `depth` parameter for setting fold levels has been removed. Instead, you can use the `initialExpandLevel` option in frontmatter.
3. Update your `markmap` tags in your Markdown files:

   - The `markmap` tag now supports frontmatter options. You can specify the options directly in the tag, like this:
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

   - You can still customize the height of the mindmap directly in the tag, by default it will be calculated based on the content:
      ```diff
      - {% markmap 300px %}
      + {% markmap %}
      # Markdown
      # Syntax
      {% endmarkmap %}
      ```
4. Finally, regenerate your blog.


# Contributors

Thanks to all contributors🥰!

<a href="https://github.com/maxchang3/hexo-markmap/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=maxchang3/hexo-markmap" />
</a>
