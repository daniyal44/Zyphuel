/**
 * Zyphuel Official Calibrated Invoice - Pure Vector PDF Generator
 * Powered by jsPDF (100% Client-Side Vector Rendering, Zero-CORS, Zero-External-Font Issues)
 */

export async function generateInvoicePdf(data) {
  if (!data) throw new Error('No invoice data provided')

  // Dynamically import jsPDF for full SSR safety & lightweight code-splitting
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 14
  const contentWidth = pageWidth - (margin * 2) // 182mm

  // 1. Background Card Outline
  doc.setDrawColor(226, 232, 240)
  doc.setLineWidth(0.4)
  doc.roundedRect(margin, margin, contentWidth, pageHeight - (margin * 2), 4, 4)

  // 2. Top Accent Bar (Zyphuel Signature Blue)
  doc.setFillColor(2, 132, 199)
  doc.rect(margin, margin, contentWidth, 3.5, 'F')

  // 3. Header Brand & Logistics Identity
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(2, 132, 199)
  doc.text('ZYPHUEL', margin + 8, margin + 14)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(15, 23, 42)
  doc.text('Certified On-Demand Energy & Fuel Logistics', margin + 8, margin + 19)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(100, 116, 139)
  doc.text('Lahore Hub #01 • 75-Main Boulevard, Gulberg III, Lahore • Helpline: +92 3230-112464', margin + 8, margin + 23.5)
  doc.text('Email: support@zyphuel.com • Official Portal: https://zyphuel.netlify.app', margin + 8, margin + 27.5)

  // 4. Right Side Metadata
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(15, 23, 42)
  doc.text('INVOICE', pageWidth - margin - 8, margin + 13, { align: 'right' })

  doc.setFont('courier', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(2, 132, 199)
  doc.text('#' + (data.orderId || 'ZYP-ORDER'), pageWidth - margin - 8, margin + 18, { align: 'right' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(100, 116, 139)
  doc.text(data.date || new Date().toLocaleString(), pageWidth - margin - 8, margin + 22.5, { align: 'right' })

  // Dispatch Confirmed Pill
  doc.setFillColor(236, 253, 245)
  doc.setDrawColor(167, 243, 208)
  doc.roundedRect(pageWidth - margin - 46, margin + 24.5, 38, 5.5, 1.5, 1.5, 'FD')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(16, 185, 129)
  doc.text('✔ DISPATCH CONFIRMED', pageWidth - margin - 27, margin + 28.5, { align: 'center' })

  // Horizontal Accent Divider
  doc.setDrawColor(2, 132, 199)
  doc.setLineWidth(0.8)
  doc.line(margin + 8, margin + 33, pageWidth - margin - 8, margin + 33)

  // 5. Customer & Dispatch Telemetry Cards (2-Column Grid)
  const cardY = margin + 37
  const cardW = (contentWidth - 22) / 2
  const cardH = 34

  // Left Card: Billed To / Site
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin + 8, cardY, cardW, cardH, 2.5, 2.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(2, 132, 199)
  doc.text('BILLED TO / DELIVERY SITE', margin + 12, cardY + 5.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9.5)
  doc.setTextColor(15, 23, 42)
  doc.text(data.customerName || 'Valued Customer', margin + 12, cardY + 11)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  doc.text('Phone: ' + (data.phone || 'Not provided'), margin + 12, cardY + 16)
  doc.text('Email: ' + (data.email || 'Not provided'), margin + 12, cardY + 20.5)

  const wrappedAddress = doc.splitTextToSize('Address: ' + (data.address || 'Lahore, Pakistan'), cardW - 8)
  doc.text(wrappedAddress.slice(0, 2), margin + 12, cardY + 25)

  // Right Card: Telemetry
  const rightCardX = margin + 8 + cardW + 6
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(rightCardX, cardY, cardW, cardH, 2.5, 2.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(2, 132, 199)
  doc.text('DISPATCH & CALIBRATION TELEMETRY', rightCardX + 4, cardY + 5.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(71, 85, 105)
  doc.text('Payment Mode: ', rightCardX + 4, cardY + 11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text(data.paymentMethod || 'Cash on Delivery (COD)', rightCardX + 28, cardY + 11)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Delivery Speed: ', rightCardX + 4, cardY + 16)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(data.isUrgent ? 234 : 15, data.isUrgent ? 88 : 23, data.isUrgent ? 12 : 42)
  doc.text(data.deliverySpeed || 'Standard Dispatch (20-45 Mins)', rightCardX + 28, cardY + 16)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Flow Meter: ', rightCardX + 4, cardY + 21)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('Positive Displacement (0.01L Accuracy)', rightCardX + 28, cardY + 21)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('ATC Standard: ', rightCardX + 4, cardY + 26)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('15°C Automatic Temperature Compensation', rightCardX + 28, cardY + 26)

  // 6. Itemized Billing Table
  const tableY = cardY + cardH + 7
  const colX = {
    desc: margin + 8,
    qty: margin + 8 + 86,
    rate: margin + 8 + 114,
    total: pageWidth - margin - 8
  }

  // Table Header Bar
  doc.setFillColor(15, 23, 42)
  doc.roundedRect(margin + 8, tableY, contentWidth - 16, 7.5, 1.5, 1.5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(255, 255, 255)
  doc.text('ITEM DESCRIPTION & CALIBRATED SPECIFICATIONS', colX.desc + 4, tableY + 5)
  doc.text('QTY', colX.qty, tableY + 5, { align: 'center' })
  doc.text('UNIT RATE', colX.rate, tableY + 5, { align: 'right' })
  doc.text('TOTAL (PKR)', colX.total - 4, tableY + 5, { align: 'right' })

  // Rows
  let curY = tableY + 7.5
  const items = data.items && data.items.length > 0 ? data.items : []
  
  items.forEach((item, idx) => {
    const rowH = 13
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252)
      doc.rect(margin + 8, curY, contentWidth - 16, rowH, 'F')
    }
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(margin + 8, curY + rowH, pageWidth - margin - 8, curY + rowH)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    doc.text(item.title, colX.desc + 4, curY + 5.5)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(100, 116, 139)
    doc.text(item.detail, colX.desc + 4, curY + 9.5)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(15, 23, 42)
    doc.text(String(item.qty), colX.qty, curY + 7, { align: 'center' })

    doc.setFont('courier', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(71, 85, 105)
    doc.text(String(item.rate), colX.rate, curY + 7, { align: 'right' })

    doc.setFont('courier', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(15, 23, 42)
    const costFmt = typeof item.cost === 'number'
      ? item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : String(item.cost)
    doc.text('Rs. ' + costFmt, colX.total - 4, curY + 7, { align: 'right' })

    curY += rowH
  })

  // 7. Totals & OGRA Compliance Seal Box
  const summaryY = curY + 7
  const summaryW = contentWidth - 16
  const sealW = 90
  const totalsW = summaryW - sealW - 6

  // Left: OGRA Compliance Box
  doc.setFillColor(240, 253, 244)
  doc.setDrawColor(187, 247, 208)
  doc.roundedRect(margin + 8, summaryY, sealW, 36, 2.5, 2.5, 'FD')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(22, 101, 52)
  doc.text('✔ OGRA COMPLIANT • 100% CALIBRATED DISPATCH', margin + 12, summaryY + 7)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(21, 128, 61)
  const sealText = 'All petroleum products sourced directly from licensed primary oil marketing depots. Digital positive-displacement flow meters with optical calibration guarantee zero short-fueling. Meets Pakistan Environmental Protection Act & Euro-V standards.'
  doc.text(doc.splitTextToSize(sealText, sealW - 8), margin + 12, summaryY + 12.5)

  // Right: Totals Breakdown Card
  const totalsX = margin + 8 + sealW + 6
  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(totalsX, summaryY, totalsW, 36, 2.5, 2.5, 'FD')

  // Subtotal
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

  // Delivery
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(71, 85, 105)
  doc.text('Delivery Charges:', totalsX + 5, summaryY + 12)
  doc.setFont('courier', 'bold')
  const deliveryIsFree = data.deliveryFee === 0
  doc.setTextColor(deliveryIsFree ? 16 : 15, deliveryIsFree ? 185 : 23, deliveryIsFree ? 129 : 42)
  const deliveryFmt = deliveryIsFree
    ? 'FREE (50L+ Offer)'
    : (typeof data.deliveryFee === 'number' ? 'Rs. ' + data.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 }) : String(data.deliveryFee))
  doc.text(deliveryFmt, totalsX + totalsW - 5, summaryY + 12, { align: 'right' })

  // Urgent Surcharge
  if (data.isUrgent) {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(234, 88, 12)
    doc.text('Urgent Priority Surcharge:', totalsX + 5, summaryY + 17.5)
    doc.text('+Rs. 100.00 (Included)', totalsX + totalsW - 5, summaryY + 17.5, { align: 'right' })
  }

  // Grand Total Highlight Banner
  doc.setFillColor(2, 132, 199)
  doc.roundedRect(totalsX + 3, summaryY + 23, totalsW - 6, 10, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(255, 255, 255)
  doc.text('GRAND TOTAL PAYABLE', totalsX + 7, summaryY + 29.5)
  doc.setFont('courier', 'bold')
  doc.setFontSize(10.5)
  const totalFmt = typeof data.total === 'number'
    ? data.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : String(data.total)
  doc.text('Rs. ' + totalFmt, totalsX + totalsW - 7, summaryY + 29.5, { align: 'right' })

  // 8. Footer Note & Official Verification Seal
  const footY = pageHeight - margin - 14
  doc.setDrawColor(203, 213, 225)
  doc.setLineDashPattern([1.5, 1.5], 0)
  doc.line(margin + 8, footY, pageWidth - margin - 8, footY)
  doc.setLineDashPattern([], 0)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.8)
  doc.setTextColor(100, 116, 139)
  doc.text('Official Computerized Invoice • Zyphuel On-Demand Energy Refueling Systems Pakistan', margin + 8, footY + 4.5)
  doc.text('Helpline WhatsApp: +92 3230-112464 • Email: support@zyphuel.com • Gulberg III, Lahore', margin + 8, footY + 8.5)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.setTextColor(15, 23, 42)
  doc.text('Computerized Digital Verified', pageWidth - margin - 8, footY + 4.5, { align: 'right' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  doc.setTextColor(148, 163, 184)
  doc.text('Zyphuel Refueling Systems PK', pageWidth - margin - 8, footY + 8.5, { align: 'right' })

  // 9. Execute Direct Client-Side Download
  const filename = `Zyphuel-Invoice-${data.orderId || 'Order'}.pdf`
  
  try {
    doc.save(filename)
  } catch (err) {
    // Blob fallback for mobile or strict popup browsers
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
