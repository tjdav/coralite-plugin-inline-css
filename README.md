# Coralite Inline CSS Plugin

A simple plugin for Coralite that converts `link` tags with the `inline-css` attribute into `<style>` elements in the HTML output, allowing you to use CSS without external files.

## Getting Started

1. Install the plugin via npm:
```bash
npm install coralite-plugin-inline-css
```

2. Configure Coralite in your `coralite.config.js` file:
```js
// coralite.config.js
import inlineCSS from 'coralite-plugin-inline-css'

export default {
  plugins: [inlineCSS]
}
```

## Usage

### 1. Create a CSS file:

```css
body {
  background-color: rebeccapurple;
  color: white;
}
```

### 2. Reference the CSS file in your HTML with the `inline-css` attribute:

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

### 3. Output after processing:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="name" content="coralite">
  <meta name="description" content="look mum, no database!">
  <style>
    body {
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
