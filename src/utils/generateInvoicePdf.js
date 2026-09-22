/**
 * Zyphuel Official Calibrated Commercial Invoice - Pure Vector PDF Generator
 * Powered by jsPDF (100% Client-Side Vector Rendering, Zero-CORS, Zero-External-Font Issues)
 */
import { drawBarcodeToPdf, drawQrToPdf } from './barcode128.js'

export function numberToWords(num) {
  if (isNaN(num) || num <= 0) return 'Pakistani Rupees Zero Only'
  
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ]
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  const inWords = (n) => {
    let str = ''
    if (n >= 10000000) {
      str += inWords(Math.floor(n / 10000000)) + ' Crore '
      n %= 10000000
    }
    if (n >= 100000) {
      str += inWords(Math.floor(n / 100000)) + ' Lakh '
      n %= 100000
    }
    if (n >= 1000) {
      str += inWords(Math.floor(n / 1000)) + ' Thousand '
      n %= 1000
    }
    if (n >= 100) {
      str += inWords(Math.floor(n / 100)) + ' Hundred '
      n %= 100
    }
    if (n > 0) {
      if (str !== '') str += 'and '
      if (n < 20) str += a[n] + ' '
      else {
        str += b[Math.floor(n / 10)] + ' '
        if (n % 10 > 0) str += a[n % 10] + ' '
      }
    }
    return str.trim()
  }

  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)
  
  let result = 'Pakistani Rupees ' + inWords(intPart)
  if (decPart > 0) {
    result += ' and ' + inWords(decPart) + ' Paisas'
  }
  result += ' Only'
  return result
}

