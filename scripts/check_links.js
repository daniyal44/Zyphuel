import fs from 'node:fs'
import path from 'node:path'

function walk(dir) {
  let results = []
  const list = fs.readdirSync(dir)
  list.forEach(file => {
    file = path.join(dir, file)
    const stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(walk(file))
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.md')) {
      results.push(file)
    }
  })
  return results
}

const files = walk('./src').concat(['./index.html', './prerender.js', './netlify.toml'])
const orderMatches = []
const downloadMatches = []
const allRedirectMatches = []

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8')
  const lines = content.split('\n')
  lines.forEach((line, i) => {
    // Check for links to /order or /download without trailing slash
    const mOrder = line.match(/(['"`])\/order\1/)
    const mDownload = line.match(/(['"`])\/download\1/)
    const mAbout = line.match(/(['"`])\/about\1/)
    const mServices = line.match(/(['"`])\/services\1/)
    const mContact = line.match(/(['"`])\/contact\1/)
    const mBlog = line.match(/(['"`])\/blog\1/)

    if (mOrder) orderMatches.push({ file: f, line: i + 1, text: line.trim() })
    if (mDownload) downloadMatches.push({ file: f, line: i + 1, text: line.trim() })
    if (mAbout || mServices || mContact || mBlog) {
      allRedirectMatches.push({ file: f, line: i + 1, text: line.trim() })
    }
  })
})

console.log('--- Order non-trailing matches ---')
console.log(orderMatches)

console.log('--- Download non-trailing matches ---')
console.log(downloadMatches)

console.log('--- Other non-trailing matches ---')
console.log(allRedirectMatches)
