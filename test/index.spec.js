import { test } from 'node:test'
import { strictEqual, notStrictEqual, ok } from 'node:assert/strict'

// Import Coralite and the plugin
import Coralite from 'coralite'
import inlineCSS from '../src/index.js' // Adjust path if needed

test('setup coralite with inline-css plugin', async () => {
  // Setup configuration
  const config = {
    templates: 'test/fixtures/templates',
    pages: 'test/fixtures/pages',
    plugins: [inlineCSS]
  }

  // Create Coralite instance
  const coralite = new Coralite(config)

  // Initialize the Coralite instance
  await coralite.initialise()

  // Compile documents
  const documents = await coralite.compile()

  // Verify that documents were compiled
  notStrictEqual(documents, undefined)
  strictEqual(documents.length, 1) // Assuming one document is expected

  // Expected inline CSS content
  const expectedCSS = `  <style>body {
  background-color: rebeccapurple;
  color: white;
}</style>`

  // Basic check for inlined styles
  ok(documents[0].html.includes(expectedCSS))
})
