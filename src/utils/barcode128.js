/**
 * ISO/IEC 15417 Code 128 High-Precision Barcode Engine
 * Inspired by barkod.studio scannable SVG barcode architecture.
 * Produces 100% genuine, camera-scannable Code 128 barcodes (Set B) for both SVG and jsPDF vector rendering.
 */

// Code 128 107-pattern symbol definitions (each 11 bits, Stop is 13 bits)
const CODE128_BARS = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100',
  '10001001100', '10011001000', '10011000100', '10001100100', '11001001000',
  '11001000100', '11000100100', '10110011100', '10011011100', '10011001110',
  '10111001100', '10011101100', '10011100110', '11001110010', '11001011100',
  '11001001110', '11011100100', '11001110100', '11101101110', '11101001100',
  '11100101100', '11100100110', '11101100100', '11100110100', '11100110010',
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000',
  '10001000110', '10110001000', '10001101000', '10001100010', '11010001000',
  '11000101000', '11000100010', '10110111000', '10110001110', '10001101110',
  '10111011000', '10111000110', '10001110110', '11101110110', '11010001110',
  '11000101110', '11011101000', '11011100010', '11011101110', '11101011000',
  '11101000110', '11100010110', '11101101000', '11101100010', '11100011010',
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100',
  '10010110000', '10010000110', '10000101100', '10000100110', '10110010000',
  '10110000100', '10011010000', '10011000010', '10000110100', '10000110010',
  '11000010010', '11001010000', '11110111010', '11000010100', '10001111010',
  '10100111100', '10010111100', '10010011110', '10111100100', '10011110100',
  '10011110010', '11110100100', '11110010100', '11110010010', '11011011110',
  '11011110110', '11110110110', '10101111000', '10100011110', '10001011110',
  '10111101000', '10111100010', '11110101000', '11110100010', '10111011110',
  '10111101110', '11101011110', '11110101110', '11010000100', '11010010000',
  '11010011100', '1100011101011'
]

const START_B = 104
const STOP_CODE = 106

/**
 * Encodes text into a standard Code 128B binary pattern of 1s (bars) and 0s (spaces).
 * Includes official Start B, modulo 103 checksum, and Stop symbol with terminal bar.
 */
export function encodeCode128(text) {
  const clean = String(text || 'ZYP').trim()
  const codes = [START_B]
  let sum = START_B

  for (let i = 0; i < clean.length; i++) {
    const code = clean.charCodeAt(i) - 32
    if (code >= 0 && code <= 95) {
      codes.push(code)
      sum += code * (i + 1)
    } else {
      // Fallback for non-ASCII: map to space (0)
      codes.push(0)
    }
  }

  // Modulo 103 Checksum
  const checksum = sum % 103
  codes.push(checksum)
  codes.push(STOP_CODE)

  // Assemble full binary sequence
  const binary = codes.map(c => CODE128_BARS[c]).join('')

  // Convert binary into runs of bars and spaces for high-performance rendering
  const runs = []
  let currentBit = binary[0]
  let currentLen = 1

  for (let i = 1; i < binary.length; i++) {
    if (binary[i] === currentBit) {
      currentLen++
    } else {
      runs.push({ isBar: currentBit === '1', width: currentLen })
      currentBit = binary[i]
      currentLen = 1
    }
  }
  runs.push({ isBar: currentBit === '1', width: currentLen })

  return {
    text: clean,
    codes,
    checksum,
    binary,
    runs,
    totalModules: binary.length
  }
}

/**
 * Generates a clean, print-ready, camera-scannable SVG string.
 * Uses crispEdges shape-rendering and proper quiet-zones as required by barcode scanners.
 */
export function generateBarcodeSvg(text, options = {}) {
  const {
    moduleWidth = 2,
    height = 50,
    quietZone = 12,
    color = '#000000',
    background = '#ffffff',
    showText = true,
    fontSize = 12,
    fontFamily = 'monospace'
  } = options

  const { runs, totalModules } = encodeCode128(text)
  const codeWidth = totalModules * moduleWidth
  const totalWidth = codeWidth + (quietZone * 2)
  const totalHeight = height + (showText ? fontSize + 8 : 0)

  let x = quietZone
  const rects = []

  runs.forEach(run => {
    const w = run.width * moduleWidth
    if (run.isBar) {
      rects.push(
        `<rect x="${x}" y="0" width="${w}" height="${height}" fill="${color}" shape-rendering="crispEdges"/>`
      )
    }
    x += w
  })

  const textElement = showText
    ? `<text x="${totalWidth / 2}" y="${height + fontSize + 2}" text-anchor="middle" font-family="${fontFamily}" font-size="${fontSize}" font-weight="700" fill="${color}" letter-spacing="2">* ${text} *</text>`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}" shape-rendering="crispEdges" style="background:${background};display:block;max-width:100%;height:auto;">
  <rect x="0" y="0" width="${totalWidth}" height="${totalHeight}" fill="${background}"/>
  ${rects.join('')}
  ${textElement}
</svg>`
}

/**
 * Draws the real Code 128 barcode directly into a jsPDF document as pure vector rectangles.
 * Guarantees zero blur, infinite vector clarity, and instant camera scanning on PDF/paper.
 *
 * @param {object} doc - The jsPDF document instance
 * @param {string} text - The barcode text (e.g. 'ZYP-849201')
 * @param {number} x - Starting X coordinate in mm
 * @param {number} y - Starting Y coordinate in mm
 * @param {number} targetWidth - Target total width in mm (including quiet zones)
 * @param {number} barHeight - Height of the bars in mm
 * @param {object} options - Custom options (showText, color, background)
 */
export function drawBarcodeToPdf(doc, text, x, y, targetWidth = 65, barHeight = 14, options = {}) {
  const {
    showText = true,
    color = [0, 0, 0],
    background = [255, 255, 255]
  } = options

  const { runs, totalModules } = encodeCode128(text)

  // Quiet zones (at least 10 modules on each side)
  const quietZoneModules = 10
  const allModules = totalModules + (quietZoneModules * 2)
  const moduleWidthMm = targetWidth / allModules

  // 1. Draw solid background card for quiet zone guarantee
  doc.setFillColor(background[0], background[1], background[2])
  const cardHeight = barHeight + (showText ? 4.5 : 1)
  doc.roundedRect(x, y - 0.5, targetWidth, cardHeight + 1, 1, 1, 'F')

  // 2. Draw black vector bars
  doc.setFillColor(color[0], color[1], color[2])
  let curX = x + (quietZoneModules * moduleWidthMm)

  runs.forEach(run => {
    const w = run.width * moduleWidthMm
    if (run.isBar) {
      doc.rect(curX, y, w, barHeight, 'F')
    }
    curX += w
  })

  // 3. Draw human-readable verification text
  if (showText) {
    doc.setFont('courier', 'bold')
    doc.setFontSize(7.5)
    doc.setTextColor(color[0], color[1], color[2])
    doc.text(`* ${text} *`, x + (targetWidth / 2), y + barHeight + 3.8, { align: 'center' })
  }

  return {
    width: targetWidth,
    height: cardHeight
  }
}
