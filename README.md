# Coralite Inline CSS Plugin

A plugin for Coralite that converts stylesheet `link` tags with the `inline-css` attribute into `<style>` elements in the HTML output, allowing you to use CSS without external files.

## Features

- Inlines CSS from `<link>` tags into `<style>` elements.
- Optional options to:
  - Transform `@import` rules to inline content.
  - Minify CSS by removing comments and unnecessary whitespace.

## Installation

Install the plugin via npm:

```bash
npm install coralite-plugin-inline-css
```

## Usage

### 1. Configure Coralite

Create a `coralite.config.js` file with the plugin configuration:

```js
// coralite.config.js
import inlineCSS from 'coralite-plugin-inline-css';

export default {
  plugins: [inlineCSS({
    atImport: true,
    minify: true
  })]
};
```

### 2. Use in HTML

Add the `inline-css` attribute to your `<link>` tags:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="name" content="coralite">
  <meta name="description" content="look mum, no database!">
  <!-- inline-css attribute is needed to convert link tag to style with inline css -->
  <link rel="stylesheet" href="css/styles.css" inline-css>
  <title>Blog posts</title>
</head>
<body>

</body>
</html>
```

### 3. Output

The plugin will transform your `<link>` tag into a `<style>` block with the inlined CSS:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="name" content="coralite">
  <meta name="description" content="look mum, no database!">
  <style>
    .body {
      background-color: rebeccapurple;
      color: white;
    }
  </style>
  <title>Blog posts</title>
</head>
<body>

</body>
</html>
```

## Options

```js
/**
 * @typedef {Object} InlineCSSOptions
 * @property {boolean} [atImport=false] - Transform @import rules to inlining content.
 * @property {boolean} [minify=false] - Minify CSS by removing comments and unnecessary whitespace from CSS files.
 */
```

## Example Configuration

```js
// coralite.config.js
import inlineCSS from 'coralite-plugin-inline-css';

export default {
  plugins: [inlineCSS({
    atImport: true,
    minify: true
  })]
};
```