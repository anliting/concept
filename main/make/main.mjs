import fs from              'fs'
import linkJs from          './linkJs/main.mjs'
import minifyJs from        './minifyJs/main.mjs'
await fs.promises.writeFile('build/main.mjs',await minifyJs(
  await linkJs('main/main.mjs')
))
fs.promises.writeFile(
  'dist/concept.mjs',
  `/*${await fs.promises.readFile('license')}*/${
    fs.readFileSync('build/main.mjs')
  }`
)
fs.promises.writeFile('build/test.html',`
  <!doctype html>
  <title>0</title>
  <body>
  <script type=module>${await linkJs('main/test/main.mjs')}</script>
`)
