import fs from              'fs'
import linkJs from          './linkJs/main.mjs'
import minifyJs from        './minifyJs/main.mjs'
await fs.promises.writeFile('concept.mjs',await minifyJs(await linkJs('main/main.mjs')))
fs.promises.writeFile('test.html',`
  <!doctype html>
  <title>0</title>
  <body>
  <script type=module>${await linkJs('test/main.mjs')}</script>
`)
