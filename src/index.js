import { createPlugin, } from 'coralite/utils'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path';

/**
 * @import {CoraliteAnyNode, CoraliteDirective, CoraliteDocumentRoot} from 'coralite/types'
 */

export default createPlugin({
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
        && currentNode.attribs['inline-css'] != null) {

        // resolve the CSS file path using the inline-css attribute or href
        const cssPath = resolve(currentNode.attribs['inline-css'] || currentNode.attribs.href);

        try {
          // read the CSS content from the resolved path
          const data = await readFile(cssPath, { encoding: 'utf8' });
          
          // replace the <link> tag with a <style> tag and set its content
          currentNode.name = 'style';
          currentNode.attribs = {};
          currentNode.children = [
            {
              type: 'text',
              data,
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