export async function generateInvoicePdf(data) {
  if (!data) throw new Error('No invoice data provided')

  // Dynamically import jsPDF for SSR safety and bundle optimization
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 12
  const contentWidth = pageWidth - (margin * 2) // 186mm

  // 1. Outer Double Border Frame (Executive Tax Invoice Styling)
  doc.setDrawColor(203, 213, 225)
  doc.setLineWidth(0.4)
  doc.rect(margin, margin, contentWidth, pageHeight - (margin * 2))

  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.2)
  doc.rect(margin + 1.2, margin + 1.2, contentWidth - 2.4, pageHeight - (margin * 2) - 2.4)

  // 2. Top Header Accent Band (Deep Executive Navy + Cyan Stripe)
  doc.setFillColor(15, 23, 42) // #0f172a
  doc.rect(margin + 1.4, margin + 1.4, contentWidth - 2.8, 30, 'F')

  doc.setFillColor(2, 132, 199) // #0284c7 accent
  doc.rect(margin + 1.4, margin + 31.4, contentWidth - 2.8, 1.8, 'F')

  // Company Brand Name & Credentials
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(255, 255, 255)
  doc.text('ZYPHUEL ENERGY LOGISTICS', margin + 8, margin + 12)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(56, 189, 248) // cyan
  doc.text('GOVERNMENT OF PAKISTAN • OGRA LICENSED PETROLEUM DISTRIBUTOR', margin + 8, margin + 17)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(203, 213, 225)
  doc.text('OGRA License: OGRA/DL-7492/LHE  •  NTN / STRN: 9482710-3  •  SECP Inc: 0248195', margin + 8, margin + 21.5)
  doc.text('Lahore Hub #01: 75-Main Boulevard, Gulberg III, Lahore, Punjab, Pakistan', margin + 8, margin + 25.5)
  doc.text('24/7 Helpline: +92 3230-112464  •  Email: support@zyphuel.com  •  Web: https://zyphuel.netlify.app', margin + 8, margin + 29.5)

  // Right Side: Official Invoice Classification Box
  const metaRightX = pageWidth - margin - 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(255, 255, 255)
  doc.text('COMMERCIAL INVOICE', metaRightX, margin + 11.5, { align: 'right' })

  doc.setFont('courier', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(56, 189, 248)
  doc.text('#' + (data.orderId || 'ZYP-ORDER'), metaRightX, margin + 17, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(226, 232, 240)
  doc.text('Date: ' + (data.date || new Date().toLocaleString('en-PK')), metaRightX, margin + 22, { align: 'right' })

  // Verified Stamp Pill
  doc.setFillColor(16, 185, 129) // Emerald
  doc.roundedRect(metaRightX - 44, margin + 24, 44, 5.2, 1.2, 1.2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.8)
  doc.setTextColor(255, 255, 255)
  doc.text('✔ DISPATCH CONFIRMED', metaRightX - 22, margin + 27.7, { align: 'center' })

  // 3. Customer & Dispatch Telemetry Profile (2 Balanced Modern Cards)
  const cardY = margin + 37
  const cardW = (contentWidth - 14) / 2
  const cardH = 34

  // Left Card: Billed To Customer / Destination Site
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin + 5, cardY, cardW, cardH, 2, 2, 'FD')

  doc.setFillColor(2, 132, 199)
  doc.rect(margin + 5, cardY, 1.5, cardH, 'F') // left vertical color accent

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(2, 132, 199)
  doc.text('BILLED TO / RECIPIENT SITE DETAILS', margin + 9, cardY + 5.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(15, 23, 42)
  doc.text(data.customerName || 'Valued Customer', margin + 9, cardY + 11.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  doc.text('Contact Phone: ' + (data.phone || 'Not provided'), margin + 9, cardY + 16.5)
  doc.text('Registered Email: ' + (data.email || 'Not provided'), margin + 9, cardY + 21)

  const wrappedAddress = doc.splitTextToSize('Delivery Site: ' + (data.address || 'Lahore, Pakistan'), cardW - 12)
  doc.text(wrappedAddress.slice(0, 2), margin + 9, cardY + 26)

  // Right Card: Fleet Dispatch Telemetry & Quality Standards
  const rightCardX = margin + 5 + cardW + 4
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(rightCardX, cardY, cardW, cardH, 2, 2, 'FD')

  doc.setFillColor(16, 185, 129)
  doc.rect(rightCardX, cardY, 1.5, cardH, 'F') // left green accent

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(16, 185, 129)
  doc.text('DISPATCH TELEMETRY & METERING AUDIT', rightCardX + 4, cardY + 5.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  doc.text('Assigned Unit: ', rightCardX + 4, cardY + 11.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('Bowser Tanker #04 (Calibrated GPS Unit)', rightCardX + 26, cardY + 11.5)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Flow Meter: ', rightCardX + 4, cardY + 16.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('Positive Displacement (0.01L Accuracy)', rightCardX + 26, cardY + 16.5)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Temp Sensor: ', rightCardX + 4, cardY + 21.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('15°C Automatic Temperature Compensation (ATC)', rightCardX + 26, cardY + 21.5)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Payment Mode: ', rightCardX + 4, cardY + 26.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text(data.paymentMethod || 'Cash on Delivery (COD)', rightCardX + 26, cardY + 26.5)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Speed Window: ', rightCardX + 4, cardY + 31)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(data.isUrgent ? 234 : 2, data.isUrgent ? 88 : 132, data.isUrgent ? 12 : 199)
  doc.text(data.isUrgent ? '⚡ Urgent Express (10–20 Min Priority)' : 'Standard Rapid Dispatch (20–45 Mins)', rightCardX + 26, cardY + 31)

  // 4. Itemized Products & Services Table
  const tableY = cardY + cardH + 6
  const colX = {
    sr: margin + 5,
    desc: margin + 17,
    qty: margin + 104,
    rate: margin + 138,
    total: pageWidth - margin - 5
  }

  // Table Header Bar
  doc.setFillColor(15, 23, 42)
  doc.roundedRect(margin + 5, tableY, contentWidth - 10, 8, 1.2, 1.2, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.2)
  doc.setTextColor(255, 255, 255)
  doc.text('SR', colX.sr + 3, tableY + 5.2)
  doc.text('ITEM DESCRIPTION & OGRA CALIBRATED SPECIFICATIONS', colX.desc, tableY + 5.2)
  doc.text('QTY', colX.qty, tableY + 5.2, { align: 'center' })
  doc.text('UNIT RATE (PKR)', colX.rate, tableY + 5.2, { align: 'right' })
  doc.text('TOTAL AMOUNT (PKR)', colX.total - 4, tableY + 5.2, { align: 'right' })

  // Rows
  let curY = tableY + 8
  const items = data.items && data.items.length > 0 ? data.items : []

  items.forEach((item, idx) => {
    const rowH = 13
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252)
      doc.rect(margin + 5, curY, contentWidth - 10, rowH, 'F')
    }
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(margin + 5, curY + rowH, pageWidth - margin - 5, curY + rowH)

    // Sr #
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(100, 116, 139)
    doc.text(String(idx + 1).padStart(2, '0'), colX.sr + 3, curY + 6)

    // Title & Specs
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    doc.text(item.title, colX.desc, curY + 5.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(100, 116, 139)
    doc.text(item.detail || 'Calibrated digital flow-meter refueling • Sealed depot batch', colX.desc, curY + 9.5)

    // Qty
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(15, 23, 42)
    doc.text(String(item.qty), colX.qty, curY + 7, { align: 'center' })

    // Rate
    doc.setFont('courier', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)
    doc.text(String(item.rate), colX.rate, curY + 7, { align: 'right' })

    // Total
    doc.setFont('courier', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    const costFmt = typeof item.cost === 'number'
      ? item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : String(item.cost)
    doc.text('Rs. ' + costFmt, colX.total - 4, curY + 7, { align: 'right' })

    curY += rowH
  })

  // 5. Amount in Words Box (Spans width under table)
  const inWordsY = curY + 4
  const wordsText = numberToWords(data.total || 0)

  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin + 5, inWordsY, contentWidth - 10, 8.5, 1.5, 1.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.8)
  doc.setTextColor(2, 132, 199)
  doc.text('AMOUNT CHARGEABLE IN WORDS:', margin + 9, inWordsY + 5.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(15, 23, 42)
  doc.text(wordsText, margin + 55, inWordsY + 5.5)

  // 6. Summary Totals & OGRA Compliance Seal Grid
  const summaryY = inWordsY + 12
  const summaryW = contentWidth - 10
  const sealW = 94
  const totalsW = summaryW - sealW - 5

  // Left: Official OGRA Compliance Box
  doc.setFillColor(240, 253, 244)
  doc.setDrawColor(187, 247, 208)
  doc.roundedRect(margin + 5, summaryY, sealW, 36, 2, 2, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(22, 101, 52)
  doc.text('✔ OGRA COMPLIANT • 100% VOLUMETRIC GUARANTEE', margin + 9, summaryY + 6.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.8)
  doc.setTextColor(21, 128, 61)
  const sealText = 'All petroleum grades supplied strictly under OGRA Euro-V specifications, sourced directly from licensed primary oil marketing depots. Dispensed with digital positive-displacement flow meters (0.01L calibrated) equipped with anti-tamper optical seals. Zero short-fueling guarantee.'
  doc.text(doc.splitTextToSize(sealText, sealW - 8), margin + 9, summaryY + 11.5)

  // Barcode / Verification Tracking Reference
  doc.setFont('courier', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(71, 85, 105)
  doc.text(`TRACKING HASH: *${data.orderId || 'ZYP'}* • GPS LAHORE HUB #01`, margin + 9, summaryY + 32.5)

  // Right: Totals Ledger Card
  const totalsX = margin + 5 + sealW + 5
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(totalsX, summaryY, totalsW, 36, 2, 2, 'FD')

  // Subtotal Items
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  doc.text('Subtotal Items:', totalsX + 5, summaryY + 6.5)
  doc.setFont('courier', 'bold')
  doc.setTextColor(15, 23, 42)
  const subtotalFmt = typeof data.subtotal === 'number'
    ? data.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : String(data.subtotal)
  doc.text('Rs. ' + subtotalFmt, totalsX + totalsW - 5, summaryY + 6.5, { align: 'right' })

  // Meter Calibration QA
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Digital Flow-Meter Calibration:', totalsX + 5, summaryY + 11.5)
  doc.setFont('courier', 'bold')
  doc.setTextColor(16, 185, 129)
  doc.text('Rs. 0.00 (Free)', totalsX + totalsW - 5, summaryY + 11.5, { align: 'right' })

  // Delivery Charges
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Doorstep Bowser Delivery:', totalsX + 5, summaryY + 16.5)
  doc.setFont('courier', 'bold')
  const deliveryIsFree = data.deliveryFee === 0
  doc.setTextColor(deliveryIsFree ? 16 : 15, deliveryIsFree ? 185 : 23, deliveryIsFree ? 129 : 42)
  const deliveryFmt = deliveryIsFree
    ? 'Free'
    : (typeof data.deliveryFee === 'number' ? 'Rs. ' + data.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 }) : String(data.deliveryFee))
  doc.text(deliveryFmt, totalsX + totalsW - 5, summaryY + 16.5, { align: 'right' })

  // Urgent Surcharge (if urgent)
  if (data.isUrgent) {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(234, 88, 12)
    doc.text('Urgent Priority Express Surcharge:', totalsX + 5, summaryY + 21.5)
    doc.text('+Rs. 100.00 (Included)', totalsX + totalsW - 5, summaryY + 21.5, { align: 'right' })
  }

  // Grand Total Highlight Banner
  doc.setFillColor(2, 132, 199)
  doc.roundedRect(totalsX + 3, summaryY + 24.5, totalsW - 6, 9.5, 1.5, 1.5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(255, 255, 255)
  doc.text('TOTAL PAYABLE (PKR)', totalsX + 6, summaryY + 30.5)

  doc.setFont('courier', 'bold')
  doc.setFontSize(10.5)
  const totalFmt = typeof data.total === 'number'
    ? data.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : String(data.total)
  doc.text('Rs. ' + totalFmt, totalsX + totalsW - 6, summaryY + 30.5, { align: 'right' })

  // 7. Official Dual Verification (Camera QR & Code 128 Barcode) & Certified Seal
  const stampY = summaryY + 40
  const blockH = 26

  // Block 1: Instant Mobile Camera Scannable QR Code (100% iOS & Android Native Camera)
  const qrCardX = margin + 5
  const qrCardW = 34
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(qrCardX, stampY, qrCardW, blockH, 1.5, 1.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(5.3)
  doc.setTextColor(2, 132, 199)
  doc.text('CAMERA SCAN (QR)', qrCardX + (qrCardW / 2), stampY + 4, { align: 'center' })

  const verifyUrl = `https://zyphuel.netlify.app/order/?verify=${data.orderId || 'ORDER'}`
  drawQrToPdf(doc, verifyUrl, qrCardX + 8, stampY + 5.2, 18, {
    margin: 1,
    color: [0, 0, 0],
    background: [255, 255, 255]
  })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(4.6)
  doc.setTextColor(100, 116, 139)
  doc.text('Point phone camera to verify', qrCardX + (qrCardW / 2), stampY + 24.5, { align: 'center' })

  // Block 2: Industrial Dispatch Barcode (Code 128 - Laser Scanners & Google Lens)
  const barCardX = qrCardX + qrCardW + 3
  const barCardW = 68
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(barCardX, stampY, barCardW, blockH, 1.5, 1.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(5.5)
  doc.setTextColor(2, 132, 199)
  doc.text('OFFICIAL DISPATCH BARCODE • CODE 128', barCardX + 5, stampY + 4)

  drawBarcodeToPdf(doc, data.orderId || 'ZYP-ORDER', barCardX + 4, stampY + 5.2, barCardW - 8, 13.5, {
    showText: true,
    color: [0, 0, 0],
    background: [255, 255, 255]
  })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(4.6)
  doc.setTextColor(100, 116, 139)
  doc.text('Compatible with handheld laser guns & Google Lens', barCardX + (barCardW / 2), stampY + 24.5, { align: 'center' })

  // Block 3: Computerized Signatory & Official Certified Dispatch Seal
  const signX = barCardX + barCardW + 3
  const signW = contentWidth - 10 - qrCardW - 3 - barCardW - 3
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(signX, stampY, signW, blockH, 1.5, 1.5, 'FD')

  doc.setFillColor(240, 253, 244)
  doc.setDrawColor(187, 247, 208)
  doc.roundedRect(signX + 3, stampY + 2.5, signW - 6, 7.5, 1, 1, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.4)
  doc.setTextColor(22, 101, 52)
  doc.text('★ ZYPHUEL PAKISTAN • CERTIFIED DISPATCH ★', signX + (signW / 2), stampY + 6.8, { align: 'center' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(15, 23, 42)
  doc.text('Computerized Verified Commercial Invoice', signX + (signW / 2), stampY + 14, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(5.5)
  doc.setTextColor(100, 116, 139)
  doc.text('Automated Depots Dispatch Gateway • Lahore Hub #01', signX + (signW / 2), stampY + 18.2, { align: 'center' })
  doc.text('Valid without physical signature under Electronic Transactions Ordinance 2002', signX + (signW / 2), stampY + 22.4, { align: 'center' })

  // 8. Footer Legal Bar & Helpline Hotline
  const footY = pageHeight - margin - 12
  doc.setDrawColor(203, 213, 225)
  doc.setLineDashPattern([1.5, 1.5], 0)
  doc.line(margin + 5, footY, pageWidth - margin - 5, footY)
  doc.setLineDashPattern([], 0)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.6)
  doc.setTextColor(100, 116, 139)
  doc.text('Thank you for trusting Zyphuel. For rapid dispatch support, message helpline WhatsApp: +92 3230-112464', margin + 5, footY + 4.5)
  doc.text('Zyphuel Energy Logistics (Pvt) Ltd. • 75-Main Boulevard, Gulberg III, Lahore • support@zyphuel.com', margin + 5, footY + 8.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6.6)
  doc.setTextColor(2, 132, 199)
  doc.text('ISO & OGRA Calibrated Fleet Standards', pageWidth - margin - 5, footY + 6.5, { align: 'right' })

  // 9. Execute Direct Client-Side Download
  const filename = `Zyphuel-Invoice-${data.orderId || 'Order'}.pdf`
  
  try {
    doc.save(filename)
  } catch (err) {
    // Blob fallback for mobile browsers
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return true
}
