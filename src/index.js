import { createPlugin, } from 'coralite/utils'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import postcss from 'postcss'
import postcssAtImport from 'postcss-import'
import postcssMinify from 'postcss-minify'

/**
 * @import {
 *  CoraliteAnyNode,
 *  CoraliteDirective,
 *  CoraliteDocumentRoot
 * } from 'coralite/types'
 */

/**
 * Coralite plugin to inline CSS
 * @param {Object} [options] - Plugin options
 * @param {boolean} [options.atImport] - Transform `@import` rules to inlining content.
 * @param {boolean} [options.minify] - Minify CSS by removing comments and unnecessary whitespace from CSS files.
 * @param {string} [options.path] - The path of the CSS source files.
 */
export default ({
  atImport,
  minify,
  path
} = {}) => {
  const css = postcss()

  if (atImport) {
    css.use(postcssAtImport())
  }

  if (minify) {
    css.use(postcssMinify)
  }

  return createPlugin({
    name: 'inline-css',
    async onPageSet (context) {
      /** @type {(CoraliteAnyNode | CoraliteDocumentRoot | CoraliteDirective)[]} */
      let stack = [context.elements.root];

      while (stack.length > 0) {
        const currentNode = stack.pop();

        // check if the current node is a <link> tag with rel="stylesheet" and inline-css attribute
        if (currentNode.type === 'tag'
          && currentNode.name === 'link'
          && typeof currentNode.attribs === 'object'
          && currentNode.attribs.rel === 'stylesheet'
          && currentNode.attribs['inline-css'] != null
        ) {          
          // resolve the CSS file path using the inline-css attribute or href
          let cssPathname = join((path || ''), currentNode.attribs['inline-css'] || currentNode.attribs.href)
          // make path relative
          cssPathname = cssPathname[0] === '/' ? cssPathname.substring(1, cssPathname.length) : cssPathname
          // create absolute path
          const cssPath = resolve(cssPathname);

          try {
            // read the CSS content from the resolved path
            const data = await readFile(cssPath, { encoding: 'utf8' });
            const result = await css.process(data, {
              // `from` option is needed here
              from: cssPath
            })

            // replace the <link> tag with a <style> tag and set its content
            currentNode.name = 'style';
            currentNode.attribs = {};
            currentNode.children = [
              {
                type: 'text',
                data: result.css,
                parent: currentNode
              }
            ];
          } catch (err) {
            console.error(err);
          }
        }

        // add children to the stack for further processing
        if ((currentNode.type === 'tag' || currentNode.type === 'root') && currentNode.children) {
          stack = stack.concat(currentNode.children);
        }
      }
    }
  })
}
