import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { useSEO } from '../hooks/useSEO'
import { useFuelPrices } from '../context/FuelPriceContext'
import { FUEL_PRICES } from '../data/fuelPrices'
import { generateInvoicePdf, numberToWords } from '../utils/generateInvoicePdf'
import { generateBarcodeSvg, generateQrSvg } from '../utils/barcode128'

const FUEL_DISPLAY = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  highOctane: 'High-Octane',
  lpg: 'LPG Gas',
  water: 'Water Tanker',
}

const FUEL_ICONS = {
  petrol: 'fa-gas-pump',
  diesel: 'fa-truck-droplet',
  highOctane: 'fa-bolt-lightning',
  lpg: 'fa-fire-burner',
  water: 'fa-droplet',
}

export const DELIVERY_APPLICATION_CONFIG = {
  car: {
    id: 'car',
    label: 'Car / Sedan / SUV',
    shortLabel: 'Car / SUV',
    icon: 'fa-car-side',
    placeholder: 'Vehicle plate (e.g. LEA-2024)',
    fieldLabel: 'Vehicle Registration / Number Plate'
  },
  bike: {
    id: 'bike',
    label: 'Motorbike / Scooter',
    shortLabel: 'Motorbike',
    icon: 'fa-motorcycle',
    placeholder: 'Bike plate (e.g. LEM-5678)',
    fieldLabel: 'Motorbike Plate / Registration'
  },
  generator: {
    id: 'generator',
    label: 'Standby Generator',
    shortLabel: 'Generator',
    icon: 'fa-charging-station',
    placeholder: 'Generator capacity/model (e.g. 25kVA Perkins)',
    fieldLabel: 'Generator Make & Capacity'
  },
  machinery: {
    id: 'machinery',
    label: 'Commercial Machinery',
    shortLabel: 'Machinery',
    icon: 'fa-tractor',
    placeholder: 'Equipment make/unit (e.g. CAT Excavator)',
    fieldLabel: 'Machinery Model / Unit ID'
  },
  storage: {
    id: 'storage',
    label: 'Jerrycan / Safe Storage Drum',
    shortLabel: 'Jerrycan / Drum',
    icon: 'fa-oil-can',
    placeholder: 'Container notes (e.g. 2x Sealed Metal Cans)',
    fieldLabel: 'Storage Drum / Container Notes'
  }
}

export default function OrderPage() {
  useSEO({
    title: 'Order Petrol & Diesel Online in Lahore | Zyphuel',
    description: 'Order Euro-V Super Petrol, High-Octane 97, and Euro-V Diesel delivery online with Zyphuel in Lahore. Express 45-minute doorstep dispatch with digital calibration meter.',
    keywords: [
      'order diesel Lahore', 'order petrol Lahore', 'diesel delivery Lahore', 'petrol delivery Lahore',
      'generator diesel order', 'order fuel online Pakistan', 'fuel cash on delivery Lahore', 'Zyphuel order'
    ],
    image: 'https://zyphuel.netlify.app/images/tank.png',
    url: 'https://zyphuel.netlify.app/order/',
    canonicalPath: '/order/',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "OrderAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://zyphuel.netlify.app/order/",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "object": {
            "@type": "Product",
            "name": "Zyphuel Mobile Refueling - Diesel & Petrol Delivery",
            "description": "On-demand doorstep fuel delivery in Lahore with certified digital flow-meter calibration. Super petrol, high-octane 97, and Euro-V diesel.",
            "image": "https://zyphuel.netlify.app/images/tank.png",
            "brand": {
              "@type": "Brand",
              "name": "Zyphuel"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "PKR",
              "description": "Daily official OGRA regulated fuel pricing with calibrated 0.01L digital flow metering",
              "availability": "https://schema.org/InStock",
              "areaServed": {
                "@type": "City",
                "name": "Lahore"
              }
            }
          },
          "agent": {
            "@type": "LocalBusiness",
            "name": "Zyphuel",
            "url": "https://zyphuel.netlify.app"
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://zyphuel.netlify.app/order#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I order diesel or petrol online in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose your required fuel category (Super Petrol, Euro-V Diesel, or High-Octane 97), select your refueling target application (Car, Bike, Generator, or Machinery), set your quantity (5L to 15L Max), enter your delivery address in Lahore, and select your delivery speed. Our dispatcher routes the nearest certified bowser to your location."
              }
            },
            {
              "@type": "Question",
              "name": "What is the minimum quantity for doorstep diesel delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Doorstep fuel delivery is strictly available from 5 Litres minimum up to 15 Litres maximum per order, dispensed with calibrated 0.01L digital flow meters."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for domestic orders from 5 to 10 liters of fuel. Orders above 10 Litres require advance payment for safety compliance."
              }
            },
            {
              "@type": "Question",
              "name": "Are Zyphuel fuel supplies OGRA certified and Euro-V compliant?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "100% of Zyphuel fuel supplies are sourced from licensed primary oil marketing depots, strictly compliant with official OGRA regulations and Euro-V environmental standards."
              }
            }
          ]
        }
      ]
    }
  })

  const pageRef = useScrollReveal()
  const { showToast } = useToast()
  const location = useLocation()
  const trackingIntervalRef = useRef(null)
  const isSubmittingRef = useRef(false)
  const truckBtnRef = useRef(null)

  // Form state
  const [orderFuel, setOrderFuel] = useState(true)
  const [selectedFuelType, setSelectedFuelType] = useState(() => {
    if (location.state && location.state.fuelType && ['petrol', 'diesel', 'highOctane'].includes(location.state.fuelType)) {
      return location.state.fuelType
    }
    return 'petrol'
  })
  const [fuelQty, setFuelQty] = useState(() => {
    if (location.state && location.state.qty && ['petrol', 'diesel', 'highOctane'].includes(location.state.fuelType)) {
      const q = Number(location.state.qty)
      return Math.min(15, Math.max(5, q || 5))
    }
    return 5
  })

  const [orderGas, setOrderGas] = useState(false)
  const [gasQty, setGasQty] = useState(5) // Default 5 Kg

  const [orderWater, setOrderWater] = useState(false)
  const [waterQty, setWaterQty] = useState(10) // Default 10 Gallons

  // Refueling Delivery Application / Target Asset (Car, Bike, Generator, Machinery, Storage)
  const [deliveryApplication, setDeliveryApplication] = useState('car')
  const [assetIdentifier, setAssetIdentifier] = useState('')

  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliverySpeed, setDeliverySpeed] = useState('simple') // 'simple' or 'urgent'
  
  const { prices: livePrices, basePrices: liveBasePrices, pumpMarkup = 2.50 } = useFuelPrices()
  const [prices, setPrices] = useState({ ...livePrices })
  const [basePrices, setBasePrices] = useState(liveBasePrices ? { ...liveBasePrices } : null)

  useEffect(() => {
    setPrices(livePrices)
    if (liveBasePrices) setBasePrices(liveBasePrices)
  }, [livePrices, liveBasePrices])

  // Error state
  const [errors, setErrors] = useState({})

  // Tracker modal
  const [trackerOpen, setTrackerOpen] = useState(false)
  const [trackerOrderId, setTrackerOrderId] = useState('')
  const [trackerEta, setTrackerEta] = useState('45 Mins')
  const [trackerProgress, setTrackerProgress] = useState(0)
  const [generatedWaUrl, setGeneratedWaUrl] = useState('')
  const [trackerSteps, setTrackerSteps] = useState([
    { status: 'active', title: 'Order Confirmed & Depot Assigned', desc: 'Your payment method and location are validated.' },
    { status: '', title: 'Fuel Dispatched & En Route', desc: 'Tanker is routing to your address from the nearest hub.' },
    { status: '', title: 'Delivered & Calibrated', desc: 'Fuel tank filled and calibrated flow receipt generated.' },
  ])

  // Active Order Persistence, Anti-Spam Cooldown & Live Countdown Timer
  const [activeOrder, setActiveOrder] = useState(null)
  const [showCooldownModal, setShowCooldownModal] = useState(false)
  const [remainingEtaSeconds, setRemainingEtaSeconds] = useState(0)
  const [countdownText, setCountdownText] = useState('')

  // Official Digital Invoice Modal & PDF Download Flow
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [waRedirectCountdown, setWaRedirectCountdown] = useState(null)
  const [isNewOrderJustPlaced, setIsNewOrderJustPlaced] = useState(false)
  const [verifiedOrderParam, setVerifiedOrderParam] = useState(null)

  // Listen for QR code verification scan URL (?verify=ZYP-XXXXXX or ?order=ZYP-XXXXXX)
  useEffect(() => {
    try {
      if (location.search) {
        const params = new URLSearchParams(location.search)
        const v = params.get('verify') || params.get('order')
        if (v) {
          setVerifiedOrderParam(v.trim().toUpperCase())
        }
      }
    } catch (e) {}
  }, [location.search])

  // Dynamically load GSAP for truck button animation on-demand (performance optimization)
  useEffect(() => {
    if (!window.gsap && typeof document !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Computed summary
  const fuelRate = prices[selectedFuelType]
  const fuelCost = orderFuel ? (fuelRate * fuelQty) : 0
  const gasRate = prices.lpg
  const gasCost = orderGas ? (gasRate * gasQty) : 0
  const waterRate = prices.water // Flat Rs. 100.00 per Gallon
  const waterCost = orderWater ? (waterRate * waterQty) : 0

  const baseCost = fuelCost + gasCost + waterCost

  // Delivery Charges:
  // Flat Standard Delivery: Rs. 280.00 for doorstep dispatches (5L Min - 15L Max per order)
  const standardFee = (orderFuel || orderGas || orderWater) ? 280 : 0
  const urgentFee = deliverySpeed === 'urgent' ? 100 : 0
  const deliveryFee = standardFee + urgentFee
  const total = baseCost + deliveryFee

  // COD is enabled for small orders
  const isCodEligible = (!orderFuel || fuelQty <= 10) && (!orderGas || gasQty <= 10) && (!orderWater || waterQty <= 20)

  const fmt = (n) => `Rs. ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  // Welcome toast from localStorage
  useEffect(() => {
    const lastOrder = localStorage.getItem('zyphuel_last_order')
    if (lastOrder) {
      const parsed = JSON.parse(lastOrder)
      showToast(`Welcome back, ${parsed.name}! Form pre-filled from your last visit.`, 'welcome')
      setName(parsed.name || '')
      setPhone(parsed.phone || '')
      setEmail(parsed.email || '')
      setAddress(parsed.address || '')
      
      setOrderFuel(true)
      setOrderGas(false)
      setOrderWater(false)

      if (parsed.fuelType) {
        if (parsed.fuelType === 'lpg' || parsed.fuelType === 'water') {
          setSelectedFuelType('petrol')
          setFuelQty(5)
          showToast(`Gas Delivery & Water Refill are currently unavailable. Switched to Fuel Delivery.`, 'warning')
        } else {
          setSelectedFuelType(parsed.fuelType)
          setFuelQty(Math.min(15, Math.max(5, Number(parsed.quantity) || 5)))
        }
      }

      if (parsed.selectedFuelType && ['petrol', 'diesel', 'highOctane'].includes(parsed.selectedFuelType)) {
        setSelectedFuelType(parsed.selectedFuelType)
      }
      if (parsed.deliveryApplication && DELIVERY_APPLICATION_CONFIG[parsed.deliveryApplication]) {
        setDeliveryApplication(parsed.deliveryApplication)
      }
      if (parsed.assetIdentifier) {
        setAssetIdentifier(parsed.assetIdentifier)
      }
      if (parsed.fuelQty) setFuelQty(Math.min(15, Math.max(5, Number(parsed.fuelQty) || 5)))
      if (parsed.deliverySpeed) setDeliverySpeed(parsed.deliverySpeed)
    }
  }, []) // eslint-disable-line

  // Restore Active Order & Live Countdown from localStorage
  useEffect(() => {
    try {
      const storedActive = localStorage.getItem('zyphuel_active_order')
      if (storedActive) {
        const order = JSON.parse(storedActive)
        const elapsedSeconds = Math.floor((Date.now() - order.placedAt) / 1000)
        const durationMinutes = order.durationMinutes || (order.deliverySpeed === 'urgent' ? 20 : 45)
        const totalDurationSeconds = durationMinutes * 60
        const remaining = totalDurationSeconds - elapsedSeconds

        if (order.status !== 'delivered' && remaining > 0) {
          setActiveOrder(order)
          setRemainingEtaSeconds(remaining)
          const mins = Math.floor(remaining / 60)
          const secs = remaining % 60
          const formattedEta = mins > 0 ? `${mins}m ${secs < 10 ? '0' : ''}${secs}s` : `${secs}s`
          setCountdownText(formattedEta)
          if (order.invoiceData) setInvoiceData(order.invoiceData)
          if (order.waUrl) setGeneratedWaUrl(order.waUrl)
          setTrackerOrderId(`ORDER #${order.orderId}`)
        } else if (order.status === 'delivered') {
          setActiveOrder(order)
          if (order.invoiceData) setInvoiceData(order.invoiceData)
        }
      }
    } catch (e) {
      console.warn('Could not restore zyphuel_active_order:', e)
    }
  }, [])

  // Live Second-by-Second Countdown for Active Order
  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered') return
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - activeOrder.placedAt) / 1000)
      const durationMinutes = activeOrder.durationMinutes || (activeOrder.deliverySpeed === 'urgent' ? 20 : 45)
      const totalDurationSeconds = durationMinutes * 60
      const remaining = Math.max(0, totalDurationSeconds - elapsedSeconds)
      setRemainingEtaSeconds(remaining)

      const mins = Math.floor(remaining / 60)
      const secs = remaining % 60
      const formattedEta = mins > 0 ? `${mins}m ${secs < 10 ? '0' : ''}${secs}s` : `${secs}s`
      setCountdownText(formattedEta)

      if (remaining > 0) {
        setTrackerEta(`~${mins + 1} Mins Remaining (${activeOrder.deliverySpeed === 'urgent' ? 'Urgent Priority (Within 45 Mins)' : 'Standard Dispatch (Within 45 Mins)'})`)
      } else {
        setTrackerEta('Arrived at Destination!')
        setTrackerProgress(100)
        setDeliveryPhase('delivered')
        const updated = { ...activeOrder, status: 'delivered' }
        setActiveOrder(updated)
        try {
          localStorage.setItem('zyphuel_active_order', JSON.stringify(updated))
        } catch (e) {}
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [activeOrder])

  // Smooth WhatsApp auto-redirect countdown after PDF download
  useEffect(() => {
    if (waRedirectCountdown === null) return
    if (waRedirectCountdown > 0) {
      const t = setTimeout(() => {
        setWaRedirectCountdown(prev => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearTimeout(t)
    } else if (waRedirectCountdown === 0) {
      if (generatedWaUrl) {
        try {
          window.open(generatedWaUrl, '_blank')
        } catch (err) {
          console.warn('Could not auto-open WhatsApp:', err)
        }
      }
      setWaRedirectCountdown(null)
    }
  }, [waRedirectCountdown, generatedWaUrl])

  const handleCancelWaRedirect = () => {
    setWaRedirectCountdown(null)
  }

  const handleOpenWhatsAppNow = () => {
    setWaRedirectCountdown(null)
    if (generatedWaUrl) {
      try {
        window.open(generatedWaUrl, '_blank')
      } catch (err) {
        console.warn('Could not open WhatsApp:', err)
      }
    }
  }

  // Quantity sync helpers (Increments default +1 unit, minimum fuel 5L, maximum fuel 15L)
  const syncFuelQty = (val) => {
    let v = parseInt(val) || 0
    if (v < 5) v = 5
    if (v > 15) v = 15
    setFuelQty(v)
  }

  const syncGasQty = (val) => {
    let v = parseInt(val) || 0
    if (v < 1) v = 1
    if (v > 200) v = 200
    setGasQty(v)
  }

  const syncWaterQty = (val) => {
    let v = parseInt(val) || 0
    if (v < 1) v = 1
    if (v > 500) v = 500
    setWaterQty(v)
  }

  // Validation
  const validateForm = () => {
    const newErrors = {}
    if (!orderFuel && !orderGas && !orderWater) {
      newErrors.items = 'Please select at least one item category to order.'
    }
    if (address.trim().length < 15) newErrors.address = 'Please provide a valid delivery address in Lahore.'
    if (name.trim().length < 3) newErrors.name = 'Full name is required.'
    const pRegex = /^((\+92)|(0092))?-?3[0-9]{2}-?[0-9]{7}$|^03[0-9]{2}-?[0-9]{7}$/
    if (!pRegex.test(phone.trim())) newErrors.phone = 'Use format: +92-3XX-XXXXXXX or 03XX-XXXXXXX.'
    const eRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!eRegex.test(email.trim())) newErrors.email = 'Provide a valid email address.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Tracker simulation & WhatsApp Redirect
  const startTracking = (orderName, isAdditional = false) => {
    const id = 'ZYP-' + Math.floor(100000 + Math.random() * 900000)
    setTrackerOrderId(`ORDER #${id}`)
    
    const durationMinutes = 45
    setTrackerEta(deliverySpeed === 'urgent' ? '~45 Mins Remaining (Urgent Priority)' : '~45 Mins Remaining (Standard Dispatch)')
    setRemainingEtaSeconds(durationMinutes * 60)
    setCountdownText(`${durationMinutes}m 00s`)

    const appConfig = DELIVERY_APPLICATION_CONFIG[deliveryApplication] || DELIVERY_APPLICATION_CONFIG.car
    const appLabel = `${appConfig.shortLabel}${assetIdentifier ? ` (${assetIdentifier})` : ''}`

    const itemsList = [
      `${fuelQty}L of ${FUEL_DISPLAY[selectedFuelType]} for ${appLabel} (@ Rs. ${fuelRate.toFixed(2)}/L = Rs. ${fuelCost.toLocaleString()})`
    ]
    const itemsDesc = itemsList.join(' + ')

    const dispatchTitle = `${FUEL_DISPLAY[selectedFuelType]} Dispatched`

    // Initial Stage 1: Order Confirmed, loading depot
    setTrackerSteps([
      { 
        status: 'active', 
        title: 'Order Confirmed & Depot Assigned', 
        desc: `Validation complete for ${orderName || name || 'Customer'}. Assigned to Lahore Hub #01. Bowser queue scheduled.` 
      },
      { 
        status: '', 
        title: `${dispatchTitle} En Route`, 
        desc: `Bowser carrying ${fuelQty}L of ${FUEL_DISPLAY[selectedFuelType]} for ${appLabel} to ${address || 'your address'}. Speed: ${deliverySpeed === 'urgent' ? 'Urgent Priority (Within 45 Mins)' : 'Simple Standard (Within 45 Mins)'}.` 
      },
      { 
        status: '', 
        title: 'Delivered & Calibrated', 
        desc: `Awaiting arrival at destination. 0.01L calibrated meter refueling and tamper-proof printed receipt.` 
      },
    ])
    setTrackerProgress(20)
    setTrackerOpen(true)

    // Generate Official Digital Invoice
    const now = new Date()
    const formattedDate = now.toLocaleDateString('en-PK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-PK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })

    const amountInWords = numberToWords(total)

    const inv = {
      orderId: id,
      date: formattedDate,
      customerName: orderName || name || 'Valued Customer',
      phone: phone || 'Not provided',
      email: email || 'Not provided',
      address: address || 'Lahore, Pakistan',
      deliverySpeed: deliverySpeed === 'urgent' ? '⚡ Urgent Priority Dispatch (Within 45 Mins)' : 'Standard Dispatch (Within 45 Mins)',
      paymentMethod: isCodEligible ? 'Cash on Delivery (COD)' : 'Advance Direct Bank Transfer',
      isUrgent: deliverySpeed === 'urgent',
      deliveryApplication: appConfig.label,
      assetIdentifier: assetIdentifier || 'Standard Direct Fill',
      items: [
        {
          title: `Euro-V ${FUEL_DISPLAY[selectedFuelType]} [${appConfig.shortLabel}]`,
          detail: `Refueling Target: ${appConfig.label}${assetIdentifier ? ` (${assetIdentifier})` : ''} • 0.01L Calibrated Flow-Meter`,
          qty: `${fuelQty} Litres`,
          rate: `Rs. ${fuelRate.toFixed(2)}/L`,
          cost: fuelCost
        }
      ],
      subtotal: baseCost,
      deliveryFee: deliveryFee,
      total: total,
      amountInWords: amountInWords,
      ntn: '9482710-3',
      ograLicense: 'OGRA/DL-7492/LHE',
      secp: '0248195',
      securityHash: `ZYP-${id}-${Math.floor(Date.now() / 1000).toString(16).toUpperCase()}`,
      dispenserUnit: 'Bowser #04 (Positive Displacement Flow-Meter)',
      temperatureComp: '15°C Automatic Temperature Compensation (ATC)'
    }
    setInvoiceData(inv)

    // Build structured WhatsApp dispatch message with all details
    const waLines = [
      `⚡ *NEW ZYPHUEL ORDER - #${id}*`,
      `--------------------------------`,
      `👤 *Customer Name:* ${orderName || name || 'Valued Customer'}`,
      `📞 *Phone Number:* ${phone || 'Not provided'}`,
      `📧 *Email:* ${email || 'Not provided'}`,
      `📍 *Delivery Address:* ${address}`,
      `🎯 *Refueling Target:* ${appConfig.label}${assetIdentifier ? ` (${assetIdentifier})` : ''}`,
      notes ? `📝 *Special Instructions:* ${notes}` : null,
      `🚀 *Dispatch Speed:* ${deliverySpeed === 'urgent' ? '⚡ Urgent Priority Dispatch (Within 45 mins) [+Rs. 100]' : 'Standard Dispatch (Within 45 mins)'}`,
      `💳 *Payment Method:* ${isCodEligible ? 'Cash on Delivery (COD)' : 'Bank Transfer / Advance'}`,
      ``,
      `📦 *Items Ordered:*`,
      ...itemsList.map(item => `  • ${item}`),
      ``,
      `💵 *Subtotal:* Rs. ${baseCost.toLocaleString()}`,
      `🚚 *Delivery Charges:* Rs. ${deliveryFee}${deliverySpeed === 'urgent' ? ' (incl. Rs. 100 Urgent Surcharge)' : ''}`,
      `💰 *TOTAL BILL:* Rs. ${total.toLocaleString()}`,
      `--------------------------------`,
      `📍 *Central Dispatch:* Lahore Hub #01, Pakistan`,
      `Please confirm fleet dispatch for my order.`
    ].filter(line => line !== null).join('\n')

    const waUrl = `https://wa.me/923230112464?text=${encodeURIComponent(waLines)}`
    setGeneratedWaUrl(waUrl)

    // Open Official Digital Invoice modal first so customer can review and download PDF before WhatsApp redirection
    setIsNewOrderJustPlaced(true)
    setInvoiceOpen(true)

    // Persist new active order in state and localStorage
    const newActiveOrder = {
      orderId: id,
      placedAt: Date.now(),
      customerName: orderName || name || 'Valued Customer',
      phone: phone || '',
      email: email || '',
      address: address || '',
      itemsList,
      itemsSummary: itemsDesc,
      selectedFuelType,
      fuelQty,
      deliveryApplication,
      assetIdentifier,
      deliveryApplicationLabel: appConfig.label,
      orderFuel: true,
      deliverySpeed,
      total,
      durationMinutes,
      status: 'loading',
      invoiceData: inv,
      waUrl: waUrl
    }
    setActiveOrder(newActiveOrder)
    try {
      localStorage.setItem('zyphuel_active_order', JSON.stringify(newActiveOrder))
    } catch (e) {}

    // Realistic Transition to En Route Dispatch:
    // After ~10 seconds of depot preparation, transition to "Dispatched & En Route"
    if (trackingIntervalRef.current) clearTimeout(trackingIntervalRef.current)
    trackingIntervalRef.current = setTimeout(() => {
      setTrackerSteps([
        { 
          status: 'completed', 
          title: 'Order Confirmed & Depot Assigned', 
          desc: `Validation complete for ${orderName || name || 'Customer'}. Assigned to Lahore Hub #01.` 
        },
        { 
          status: 'active', 
          title: `${dispatchTitle} En Route`, 
          desc: `Bowser #04 dispatched with calibrated digital flow-meter. Live GPS telemetry active to ${address || 'your address'}.` 
        },
        { 
          status: '', 
          title: 'Delivered & Calibrated', 
          desc: `Awaiting arrival at destination. 0.01L calibrated meter refueling and tamper-proof printed receipt.` 
        },
      ])
      setTrackerProgress(60)
      setDeliveryPhase('transit')
      showToast('Bowser vehicle has been dispatched and is en route!', 'success')

      setActiveOrder(prev => {
        if (!prev) return prev
        const updated = { ...prev, status: 'transit' }
        try {
          localStorage.setItem('zyphuel_active_order', JSON.stringify(updated))
        } catch (e) {}
        return updated
      })
    }, 10000)
  }

  // Manual trigger for QA & verification of final delivery stage
  const handleSimulateDelivery = () => {
    setTrackerSteps(prev => [
      { ...prev[0], status: 'completed' },
      { ...prev[1], status: 'completed' },
      { 
        status: 'completed', 
        title: 'Delivered & Calibrated', 
        desc: `Delivery successfully completed at ${address || activeOrder?.address || 'your address'}. Calibrated flow receipt verified.` 
      },
    ])
    setTrackerProgress(100)
    setTrackerEta('Delivery Complete & Calibrated')
    setDeliveryPhase('delivered')
    showToast('Delivery completed and flow-meter calibrated!', 'success')

    setActiveOrder(prev => {
      if (!prev) return prev
      const updated = { ...prev, status: 'delivered' }
      try {
        localStorage.setItem('zyphuel_active_order', JSON.stringify(updated))
      } catch (e) {}
      return updated
    })
  }

  // Open existing active tracker from notification banner
  const handleOpenActiveTracker = () => {
    if (!activeOrder) return
    setTrackerOrderId(`ORDER #${activeOrder.orderId}`)
    const elapsedSeconds = Math.floor((Date.now() - activeOrder.placedAt) / 1000)
    const isTransit = elapsedSeconds > 10 || activeOrder.status === 'transit'
    const isDelivered = activeOrder.status === 'delivered'

    setTrackerSteps([
      {
        status: 'completed',
        title: 'Order Confirmed & Depot Assigned',
        desc: `Validation complete for ${activeOrder.customerName || 'Customer'}. Assigned to Lahore Hub #01.`
      },
      {
        status: isDelivered ? 'completed' : (isTransit ? 'active' : ''),
        title: `${FUEL_DISPLAY[activeOrder.selectedFuelType] || 'Fuel'} Dispatched & En Route`,
        desc: `Bowser #04 carrying ${activeOrder.itemsSummary || 'fuel'} to ${activeOrder.address}. Speed: ${activeOrder.deliverySpeed === 'urgent' ? 'Urgent Priority (Within 45 Mins)' : 'Standard (Within 45 Mins)'}.`
      },
      {
        status: isDelivered ? 'completed' : '',
        title: 'Delivered & Calibrated',
        desc: isDelivered
          ? `Delivery completed successfully at ${activeOrder.address}. Safe journey!`
          : `Awaiting arrival at ${activeOrder.address}. 0.01L calibrated meter refueling.`
      }
    ])
    setTrackerProgress(isDelivered ? 100 : (isTransit ? 60 : 25))
    setDeliveryPhase(isDelivered ? 'delivered' : (isTransit ? 'transit' : 'loading'))
    if (activeOrder.invoiceData) setInvoiceData(activeOrder.invoiceData)
    if (activeOrder.waUrl) setGeneratedWaUrl(activeOrder.waUrl)
    setTrackerOpen(true)
  }

  // Truck button submit with anti-spam cooldown protection
  const handleTruckClick = () => {
    if (isSubmittingRef.current) return
    if (!validateForm()) {
      showToast('Please check form inputs for errors.', 'error')
      return
    }

    // Anti-spam cooldown check: If an active order was placed within the last 15 minutes and is not delivered
    if (activeOrder && activeOrder.status !== 'delivered') {
      const elapsed = Date.now() - activeOrder.placedAt
      if (elapsed < 15 * 60 * 1000) {
        setShowCooldownModal(true)
        return
      }
    }

    proceedOrderSubmission(false)
  }

  const proceedOrderSubmission = (isAdditional = false) => {
    isSubmittingRef.current = true

    const orderPayload = { 
      name, 
      phone, 
      email, 
      address, 
      orderFuel: true,
      selectedFuelType, 
      fuelQty, 
      deliveryApplication,
      assetIdentifier,
      deliverySpeed 
    }
    localStorage.setItem('zyphuel_last_order', JSON.stringify(orderPayload))

    const button = truckBtnRef.current
    if (!button) return

    const gsap = window.gsap
    if (!gsap) {
      button.classList.add('animation', 'done')
      startTracking(name, isAdditional)
      isSubmittingRef.current = false
      return
    }

    const box = button.querySelector('.box')
    const truck = button.querySelector('.truck')

    if (!button.classList.contains('done')) {
      if (!button.classList.contains('animation')) {
        button.classList.add('animation')
        gsap.to(button, { '--box-s': 1, '--box-o': 1, duration: 0.3, delay: 0.5 })
        gsap.to(box, { x: 0, duration: 0.4, delay: 0.7 })
        gsap.to(button, { '--hx': -5, '--bx': 50, duration: 0.18, delay: 0.92 })
        gsap.to(box, { y: 0, duration: 0.1, delay: 1.15 })
        gsap.set(button, { '--truck-y': 0, '--truck-y-n': -26 })
        gsap.to(button, {
          '--truck-y': 1, '--truck-y-n': -25, duration: 0.2, delay: 1.25,
          onComplete: () => {
            gsap.timeline({
              onComplete: () => {
                button.classList.add('done')
                startTracking(name, isAdditional)
                isSubmittingRef.current = false
              }
            })
              .to(truck, { x: 0, duration: 0.4 })
              .to(truck, { x: 40, duration: 1 })
              .to(truck, { x: 20, duration: 0.6 })
              .to(truck, { x: 96, duration: 0.4 })
            gsap.to(button, { '--progress': 1, duration: 2.4, ease: 'power2.in' })
          }
        })
      }
    } else {
      button.classList.remove('animation', 'done')
      if (gsap) {
        gsap.set(truck, { x: 4 })
        gsap.set(button, { '--progress': 0, '--hx': 0, '--bx': 0, '--box-s': 0.5, '--box-o': 0, '--truck-y': 0, '--truck-y-n': -26 })
        gsap.set(box, { x: -24, y: -6 })
      }
      isSubmittingRef.current = false
      startTracking(name, isAdditional)
    }
  }

  const closeTracker = () => {
    setTrackerOpen(false)
  }

  const resetOrder = () => {
    closeTracker()
    const button = truckBtnRef.current
    if (button) {
      button.classList.remove('animation', 'done')
      const gsap = window.gsap
      if (gsap) {
        const truck = button.querySelector('.truck')
        const box = button.querySelector('.box')
        gsap.set(truck, { x: 4 })
        gsap.set(button, { '--progress': 0, '--hx': 0, '--bx': 0, '--box-s': 0.5, '--box-o': 0, '--truck-y': 0, '--truck-y-n': -26 })
        gsap.set(box, { x: -24, y: -6 })
      }
    }
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Invoice Direct PDF Generation & Download (Pure Vector PDF via jsPDF)
  const handleDownloadInvoicePDF = async (triggerRedirectAfter = true) => {
    if (!invoiceData) return
    setIsGeneratingPdf(true)
    showToast('Generating official PDF invoice...', 'info')

    try {
      await generateInvoicePdf(invoiceData)
      showToast('Official PDF invoice downloaded successfully!', 'success')

      // Smoothly trigger WhatsApp redirect countdown if requested
      if (triggerRedirectAfter && generatedWaUrl) {
        setWaRedirectCountdown(3)
      }
    } catch (err) {
      console.error('Vector PDF generation error, trying print fallback:', err)
      window.print()
      if (triggerRedirectAfter && generatedWaUrl) {
        setWaRedirectCountdown(3)
      }
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  // Invoice Print / PDF Export
  const handlePrintInvoice = () => {
    window.print()
  }

  // Invoice Standalone HTML File Download
  const handleDownloadInvoiceHTML = () => {
    if (!invoiceData) return
    const words = invoiceData.amountInWords || numberToWords(invoiceData.total)
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Zyphuel Commercial Tax Invoice #${invoiceData.orderId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0b1329; color: #0f172a; padding: 24px; margin: 0; }
    .inv-card { max-width: 760px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #cbd5e1; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.25); }
    .top-navy-bar { background: #0f172a; color: #ffffff; padding: 22px 28px; border-bottom: 3px solid #0284c7; display: flex; justify-content: space-between; align-items: flex-start; }
    .brand-title { font-size: 22px; font-weight: 900; letter-spacing: 0.04em; margin: 0; color: #ffffff; }
    .brand-reg { font-size: 10px; font-weight: 800; color: #38bdf8; text-transform: uppercase; margin: 4px 0 0 0; letter-spacing: 0.05em; }
    .brand-creds { font-size: 11px; color: #94a3b8; margin: 5px 0 0 0; line-height: 1.4; }
    .doc-meta { text-align: right; }
    .doc-type { font-size: 13px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
    .doc-id { font-size: 15px; font-weight: 900; color: #38bdf8; font-family: monospace; }
    .doc-date { font-size: 11px; color: #cbd5e1; margin-top: 3px; }
    .pill-confirmed { display: inline-block; margin-top: 6px; background: #10b981; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
    .body-wrap { padding: 24px 28px; }
    .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .profile-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; }
    .profile-card-title { font-size: 10px; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px; }
    .profile-line { font-size: 12px; color: #334155; margin: 3px 0; line-height: 1.4; }
    .table-wrap { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 18px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; color: #1e293b; font-weight: 700; border-bottom: 1px solid #cbd5e1; font-size: 11px; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    .center { text-align: center; }
    .right { text-align: right; }
    .mono { font-family: monospace; }
    .words-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 14px; margin-bottom: 18px; font-size: 12px; color: #166534; }
    .words-label { font-size: 10px; font-weight: 800; color: #15803d; text-transform: uppercase; margin-bottom: 2px; }
    .summary-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; margin-bottom: 20px; align-items: flex-start; }
    .guarantee-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; font-size: 11px; color: #475569; line-height: 1.45; }
    .guarantee-title { font-size: 11px; font-weight: 800; color: #15803d; margin-bottom: 4px; }
    .totals-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; font-size: 12px; }
    .t-row { display: flex; justify-content: space-between; padding: 3px 0; color: #475569; }
    .t-grand { border-top: 2px solid #0284c7; margin-top: 6px; padding-top: 6px; font-size: 14px; font-weight: 900; color: #0284c7; }
    .footer-bar { border-top: 1px dashed #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
    @media print { body { background: #fff; padding: 0; } .inv-card { border: none; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="inv-card">
    <div class="top-navy-bar">
      <div>
        <h1 class="brand-title">ZYPHUEL ENERGY LOGISTICS</h1>
        <div class="brand-reg">GOVERNMENT OF PAKISTAN &bull; OGRA LICENSED PETROLEUM DISTRIBUTOR</div>
        <div class="brand-creds">
          OGRA Lic: OGRA/DL-7492/LHE &bull; NTN / STRN: 9482710-3 &bull; SECP: 0248195<br>
          Lahore Hub #01 &bull; 75-Main Boulevard, Gulberg III &bull; 24/7 Helpline: +92 3230-112464
        </div>
      </div>
      <div class="doc-meta">
        <div class="doc-type">COMMERCIAL TAX INVOICE</div>
        <div class="doc-id">#${invoiceData.orderId}</div>
        <div class="doc-date">${invoiceData.date}</div>
        <div><span class="pill-confirmed">&#10003; DISPATCH CONFIRMED</span></div>
      </div>
    </div>
    <div class="body-wrap">
      <div class="profile-grid">
        <div class="profile-card">
          <div class="profile-card-title">Billed To / Recipient Site</div>
          <div class="profile-line"><strong>${invoiceData.customerName}</strong></div>
          <div class="profile-line">Phone: ${invoiceData.phone}</div>
          ${invoiceData.email && invoiceData.email !== 'Not provided' ? `<div class="profile-line">Email: ${invoiceData.email}</div>` : ''}
          <div class="profile-line">Location: ${invoiceData.address}</div>
        </div>
        <div class="profile-card">
          <div class="profile-card-title">Dispatch &amp; Calibration Telemetry</div>
          <div class="profile-line">Payment Method: <strong>${invoiceData.paymentMethod}</strong></div>
          <div class="profile-line">Dispatch Priority: <strong>${invoiceData.deliverySpeed}</strong></div>
          <div class="profile-line">Dispenser Metering: <strong>Positive Displacement (0.01L Calibrated)</strong></div>
          <div class="profile-line">Temperature Reference: <strong>15&deg;C Automatic Compensation (ATC)</strong></div>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th style="width:8%;" class="center">SR#</th>
              <th style="width:46%;">Description &amp; Specifications</th>
              <th style="width:14%;" class="center">Qty</th>
              <th style="width:16%;" class="right">Unit Rate</th>
              <th style="width:16%;" class="right">Total (PKR)</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map((item, i) => `
              <tr>
                <td class="center mono" style="color:#64748b;">${String(i + 1).padStart(2, '0')}</td>
                <td><strong>${item.title}</strong><br><span style="font-size:10px; color:#64748b;">${item.detail}</span></td>
                <td class="center" style="font-weight:700;">${item.qty}</td>
                <td class="right mono">${item.rate}</td>
                <td class="right mono" style="font-weight:800;">Rs. ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="words-box">
        <div class="words-label">Amount Chargeable in Words:</div>
        <strong>${words}</strong>
      </div>

      <div class="summary-grid">
        <div class="guarantee-card">
          <div class="guarantee-title">&#10003; OGRA Euro-V &amp; Volumetric Accuracy Guarantee</div>
          Sourced directly from licensed primary oil marketing depots. Dispensed with positive displacement flow meters (0.01L accuracy) and optical anti-tamper seals. Zero short-fueling guarantee.
          <div style="margin-top:6px; font-family:monospace; font-size:10px; color:#64748b;">
            SECURITY HASH: ${invoiceData.securityHash || 'ZYP-SEC-VERIFIED'}
          </div>
        </div>
        <div class="totals-card">
          <div class="t-row"><span>Subtotal Items</span><strong>Rs. ${invoiceData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
          <div class="t-row"><span>Doorstep Bowser Delivery</span><strong>${invoiceData.deliveryFee === 0 ? 'FREE' : `Rs. ${invoiceData.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</strong></div>
          ${invoiceData.isUrgent ? '<div class="t-row" style="color:#ea580c; font-size:11px;"><span>Urgent Priority Surcharge</span><span>+Rs. 100.00 (Included)</span></div>' : ''}
          <div class="t-row t-grand"><span>Total Payable (PKR)</span><span>Rs. ${invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 130px 1fr 1.2fr; gap: 14px; margin-bottom: 20px; align-items: stretch;">
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <div style="font-size: 9px; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px;">📱 Camera Scan (QR)</div>
          <div style="display: flex; justify-content: center; width: 100%; margin: 2px auto; background: #fff; padding: 3px; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${generateQrSvg(`https://zyphuel.netlify.app/order/?verify=${invoiceData.orderId}`, { size: 84, margin: 2 })}
          </div>
          <div style="font-size: 8px; color: #64748b; margin-top: 4px;">Point phone camera</div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <div style="font-size: 9px; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px;">Dispatch Barcode • Code 128</div>
          <div style="display: flex; justify-content: center; width: 100%; margin: 2px auto; background: #fff; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
            ${generateBarcodeSvg(invoiceData.orderId, { moduleWidth: 2.2, height: 46, quietZone: 16, color: '#000000', showText: true, fontSize: 11 })}
          </div>
          <div style="font-size: 8px; color: #64748b; margin-top: 4px;">Laser gun & Google Lens compatible</div>
        </div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 10px; font-size: 11px; font-weight: 800; color: #166534; margin-bottom: 8px;">★ ZYPHUEL PAKISTAN • CERTIFIED DISPATCH ★</div>
          <div style="font-size: 12px; font-weight: 800; color: #0f172a; margin-bottom: 3px;">Computerized Verified Commercial Invoice</div>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">Automated Depots Dispatch Gateway • Lahore Hub #01</div>
          <div style="font-size: 8.5px; color: #94a3b8;">Valid without physical signature under Electronic Transactions Ordinance 2002</div>
        </div>
      </div>

      <div class="footer-bar">
        <span>Computerized Verified Invoice &bull; Zyphuel Refueling Systems Pakistan</span>
        <span>Helpline WhatsApp: +92 3230-112464</span>
      </div>
    </div>
  </div>
</body>
</html>`

    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Zyphuel-Invoice-${invoiceData.orderId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    showToast('Invoice downloaded successfully!', 'success')
  }

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* Live Fuel Price Ticker */}
        <div className="price-ticker-wrap">
          <style>{`
            #fuel-price-ticker {
              display: flex !important;
              align-items: center !important;
              white-space: nowrap !important;
              width: max-content !important;
              will-change: transform !important;
              animation: tickerSlideLTR 32s linear infinite !important;
            }
            #fuel-price-ticker:hover {
              animation-play-state: paused !important;
            }
          `}</style>
          <div className="price-ticker" id="fuel-price-ticker">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="price-ticker-track">
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  Petrol (Premier Euro 5): <strong>Rs. {prices.petrol.toFixed(2)}</strong>/L
                  <span className="price-up">Live <i className="fa-solid fa-caret-up"></i></span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  Diesel (Hi-Cetane Euro 5): <strong>Rs. {prices.diesel.toFixed(2)}</strong>/L
                  <span className="price-up">Live <i className="fa-solid fa-caret-up"></i></span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  High-Octane (Euro 5): <strong>Rs. {prices.highOctane.toFixed(2)}</strong>/L
                  <span className="price-up">Live <i className="fa-solid fa-caret-up"></i></span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  LPG Gas: <strong>Rs. {prices.lpg.toFixed(2)}</strong>/Kg
                  <span className="price-up" style={{ color: '#ef4444' }}>Unavailable</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  Water Refill: <strong>Rs. {prices.water.toFixed(2)}</strong>/Gal
                  <span className="price-up" style={{ color: '#ef4444' }}>Unavailable</span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  Doorstep Delivery: <strong>Rs. 250 (5L) &bull; Rs. 300 (10L) &bull; Rs. 350 (15L)</strong> &bull; Urgent Express: <strong>+Rs. 100</strong>
                  <span className="price-up" style={{ color: '#ea580c' }}>Tiered Rate <i className="fa-solid fa-bell"></i></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Form Section */}
        <section id="order" className="order-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h1 className="section-title">Order Petrol &amp; Diesel Online in Lahore</h1>
            </div>

            {/* Official Scanned Order Authenticity Verification Banner */}
            {verifiedOrderParam && (
              <div className="order-verified-banner fade-in-up" role="alert">
                <div className="verified-banner-inner">
                  <div className="verified-banner-icon">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div className="verified-banner-text">
                    <div className="verified-banner-title">
                      OFFICIAL DISPATCH INVOICE VERIFIED &bull; #{verifiedOrderParam}
                    </div>
                    <div className="verified-banner-desc">
                      Certified Authentic Zyphuel Delivery Order &bull; Calibrated 0.01L Digital Flow Meter &bull; OGRA Euro-V Compliant Supply &bull; Lahore Hub #01
                    </div>
                  </div>
                  <button
                    type="button"
                    className="verified-banner-close"
                    onClick={() => setVerifiedOrderParam(null)}
                    aria-label="Dismiss verification banner"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Active Dispatch Notification Card (Visible if an active order is in progress) */}
            {activeOrder && (
              <div className="active-dispatch-banner fade-in-up" style={{
                background: activeOrder.status === 'delivered'
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(2, 132, 199, 0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(234, 88, 12, 0.08) 100%)',
                border: activeOrder.status === 'delivered' ? '2px solid #10b981' : '2px solid #0284c7',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '26px',
                boxShadow: '0 6px 20px rgba(2, 132, 199, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: activeOrder.status === 'delivered' ? '#10b981' : '#0284c7',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    <i className={activeOrder.status === 'delivered' ? 'fa-solid fa-circle-check' : 'fa-solid fa-truck-fast'}></i>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.02rem' }}>
                        Active Order: #{activeOrder.orderId}
                      </span>
                      <span style={{
                        background: activeOrder.status === 'delivered' ? '#10b981' : (activeOrder.status === 'loading' ? '#f59e0b' : '#0284c7'),
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '2px 9px',
                        borderRadius: '20px',
                        letterSpacing: '0.04em'
                      }}>
                        {activeOrder.status === 'delivered'
                          ? 'DELIVERED & CALIBRATED'
                          : (activeOrder.status === 'loading' ? 'DEPOT LOADING' : 'EN ROUTE / IN TRANSIT')}
                      </span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: '#475569' }}>
                      {activeOrder.itemsSummary || `${activeOrder.fuelQty}L Fuel`} &bull; Destination: <strong>{activeOrder.address}</strong>
                      {activeOrder.status !== 'delivered' && countdownText && (
                        <span style={{ marginLeft: '8px', color: '#0284c7', fontWeight: 700 }}>
                          &bull; ETA: {countdownText}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={handleOpenActiveTracker}
                    className="btn"
                    style={{
                      background: '#0284c7',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <i className="fa-solid fa-location-crosshairs"></i>
                    Track Live Fleet (ٹریک کریں)
                  </button>
                  {activeOrder.invoiceData && (
                    <button
                      type="button"
                      onClick={() => {
                        setInvoiceData(activeOrder.invoiceData)
                        setInvoiceOpen(true)
                      }}
                      className="btn"
                      style={{
                        background: 'rgba(2, 132, 199, 0.1)',
                        color: '#0284c7',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <i className="fa-solid fa-file-invoice"></i>
                      View Invoice (رسید)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Delivery Rate Adjustment Notice Banner (Due to Fuel Prices Increase) */}
            <div className="delivery-rate-notice-banner fade-in-up" style={{
              background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(2, 132, 199, 0.05) 100%)',
              border: '1.5px solid rgba(234, 88, 12, 0.35)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '24px',
              boxShadow: '0 4px 18px rgba(234, 88, 12, 0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              position: 'relative'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.35)',
                marginTop: '2px'
              }}>
                <i className="fa-solid fa-bullhorn"></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span style={{
                    background: '#ea580c',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 9px',
                    borderRadius: '20px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase'
                  }}>
                    Price Notice &bull; ریٹ اپ ڈیٹ
                  </span>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary, #0f172a)', fontSize: '1.02rem' }}>
                    Delivery Fee Adjustment &bull; Volume-Based Rates
                  </span>
                </div>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.88rem', color: 'var(--text-secondary, #475569)', lineHeight: 1.55 }}>
                  Standard doorstep delivery charges for fuel orders are volume-based: <strong style={{ color: '#ea580c', fontWeight: 800 }}>Rs. 250 (5L)</strong> &bull; <strong style={{ color: '#ea580c', fontWeight: 800 }}>Rs. 300 (10L)</strong> &bull; <strong style={{ color: '#ea580c', fontWeight: 800 }}>Rs. 350 (15L)</strong>.
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  <span style={{
                    background: 'rgba(234, 88, 12, 0.12)',
                    color: '#c2410c',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <i className="fa-solid fa-truck"></i> Standard Delivery: <strong>Rs. {standardFee}</strong>
                  </span>
                  <span style={{
                    background: 'rgba(2, 132, 199, 0.12)',
                    color: '#0369a1',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <i className="fa-solid fa-bolt"></i> Urgent Dispatch: <strong>+Rs. 100 Surcharge</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="order-container-grid">

              {/* Left: Order Form */}
              <div className="order-form-panel fade-in-up" id="main-order-panel">
                <form id="fuel-order-form" noValidate onSubmit={e => e.preventDefault()}>

                  {/* Order Progress Stepper */}
                  <div className="order-progress-stepper" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(2, 132, 199, 0.05)',
                    border: '1px solid rgba(2, 132, 199, 0.15)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    marginBottom: '26px',
                    gap: '8px',
                    overflowX: 'auto'
                  }}>
                    {[
                      { num: '01', label: 'Fuel', active: Boolean(selectedFuelType), icon: 'fa-gas-pump' },
                      { num: '02', label: 'Target Asset', active: Boolean(deliveryApplication), icon: 'fa-bullseye' },
                      { num: '03', label: 'Volume (L)', active: Boolean(fuelQty >= 5), icon: 'fa-sliders' },
                      { num: '04', label: 'Delivery', active: Boolean(address.trim().length > 3), icon: 'fa-location-dot' },
                      { num: '05', label: 'Contact', active: Boolean(name && phone), icon: 'fa-truck-fast' }
                    ].map((st, i) => (
                      <div key={st.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <div style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: st.active ? 'var(--accent-color, #0284c7)' : 'rgba(15, 23, 42, 0.1)',
                          color: st.active ? '#ffffff' : 'var(--text-secondary, #64748b)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          transition: 'all 0.3s ease'
                        }}>
                          {st.active ? <i className={`fa-solid ${st.icon}`}></i> : st.num}
                        </div>
                        <span style={{
                          fontSize: '0.8rem',
                          fontWeight: st.active ? 600 : 500,
                          color: st.active ? 'var(--text-primary, #0f172a)' : 'var(--text-secondary, #64748b)'
                        }}>
                          {st.label}
                        </span>
                        {i < 4 && (
                          <div style={{
                            width: '20px',
                            height: '2px',
                            background: st.active ? 'var(--accent-color, #0284c7)' : 'rgba(15, 23, 42, 0.1)',
                            marginLeft: '4px',
                            transition: 'background 0.3s ease'
                          }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 1. Select Fuel Type */}
                  <div className="form-block-title">
                    <i className="fa-solid fa-gas-pump"></i> 1. Select Fuel Type
                  </div>
                  {errors.items && <div className="validation-error-label" style={{ display: 'block', marginBottom: '15px' }}>{errors.items}</div>}
                  
                  <div className="category-selector-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '22px' }}>
                    {['petrol', 'diesel', 'highOctane'].map((type) => {
                      const isSelected = selectedFuelType === type
                      return (
                        <div
                          key={type}
                          className={`category-card${isSelected ? ' active' : ''}`}
                          style={{
                            cursor: 'pointer',
                            padding: '16px 14px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid var(--brand-primary, #0284c7)' : '1px solid var(--border-color)',
                            background: isSelected ? 'rgba(2, 132, 199, 0.08)' : '#ffffff',
                            boxShadow: isSelected ? '0 4px 14px rgba(2, 132, 199, 0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          onClick={() => setSelectedFuelType(type)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: isSelected ? 'var(--brand-primary, #0284c7)' : 'rgba(2, 132, 199, 0.12)',
                              color: isSelected ? '#ffffff' : 'var(--brand-primary, #0284c7)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.9rem'
                            }}>
                              <i className={`fa-solid ${FUEL_ICONS[type] || 'fa-gas-pump'}`}></i>
                            </div>
                            <i className={`fa-solid ${isSelected ? 'fa-circle-check' : 'fa-circle'}`} style={{ color: isSelected ? 'var(--brand-primary, #0284c7)' : '#cbd5e1', fontSize: '1rem' }}></i>
                          </div>
                          <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '3px' }}>
                            {FUEL_DISPLAY[type]}
                          </div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--brand-primary, #0284c7)' }}>
                            Rs. {prices[type].toFixed(2)}/L
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* 2. Fuel Delivery Application / Refueling Target */}
                  <div className="form-block-title" style={{ marginTop: '10px' }}>
                    <i className="fa-solid fa-bullseye"></i> 2. Fuel Delivery Application (Refueling Target)
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '-6px', marginBottom: '14px' }}>
                    Where should our mobile bowser pump the fuel? Select your preferred target:
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                    {Object.values(DELIVERY_APPLICATION_CONFIG).map((app) => {
                      const isSelected = deliveryApplication === app.id
                      return (
                        <div
                          key={app.id}
                          onClick={() => setDeliveryApplication(app.id)}
                          style={{
                            cursor: 'pointer',
                            userSelect: 'none',
                            padding: '14px 10px',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid var(--brand-primary, #0284c7)' : '1px solid var(--border-color)',
                            background: isSelected ? 'rgba(2, 132, 199, 0.08)' : '#ffffff',
                            boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: '6px'
                          }}
                        >
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: isSelected ? 'var(--brand-primary, #0284c7)' : 'rgba(2, 132, 199, 0.1)',
                            color: isSelected ? '#ffffff' : 'var(--brand-primary, #0284c7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.05rem',
                            transition: 'all 0.2s ease'
                          }}>
                            <i className={`fa-solid ${app.icon}`}></i>
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? 'var(--brand-primary, #0284c7)' : 'var(--text-primary)', lineHeight: 1.25 }}>
                            {app.shortLabel}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Target Asset Identifier / Registration Field */}
                  <div className="form-group" style={{ marginBottom: '24px' }}>
                    <label className="form-label" htmlFor="asset-id-input" style={{ fontSize: '0.85rem' }}>
                      <i className="fa-solid fa-id-card"></i> {DELIVERY_APPLICATION_CONFIG[deliveryApplication]?.fieldLabel || 'Vehicle / Equipment Identifier'} <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(Optional for driver dispatch)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="asset-id-input"
                      placeholder={DELIVERY_APPLICATION_CONFIG[deliveryApplication]?.placeholder || 'e.g. LEA-2024'}
                      value={assetIdentifier}
                      onChange={(e) => setAssetIdentifier(e.target.value)}
                    />
                  </div>

                  {/* 3. Configure Fuel Quantity */}
                  <div className="form-block-title" style={{ marginTop: '10px' }}>
                    <i className="fa-solid fa-scale-balanced"></i> 3. Configure Fuel Quantity
                  </div>

                  <div className="quantity-config-card animated fadeIn" style={{ marginBottom: '20px' }}>
                    <div className="quantity-config-header">
                      <span className="config-title"><i className="fa-solid fa-gas-pump"></i> Fuel Volume ({FUEL_DISPLAY[selectedFuelType]})</span>
                      <span className="config-unit">5L – 15L Max per Order</span>
                    </div>
                    
                    <div className="form-group">
                      <div className="stepper-wrap">
                        <div className="quantity-stepper">
                          <button type="button" className="stepper-btn" aria-label="Decrease fuel quantity"
                            onClick={() => syncFuelQty(fuelQty - 1)}
                            disabled={fuelQty <= 5}>-</button>
                          <input type="number" className="stepper-input"
                            value={fuelQty} min="5" max="15" step="1"
                            onChange={e => syncFuelQty(e.target.value)}
                            aria-label="Fuel quantity in Litres" />
                          <button type="button" className="stepper-btn" aria-label="Increase fuel quantity"
                            onClick={() => syncFuelQty(fuelQty + 1)}
                            disabled={fuelQty >= 15}>+</button>
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Litres</span>
                        <div style={{ marginLeft: 'auto' }}>
                          <span style={{ fontSize: '0.82rem', color: '#ea580c', fontWeight: 600 }}>
                            <i className="fa-solid fa-truck"></i> Standard Delivery: <strong>Rs. {standardFee}</strong>
                          </span>
                        </div>
                      </div>
                      
                      <input type="range" className="slider-control"
                        min="5" max="15" step="1" value={fuelQty}
                        onChange={e => syncFuelQty(e.target.value)}
                        aria-label="Fuel quantity slider" />
                      <div className="limits-row">
                        <span>Min: 5 L</span>
                        <span>Max: 15 L (Doorstep Limit)</span>
                      </div>

                      {/* Quick Select Volume Buttons */}
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          Quick Select Volume:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {[5, 7, 10, 12, 15].map(qty => (
                            <button
                              key={qty}
                              type="button"
                              onClick={() => syncFuelQty(qty)}
                              style={{
                                padding: '5px 11px',
                                fontSize: '0.82rem',
                                borderRadius: '6px',
                                fontWeight: fuelQty === qty ? 700 : 500,
                                background: fuelQty === qty ? 'var(--brand-primary, #0284c7)' : 'rgba(0, 0, 0, 0.04)',
                                color: fuelQty === qty ? '#ffffff' : 'var(--text-primary)',
                                border: fuelQty === qty ? '1px solid var(--brand-primary, #0284c7)' : '1px solid rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              {qty} L {qty === 15 ? '• Max' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Delivery Details */}
                  <div className="form-block-title" style={{ marginTop: '30px' }}>
                    <i className="fa-solid fa-location-dot"></i> 4. Delivery Details
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="address-input">Delivery Address in Lahore</label>
                    <input type="text" className="form-control" id="address-input"
                      placeholder="e.g. House 45, Block Y, Phase 3, DHA, Lahore"
                      value={address} onChange={e => setAddress(e.target.value)} required />
                    {errors.address && <div className="validation-error-label" style={{ display: 'block' }}>{errors.address}</div>}
                  </div>

                  {/* Delivery Speed */}
                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label className="form-label" style={{ margin: 0 }}>
                        <i className="fa-solid fa-truck-fast"></i> Delivery Speed Option
                      </label>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '6px',
                        backgroundColor: deliverySpeed === 'urgent' ? 'rgba(234, 88, 12, 0.12)' : 'rgba(2, 132, 199, 0.1)',
                        color: deliverySpeed === 'urgent' ? '#ea580c' : 'var(--brand-primary, #0284c7)'
                      }}>
                        {deliverySpeed === 'urgent' ? '⚡ Urgent Dispatch Selected (+Rs. 100)' : '✓ Standard Dispatch Selected (Within 45 Mins)'}
                      </span>
                    </div>

                    <div className="schedule-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div
                        id="option-speed-simple"
                        className={`schedule-card${deliverySpeed === 'simple' ? ' active' : ''}`}
                        onClick={() => setDeliverySpeed('simple')}
                        style={{
                          cursor: 'pointer',
                          userSelect: 'none',
                          borderRadius: '12px',
                          border: deliverySpeed === 'simple' ? '2px solid var(--brand-primary, #0284c7)' : '2px solid var(--border-color, #cbd5e1)',
                          background: deliverySpeed === 'simple' ? 'rgba(2, 132, 199, 0.08)' : 'var(--bg-primary, #ffffff)',
                          padding: '16px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          boxShadow: deliverySpeed === 'simple' ? '0 4px 14px rgba(2, 132, 199, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: deliverySpeed === 'simple' ? '6px solid var(--brand-primary, #0284c7)' : '2px solid #94a3b8',
                          backgroundColor: '#ffffff',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}></div>
                        <div className="schedule-info" style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="schedule-title" style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                            Simple Delivery
                          </span>
                          <span className="schedule-desc" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Delivery within 45 mins
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--brand-primary, #0284c7)', fontWeight: 700, marginTop: '4px' }}>
                            Standard Rate {standardFee > 0 ? `(Rs. ${standardFee})` : '(Included)'}
                          </span>
                        </div>
                      </div>

                      <div
                        id="option-speed-urgent"
                        className={`schedule-card${deliverySpeed === 'urgent' ? ' active' : ''}`}
                        onClick={() => setDeliverySpeed('urgent')}
                        style={{
                          cursor: 'pointer',
                          userSelect: 'none',
                          borderRadius: '12px',
                          border: deliverySpeed === 'urgent' ? '2px solid #ea580c' : '2px solid var(--border-color, #cbd5e1)',
                          background: deliverySpeed === 'urgent' ? 'rgba(234, 88, 12, 0.08)' : 'var(--bg-primary, #ffffff)',
                          padding: '16px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          boxShadow: deliverySpeed === 'urgent' ? '0 4px 14px rgba(234, 88, 12, 0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: deliverySpeed === 'urgent' ? '6px solid #ea580c' : '2px solid #94a3b8',
                          backgroundColor: '#ffffff',
                          flexShrink: 0,
                          transition: 'all 0.2s ease'
                        }}></div>
                        <div className="schedule-info" style={{ display: 'flex', flexDirection: 'column' }}>
                          <span className="schedule-title" style={{ fontWeight: 800, fontSize: '0.98rem', color: deliverySpeed === 'urgent' ? '#ea580c' : 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="fa-solid fa-bolt" style={{ color: '#ea580c' }}></i> Urgent Delivery
                          </span>
                          <span className="schedule-desc" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                            Delivery within 45 mins (Priority Queue)
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 700, marginTop: '4px' }}>
                            +Rs. 100 Express Priority Surcharge
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5. Contact Details */}
                  <div className="form-block-title">
                    <i className="fa-solid fa-user-shield"></i> 5. Contact Details
                  </div>
                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name-input">Full Name</label>
                      <input type="text" className="form-control" id="name-input"
                        placeholder="Enter your full name"
                        value={name} onChange={e => setName(e.target.value)} required />
                      {errors.name && <div className="validation-error-label" style={{ display: 'block' }}>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone-input">Phone Number (Pakistan)</label>
                      <input type="tel" className="form-control" id="phone-input"
                        placeholder="+92-300-1234567"
                        value={phone} onChange={e => setPhone(e.target.value)} required />
                      {errors.phone && <div className="validation-error-label" style={{ display: 'block' }}>{errors.phone}</div>}
                    </div>
                    <div className="form-group full-width" style={{ marginBottom: 0 }}>
                      <label className="form-label" htmlFor="email-input">Email Address</label>
                      <input type="email" className="form-control" id="email-input"
                        placeholder="email@address.com"
                        value={email} onChange={e => setEmail(e.target.value)} required />
                      {errors.email && <div className="validation-error-label" style={{ display: 'block' }}>{errors.email}</div>}
                    </div>
                  </div>

                  {/* 6. Payment Policy Selection */}
                  <div className="form-block-title" style={{ marginTop: '25px' }}>
                    <i className="fa-solid fa-money-check-dollar"></i> 6. Payment Policy
                  </div>
                  <div className="form-group" style={{ marginBottom: '30px' }}>
                    {isCodEligible ? (
                      <div className="payment-card-notice cod" style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--success-mint)',
                        backgroundColor: 'var(--success-mint-light)',
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontSize: '1.3rem',
                          color: 'var(--success-mint)',
                          backgroundColor: '#ffffff',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)',
                          flexShrink: 0
                        }}>
                          <i className="fa-solid fa-money-bill-wave"></i>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', fontWeight: 800, color: '#064e3b' }}>Payment Mode: Cash on Delivery (COD)</h5>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#065f46', lineHeight: 1.45 }}>
                            Cash on Delivery is enabled for fuel orders up to 10 Litres. Please keep exact change ready.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="payment-card-notice advance" style={{
                        padding: '16px 20px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(14, 165, 233, 0.3)',
                        backgroundColor: 'var(--brand-petrol)',
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center'
                      }}>
                        <div style={{
                          fontSize: '1.3rem',
                          color: 'var(--accent-color)',
                          backgroundColor: '#ffffff',
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)',
                          flexShrink: 0
                        }}>
                          <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <div>
                          <h5 style={{ margin: '0 0 2px 0', fontSize: '0.92rem', fontWeight: 800, color: 'var(--accent-color-hover)' }}>Payment Mode: Advance Payment Required</h5>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                            Orders exceeding 10 Litres of Fuel (11L to 15L Max) require advance bank transfer due to high-volume safety dispatch operations.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Truck Submit Button */}
                  <div className="button-wrapper">
                    <button
                      type="button"
                      className="truck-button"
                      id="truck-submit-btn"
                      ref={truckBtnRef}
                      onClick={handleTruckClick}
                    >
                      <span className="default">Complete Order</span>
                      <span className="success">
                        Order Placed
                        <svg viewBox="0 0 12 10">
                          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                      </span>
                      <div className="truck">
                        <div className="wheel"></div>
                        <div className="back"></div>
                        <div className="front"></div>
                        <div className="box"></div>
                      </div>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Order Summary */}
              <div className="order-summary-sidebar">
                <div className="summary-card">
                  <div className="summary-title">
                    Order Summary
                    <span className="badge" id="summary-badge-city">Lahore</span>
                  </div>

                  {/* Fuel Breakdown */}
                  {orderFuel && (
                    <div className="summary-section" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.4)', paddingBottom: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-gas-pump" style={{ color: 'var(--accent-color)' }}></i> Fuel Delivery
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Fuel Type</span>
                        <strong>{FUEL_DISPLAY[selectedFuelType]}</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Refueling Target</span>
                        <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                          <i className={`fa-solid ${DELIVERY_APPLICATION_CONFIG[deliveryApplication]?.icon || 'fa-car-side'}`} style={{ color: 'var(--accent-color)' }}></i>
                          {DELIVERY_APPLICATION_CONFIG[deliveryApplication]?.shortLabel || 'Direct Fill'}
                          {assetIdentifier ? ` (${assetIdentifier})` : ''}
                        </strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Quantity</span>
                        <strong>{fuelQty} Litres</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Unit Rate</span>
                        <strong>Rs. {fuelRate.toFixed(2)}/L</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Fuel Cost</span>
                        <strong>{fmt(fuelCost)}</strong>
                      </div>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Base Subtotal</span>
                    <strong id="summary-base-cost">{fmt(baseCost)}</strong>
                  </div>
                  
                  <div className="summary-row">
                    <span>Dispatch Speed</span>
                    <strong>
                      {deliverySpeed === 'urgent' ? (
                        <span style={{ color: '#ea580c', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <i className="fa-solid fa-bolt"></i> Urgent (+Rs. 100)
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <i className="fa-solid fa-clock"></i> Standard
                        </span>
                      )}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Delivery Charges</span>
                    <strong>
                      {deliveryFee === 0 ? (
                        <span style={{ color: 'var(--success-mint)' }}>Free (Included)</span>
                      ) : (
                        <span>
                          {fmt(deliveryFee)}
                          {deliverySpeed === 'urgent' && (
                            <span style={{ fontSize: '0.74rem', color: '#ea580c', display: 'block', fontWeight: 600 }}>
                              (incl. Rs. 100 Urgent Surcharge)
                            </span>
                          )}
                        </span>
                      )}
                    </strong>
                  </div>

                  <div className="summary-row total-row">
                    <span>Total Estimated</span>
                    <span className="total-amount" id="summary-total-cost">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO On-Page Guide & FAQ Section: Doorstep Diesel & Petrol Delivery in Lahore */}
        <section className="order-seo-info section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)', marginTop: '40px' }}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="fade-in-up">
              <div className="hero-subtitle-badge" style={{ backgroundColor: 'var(--brand-petrol)', borderColor: 'rgba(58,134,200,0.15)', color: '#1a4f7c' }}>
                <i className="fa-solid fa-truck-fast"></i>
                <span>Verified Fuel Logistics Lahore</span>
              </div>
              <h2 className="section-title" style={{ fontSize: '1.8rem', marginTop: '10px', marginBottom: '16px' }}>
                Doorstep Diesel &amp; Petrol Delivery in Lahore – 24/7 On-Demand Fuel Service
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                Whether you need high-grade <strong>Euro-V Diesel</strong> for industrial standby generators, commercial fleet logistics, agricultural machinery, or <strong>Super Petrol</strong> and <strong>High-Octane 97</strong> delivered directly to your car doorstep in Lahore, Zyphuel provides certified, seamless, and timely fuel dispatch. Forget waiting in long petrol pump queues or transporting hazardous jerrycans—our specialized bowser fleet delivers calibrated fuel straight to your GPS location with zero short-fueling.
              </p>

              {/* 3 Pillars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', margin: '30px 0' }}>
                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '1.8rem', color: '#0ea5e9', marginBottom: '12px' }}><i className="fa-solid fa-truck-droplet"></i></div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Diesel &amp; Generator Refueling</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Direct on-site diesel delivery for residential backup generators, corporate plazas, hospitals, construction equipment, and heavy commercial trucks across Lahore.
                  </p>
                </div>

                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '1.8rem', color: '#10b981', marginBottom: '12px' }}><i className="fa-solid fa-gauge-high"></i></div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Calibrated Volumetric Billing</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Every tanker nozzle is fitted with digital flow meters calibrated according to international accuracy standards, producing instant printed and digital receipts.
                  </p>
                </div>

                <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: '1.8rem', color: '#6366f1', marginBottom: '12px' }}><i className="fa-solid fa-clock-rotate-left"></i></div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>45-Min Express Dispatch</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Strategic micro-hubs located across DHA Phase 1-9, Gulberg, Johar Town, Bahria Town, Model Town, and Cantonment ensure rapid 24/7 delivery.
                  </p>
                </div>
              </div>

              {/* Ordering FAQs Accordion */}
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>
                  Frequently Asked Questions (FAQ) – Ordering Fuel in Pakistan
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      1. How can I order diesel or petrol online in Lahore?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Simply choose your required fuel grade (Super Petrol, High-Octane 97, or Euro-V Diesel), select your refueling target asset (Car/SUV, Motorbike, Standby Generator, Commercial Machinery, or Storage Drum), set your volume (5L to 15L Max), enter your delivery address in Lahore, and select your delivery speed. Our dispatcher immediately routes the nearest certified bowser to your location.
                    </p>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      2. What is the minimum and maximum quantity for doorstep delivery?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Doorstep consumer delivery is strictly <strong>5 Litres minimum</strong> up to <strong>15 Litres maximum</strong> per order (with a flat nominal delivery fee of Rs. 280, or Rs. 380 for Urgent Priority dispatch within 45 mins). For commercial bulk requirements exceeding 15 Litres (generators, plazas, commercial machinery), our B2B specialized bowsers provide scheduled bulk supply via corporate inquiry.
                    </p>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      3. Is Cash on Delivery (COD) supported?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Yes! Cash on Delivery (COD) is supported for orders between 5 and 10 Litres of fuel. For orders exceeding 10 Litres (11L to 15L Max), advance payment via bank transfer is required for high-volume safety and dispatch verification. For commercial bulk refueling and corporate fleet accounts, we provide bank transfer, online payment, and corporate invoicing terms — <Link to="/contact/" style={{ color: '#0284c7', fontWeight: 600 }}>contact our corporate sales team</Link> or explore our <Link to="/services/#b2b" style={{ color: '#0284c7', fontWeight: 600 }}>commercial services</Link>.
                    </p>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      4. Are Zyphuel fuels tested and OGRA certified?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      100% of Zyphuel fuel supplies are sourced directly from licensed primary oil marketing depots, compliant with official OGRA regulations and Euro-V environmental standards. Our team conducts regular density, flashpoint, and purity checks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Commercial Inquiries & Helpline Banner */}
              <div style={{
                marginTop: '32px',
                padding: '24px 28px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Need Bulk Fuel Supply or Corporate Fleet Refueling?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '600px' }}>
                    Explore our dedicated commercial fueling packages with 50-meter long-reach hoses, consolidated monthly billing, and lab-tested Euro-V diesel.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link to="/services/#b2b" className="btn btn-secondary" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-briefcase"></i> Commercial Services
                  </Link>
                  <Link to="/contact/" className="btn btn-ghost" style={{ padding: '9px 18px', fontSize: '0.88rem', color: '#0284c7', borderColor: 'rgba(2, 132, 199, 0.3)' }}>
                    <i className="fa-solid fa-headset"></i> Contact Support
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Order Tracker Modal */}
      <div
        className={`modal-backdrop${trackerOpen ? ' open' : ''}`}
        id="tracker-modal-backdrop"
        onClick={e => e.target === e.currentTarget && closeTracker()}
      >
        <div className="tracker-modal">
          <div className="tracker-header">
            <div className="success-checkmark-circle">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeOrder?.status === 'delivered' ? 'Delivery Completed!' : 'Order Placed Successfully!'}
            </h3>
            <span className="tracker-order-id" id="tracking-order-id-label">{trackerOrderId}</span>
          </div>
          <div className="tracker-eta-box">
            Status: <span className="tracker-eta-val" id="tracking-eta-timer">
              {activeOrder?.status === 'delivered'
                ? 'Delivered & Calibrated'
                : (activeOrder?.status === 'loading' ? 'Depot Verification & Calibration' : 'Active Dispatch En Route')}
            </span>
            {activeOrder && activeOrder.status !== 'delivered' && countdownText && (
              <span style={{ display: 'block', fontSize: '0.88rem', color: '#0284c7', marginTop: '6px', fontWeight: 700 }}>
                ⏱️ Estimated Arrival: {countdownText} ({activeOrder.deliverySpeed === 'urgent' ? 'Urgent Priority (Within 45 Mins)' : 'Standard Dispatch (Within 45 Mins)'})
              </span>
            )}
          </div>
          <div className="tracker-timeline">
            <div className="tracker-progress-line" id="tracker-progress-bar" style={{ height: `${trackerProgress}%` }}></div>
            {trackerSteps.map((step, i) => (
              <div key={i} className={`tracker-step${step.status ? ' ' + step.status : ''}`} id={`tracker-step-${i + 1}`}>
                <div className="step-node">{i + 1}</div>
                <div className="step-info">
                  <span className="step-title" style={{ display: 'block', marginBottom: '3px' }}>{step.title}</span>
                  <span className="step-desc" style={{ display: 'block', lineHeight: 1.45 }}>{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
          {/* View & Download Invoice Button */}
          {invoiceData && (
            <div style={{ marginTop: '14px', marginBottom: '8px' }}>
              <button
                type="button"
                className="btn"
                id="view-invoice-modal-btn"
                onClick={() => setInvoiceOpen(true)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontSize: '0.98rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fa-solid fa-file-pdf" style={{ fontSize: '1.2rem' }}></i>
                Download Invoice (PDF) / رسید دیکھیں
              </button>
            </div>
          )}

          {generatedWaUrl && (
            <div style={{ marginTop: '6px', marginBottom: '6px' }}>
              <a
                href={generatedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '13px 20px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.3rem' }}></i>
                Open WhatsApp Dispatch Chat
              </a>
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-ghost"
              id="close-tracker-btn"
              style={{ flex: '1 1 140px', fontSize: '0.86rem' }}
              onClick={closeTracker}
            >
              Keep Tracking in Background (بند کریں)
            </button>

            {/* Test Simulation Button: Allows manual testing of Step 3 arrival */}
            {activeOrder && activeOrder.status !== 'delivered' && (
              <button
                type="button"
                className="btn"
                onClick={handleSimulateDelivery}
                title="Test button to simulate delivery arrival"
                style={{
                  flex: '1 1 140px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '8px 12px',
                  borderRadius: '8px'
                }}
              >
                <i className="fa-solid fa-flag-checkered" style={{ marginRight: '6px' }}></i>
                Simulate Arrival (ٹیسٹ: آمد)
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary"
              id="track-order-reset-btn"
              style={{ flex: '1 1 140px', fontSize: '0.86rem' }}
              onClick={() => {
                closeTracker()
                handleTruckClick()
              }}
            >
              Place Additional Order (نیا آرڈر)
            </button>
          </div>
        </div>
      </div>

      {/* Active Order Cooldown Warning Modal (Anti-Spam Time Gap Protection) */}
      {showCooldownModal && activeOrder && (
        <div
          className="modal-backdrop open"
          id="cooldown-modal-backdrop"
          onClick={e => e.target === e.currentTarget && setShowCooldownModal(false)}
        >
          <div className="tracker-modal" style={{ maxWidth: '500px', textAlign: 'center', padding: '28px 22px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(234, 88, 12, 0.12)',
              color: '#ea580c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              margin: '0 auto 14px auto'
            }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Active Fuel Dispatch In Progress!
            </h3>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#0284c7',
              background: 'rgba(2, 132, 199, 0.1)',
              padding: '4px 12px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '14px'
            }}>
              Order #{activeOrder.orderId} &bull; {countdownText ? `ETA: ${countdownText}` : 'En Route'}
            </span>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              A fuel bowser is already en route to: <strong>{activeOrder.address}</strong>.
              To avoid duplicate bowser dispatches and double billing, we maintain a safety time gap between orders.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowCooldownModal(false)
                  handleOpenActiveTracker()
                }}
                style={{ width: '100%', padding: '12px 18px', fontWeight: 700, fontSize: '0.95rem' }}
              >
                <i className="fa-solid fa-location-crosshairs" style={{ marginRight: '8px' }}></i>
                Track Existing Dispatch (موجودہ آرڈر دیکھیں)
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShowCooldownModal(false)
                  proceedOrderSubmission(true)
                }}
                style={{
                  width: '100%',
                  padding: '10px 18px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  background: 'rgba(234, 88, 12, 0.1)',
                  color: '#ea580c',
                  border: '1px solid rgba(234, 88, 12, 0.3)'
                }}
              >
                <i className="fa-solid fa-truck" style={{ marginRight: '6px' }}></i>
                Confirm Additional Tanker (اضافی نیا آرڈر بھیجیں)
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowCooldownModal(false)}
                style={{ width: '100%', marginTop: '4px', fontSize: '0.85rem' }}
              >
                Close &amp; Wait (کینسل کریں)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Order Digital Invoice Modal */}
      {invoiceData && (
        <div
          className={`modal-backdrop invoice-modal-backdrop${invoiceOpen ? ' open' : ''}`}
          id="invoice-modal-backdrop"
          onClick={e => e.target === e.currentTarget && setInvoiceOpen(false)}
        >
          <div className="invoice-modal-dialog">
            {/* Post-Order Dispatch & PDF Download Hero Banner (Shown right after order submission) */}
            {isNewOrderJustPlaced && (
              <div className="post-order-dispatch-banner no-print">
                <div className="post-order-badge">
                  <i className="fa-solid fa-circle-check"></i> Order Placed Successfully! (آرڈر درج کر دیا گیا ہے)
                </div>
                <h3 className="post-order-heading">
                  Order #{invoiceData.orderId} Confirmed &bull; Rs. {invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>

                {/* Prominent Live Dispatch Countdown Indicator */}
                <div className="post-order-countdown-pill">
                  <i className="fa-solid fa-stopwatch fa-spin-pulse"></i>
                  <span>
                    Live Dispatch Countdown: <strong>{countdownText || '45m 00s'}</strong> ({invoiceData.isUrgent ? 'Urgent Priority (Within 45 Mins)' : 'Standard Dispatch (Within 45 Mins)'})
                  </span>
                </div>

                <p className="post-order-sub">
                  Pehle apni official calibrated PDF invoice download karein, phir hamare live WhatsApp dispatch agent se rabta karein.
                </p>

                <div className="post-order-cta-grid">
                  {/* Step 1: Download PDF */}
                  <button
                    type="button"
                    className="btn-order-flow btn-flow-pdf"
                    onClick={() => handleDownloadInvoicePDF(true)}
                    disabled={isGeneratingPdf}
                  >
                    <i className={isGeneratingPdf ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-file-pdf'}></i>
                    <span>{isGeneratingPdf ? 'Generating PDF...' : '1. Download Invoice (PDF)'}</span>
                  </button>

                  {/* Step 2: Proceed to WhatsApp */}
                  <button
                    type="button"
                    className="btn-order-flow btn-flow-wa"
                    onClick={handleOpenWhatsAppNow}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>2. Proceed to WhatsApp Dispatch</span>
                  </button>
                </div>

                {/* Active Redirect Countdown Notice */}
                {waRedirectCountdown !== null && (
                  <div className="wa-redirect-notice">
                    <div className="wa-redirect-content">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      <span>
                        PDF downloaded! Redirecting to WhatsApp Dispatch in <strong>{waRedirectCountdown}s</strong>...
                      </span>
                    </div>
                    <div className="wa-redirect-actions">
                      <button
                        type="button"
                        className="btn-wa-redirect-now"
                        onClick={handleOpenWhatsAppNow}
                      >
                        Open WhatsApp Now <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      <button
                        type="button"
                        className="btn-wa-redirect-cancel"
                        onClick={handleCancelWaRedirect}
                      >
                        Cancel Auto-Redirect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modal Actions Header Bar (No-Print) */}
            <div className="invoice-modal-actions no-print">
              <div className="invoice-action-left">
                <span className="invoice-badge"><i className="fa-solid fa-certificate"></i> Official Calibrated Receipt</span>
              </div>
              <div className="invoice-action-buttons">
                <button
                  type="button"
                  className="btn-invoice-action btn-pdf"
                  onClick={() => handleDownloadInvoicePDF(false)}
                  disabled={isGeneratingPdf}
                  title="Download Official PDF Invoice"
                >
                  <i className={isGeneratingPdf ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-file-pdf'}></i>
                  <span>Download PDF</span>
                </button>
                {generatedWaUrl && (
                  <button
                    type="button"
                    className="btn-invoice-action btn-wa"
                    onClick={handleOpenWhatsAppNow}
                    title="Open Live WhatsApp Dispatch Chat"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </button>
                )}
                <button
                  type="button"
                  className="btn-invoice-action btn-print"
                  onClick={handlePrintInvoice}
                  title="Print or Save as PDF"
                >
                  <i className="fa-solid fa-print"></i>
                  <span>Print</span>
                </button>
                <button
                  type="button"
                  className="btn-invoice-action btn-close"
                  onClick={() => setInvoiceOpen(false)}
                  title="Close Invoice"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            {/* Printable & Viewable Invoice Document (Corporate Executive Tax Invoice) */}
            <div className="invoice-printable" id="printable-order-invoice">
              {/* Top Executive Header Banner */}
              <div className="inv-header-executive">
                <div className="inv-brand-section">
                  <div className="inv-logo-title">
                    <span className="inv-logo-icon"><i className="fa-solid fa-gas-pump"></i></span>
                    <h2 className="inv-title">ZYPHUEL ENERGY LOGISTICS</h2>
                  </div>
                  <div className="inv-gov-badge">
                    GOVERNMENT OF PAKISTAN &bull; OGRA LICENSED PETROLEUM DISTRIBUTOR
                  </div>
                  <div className="inv-creds-strip">
                    <span><strong>OGRA License:</strong> OGRA/DL-7492/LHE</span>
                    <span>&bull;</span>
                    <span><strong>NTN / STRN:</strong> 9482710-3</span>
                    <span>&bull;</span>
                    <span><strong>SECP Inc:</strong> 0248195</span>
                  </div>
                  <p className="inv-address-line">
                    Lahore Central Hub #01 &bull; 75-Main Boulevard, Gulberg III, Lahore, Punjab &bull; Helpline: +92 3230-112464
                  </p>
                </div>

                <div className="inv-doc-meta-section">
                  <div className="inv-doc-title">COMMERCIAL TAX INVOICE</div>
                  <div className="inv-number-pill">#{invoiceData.orderId}</div>
                  <div className="inv-meta-row">
                    <span>Issued Date:</span> <strong>{invoiceData.date}</strong>
                  </div>
                  <div className="inv-status-pill-wrap">
                    <span className="status-confirmed">&#10003; DISPATCH CONFIRMED</span>
                  </div>
                  <div className="inv-meta-row" style={{ marginTop: '5px' }}>
                    <span>Dispatch Mode:</span> <strong>{invoiceData.isUrgent ? 'Urgent Priority (Within 45m)' : 'Standard Dispatch (Within 45m)'}</strong>
                  </div>
                </div>
              </div>

              {/* Billed To & Logistics Telemetry Grid */}
              <div className="inv-parties-grid">
                <div className="inv-party-card">
                  <span className="inv-party-label">BILLED TO / RECIPIENT SITE DETAILS</span>
                  <div className="inv-party-name">{invoiceData.customerName}</div>
                  <div className="inv-party-detail"><i className="fa-solid fa-phone"></i> {invoiceData.phone}</div>
                  {invoiceData.email && invoiceData.email !== 'Not provided' && (
                    <div className="inv-party-detail"><i className="fa-solid fa-envelope"></i> {invoiceData.email}</div>
                  )}
                  {invoiceData.deliveryApplication && (
                    <div className="inv-party-detail" style={{ color: '#0284c7', fontWeight: 600 }}>
                      <i className="fa-solid fa-bullseye"></i> Refueling Target: <strong>{invoiceData.deliveryApplication}{invoiceData.assetIdentifier && invoiceData.assetIdentifier !== 'Standard Direct Fill' ? ` (${invoiceData.assetIdentifier})` : ''}</strong>
                    </div>
                  )}
                  <div className="inv-party-detail"><i className="fa-solid fa-location-dot"></i> {invoiceData.address}</div>
                  <div className="inv-party-detail" style={{ color: '#0284c7', fontSize: '0.72rem', fontWeight: 600 }}>
                    <i className="fa-solid fa-city"></i> Lahore Metropolitan Area, Punjab, Pakistan
                  </div>
                </div>

                <div className="inv-party-card">
                  <span className="inv-party-label">DISPATCH &amp; CALIBRATION TELEMETRY</span>
                  <div className="inv-party-detail">
                    <span>Payment Mode:</span> <strong>{invoiceData.paymentMethod}</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>Dispatch Priority:</span> <strong>{invoiceData.deliverySpeed}</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>Dispenser Metering:</span> <strong>Positive Displacement (0.01L Accuracy)</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>ATC Standard:</span> <strong>15&deg;C Automatic Temperature Compensation</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>Assigned Fleet:</span> <strong>Lahore Hub Bowser #04 (GPS Telemetry Active)</strong>
                  </div>
                </div>
              </div>

              {/* 5-Column Itemized Billing Table */}
              <div className="inv-table-wrapper">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th style={{ width: '8%', textAlign: 'center' }}>SR#</th>
                      <th style={{ width: '44%' }}>Item Description &amp; Fuel Specifications</th>
                      <th style={{ textAlign: 'center', width: '14%' }}>Quantity</th>
                      <th style={{ textAlign: 'right', width: '17%' }}>Unit Rate (PKR)</th>
                      <th style={{ textAlign: 'right', width: '17%' }}>Total (PKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: 'center', fontFamily: 'monospace', color: '#64748b' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td>
                          <div className="inv-item-name">{item.title}</div>
                          <div className="inv-item-spec">{item.detail}</div>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{item.qty}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>{item.rate}</td>
                        <td style={{ textAlign: 'right', fontWeight: 800, fontFamily: 'monospace' }}>
                          Rs. {item.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Amount in Words Callout Banner */}
              <div className="inv-words-banner">
                <span className="words-badge"><i className="fa-solid fa-money-bill-wave"></i> AMOUNT IN WORDS:</span>
                <span className="words-text">{invoiceData.amountInWords || numberToWords(invoiceData.total)}</span>
              </div>

              {/* Summary & Compliance Guarantee */}
              <div className="inv-summary-container">
                <div className="inv-compliance-badge">
                  <div className="inv-stamp-box">
                    <i className="fa-solid fa-shield-halved"></i>
                    <div>
                      <strong>OGRA COMPLIANT &bull; 100% VOLUMETRIC GUARANTEE</strong>
                      <p>
                        All petroleum products supplied strictly under OGRA Euro-V specifications, sourced directly from licensed primary oil marketing depots. Dispensed via positive-displacement digital meters (0.01L calibrated) equipped with anti-tamper optical seals. Zero short-fueling guarantee.
                      </p>
                      <div className="inv-hash-reference">
                        SECURITY HASH: <code>{invoiceData.securityHash || `ZYP-${invoiceData.orderId}-SEC`}</code> &bull; GPS LAHORE HUB #01
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inv-totals-card">
                  <div className="inv-total-line">
                    <span>Subtotal Items</span>
                    <strong>Rs. {invoiceData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="inv-total-line">
                    <span>Digital Flow Meter QA</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>Rs. 0.00 (Free)</span>
                  </div>
                  <div className="inv-total-line">
                    <span>Doorstep Bowser Delivery</span>
                    <strong>
                      {invoiceData.deliveryFee === 0 ? (
                        <span style={{ color: '#10b981' }}>Free</span>
                      ) : (
                        `Rs. ${invoiceData.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      )}
                    </strong>
                  </div>
                  {invoiceData.isUrgent && (
                    <div className="inv-total-line" style={{ color: '#ea580c', fontSize: '0.8rem' }}>
                      <span>Urgent Express Surcharge</span>
                      <span>+Rs. 100.00 (Included)</span>
                    </div>
                  )}
                  <div className="inv-total-line grand-total-line">
                    <span>Total Payable (PKR)</span>
                    <span className="grand-amount">
                      Rs. {invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer Security & Signatory Notice */}
              <div className="inv-footer-note">
                <div className="inv-dual-verify-card">
                  {/* Left: Instant Camera Scannable QR Code */}
                  <div className="inv-verify-subcard inv-qr-card">
                    <div className="inv-barcode-header">
                      <i className="fa-solid fa-qrcode"></i> CAMERA SCAN (QR)
                    </div>
                    <div
                      className="inv-qr-svg-wrap"
                      dangerouslySetInnerHTML={{
                        __html: generateQrSvg(`https://zyphuel.netlify.app/order/?verify=${invoiceData.orderId}`, {
                          size: 88,
                          margin: 2,
                          color: '#000000',
                          background: '#ffffff'
                        })
                      }}
                    />
                    <div className="barcode-caption">
                      Point phone camera
                    </div>
                  </div>

                  {/* Center: Industrial Code 128 Barcode */}
                  <div className="inv-verify-subcard inv-barcode-subcard">
                    <div className="inv-barcode-header">
                      <i className="fa-solid fa-barcode"></i> DISPATCH BARCODE &bull; CODE 128
                    </div>
                    <div
                      className="inv-barcode-svg-wrap"
                      dangerouslySetInnerHTML={{
                        __html: generateBarcodeSvg(invoiceData.orderId, {
                          moduleWidth: 2.2,
                          height: 46,
                          quietZone: 16,
                          color: '#000000',
                          showText: true,
                          fontSize: 11
                        })
                      }}
                    />
                    <div className="barcode-caption">
                      Laser guns & Google Lens
                    </div>
                  </div>
                </div>
                <div className="inv-digital-sign">
                  <div className="inv-cert-badge">
                    ★ ZYPHUEL PAKISTAN &bull; CERTIFIED DISPATCH ★
                  </div>
                  <span className="sign-line">&#10003; Computerized Verified Commercial Invoice</span>
                  <span className="sign-company">Zyphuel Energy Logistics Pakistan (Pvt) Ltd.</span>
                  <span className="sign-depot">Automated Depots Dispatch Gateway &bull; Lahore Hub #01</span>
                  <span className="sign-legal">Valid without physical signature under Electronic Transactions Ordinance 2002</span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions Bar (No-Print) */}
            <div className="invoice-modal-bottom-actions no-print">
              <button
                type="button"
                className="btn-order-flow btn-flow-pdf"
                onClick={() => handleDownloadInvoicePDF(true)}
                disabled={isGeneratingPdf}
              >
                <i className={isGeneratingPdf ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-file-pdf'}></i>
                <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Invoice (PDF)'}</span>
              </button>
              {generatedWaUrl && (
                <button
                  type="button"
                  className="btn-order-flow btn-flow-wa"
                  onClick={handleOpenWhatsAppNow}
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <span>Proceed to WhatsApp Dispatch</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global AI & Search Engine Directory Index */}

      {/* Truck Button Styles + Custom Category Selector styles */}
      <style>{`
        .category-selector-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }
        .category-card {
          background-color: var(--bg-primary, #ffffff);
          border: 2px solid var(--border-color, #e2e8f0);
          border-radius: var(--radius-sm, 12px);
          padding: 18px 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .category-card:hover {
          border-color: var(--text-secondary, #64748b);
        }
        .category-card.active {
          border-color: var(--accent-color, #0ea5e9);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.08);
          background-color: var(--brand-petrol, #f0f9ff);
        }
        .category-header {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          user-select: none;
        }
        .category-checkbox {
          font-size: 1.4rem;
          color: var(--text-secondary, #64748b);
          transition: color 0.2s;
        }
        .category-card.active .category-checkbox {
          color: var(--accent-color, #0ea5e9);
        }
        .category-title-area {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .category-name {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary, #0b1329);
        }
        .category-desc {
          font-size: 0.82rem;
          color: var(--text-secondary, #64748b);
        }
        .category-body {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(226, 232, 240, 0.6);
        }
        .fuel-selector-mini {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .fuel-card-mini {
          background-color: var(--bg-primary, #ffffff);
          border: 2px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 12px 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .fuel-card-mini:hover {
          border-color: var(--text-secondary, #64748b);
        }
        .fuel-card-mini.active {
          background-color: var(--accent-color, #0ea5e9);
          border-color: var(--accent-color, #0ea5e9);
          color: #ffffff;
          box-shadow: 0 4px 8px rgba(14, 165, 233, 0.25);
        }
        .fuel-card-mini.active .fuel-name-mini {
          color: #ffffff;
        }
        .fuel-card-mini.active .fuel-price-mini {
          color: rgba(255, 255, 255, 0.9);
        }
        .fuel-name-mini {
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--text-primary, #0b1329);
        }
        .fuel-price-mini {
          font-size: 0.78rem;
          color: var(--text-secondary, #64748b);
          margin-top: 2px;
        }
        .info-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .info-badge.success {
          background-color: #d1fae5;
          color: #065f46;
        }
        .quantity-config-card {
          background-color: var(--bg-primary, #ffffff);
          border: 2px solid var(--border-color, #e2e8f0);
          border-radius: var(--radius-sm, 12px);
          padding: 20px;
          box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05));
        }
        .quantity-config-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1.5px solid rgba(226, 232, 240, 0.6);
          padding-bottom: 10px;
        }
        .config-title {
          font-weight: 800;
          font-size: 1rem;
          color: var(--text-primary, #0b1329);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .config-unit {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-color, #0ea5e9);
          text-transform: uppercase;
          background-color: rgba(14, 165, 233, 0.08);
          padding: 4px 10px;
          border-radius: 6px;
        }
        .icon-spacing {
          margin-right: 6px;
        }
        .animated {
          animation-duration: 0.35s;
          animation-fill-mode: both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fadeIn {
          animation-name: fadeIn;
        }

        .truck-button {
          --color: #fff; --background: #2B3044; --tick: #16BF78; --base: #0D0F18;
          --wheel: #2B3044; --wheel-inner: #646B8C; --wheel-dot: #fff;
          --back: #6D58FF; --back-inner: #362A89; --back-inner-shadow: #2D246B;
          --front: #A6ACCD; --front-shadow: #535A79; --front-light: #FFF8B1;
          --window: #2B3044; --window-shadow: #404660; --street: #646B8C;
          --street-fill: #404660; --box: #DCB97A; --box-shadow: #B89B66;
          padding: 12px 0; width: 100%; max-width: 360px; cursor: pointer;
          text-align: center; position: relative; border: none; outline: none;
          color: var(--color); background: var(--background);
          border-radius: var(--br, 15px); -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent; transform-style: preserve-3d;
          transform: rotateX(var(--rx, 0deg)) translateZ(0);
          transition: transform .5s, border-radius .3s linear var(--br-d, 0s);
          font-family: 'Inter', sans-serif; margin: 0 auto; display: inline-block;
          height: 54px; line-height: 30px; font-size: 1.05rem;
        }
        .truck-button:before, .truck-button:after {
          content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 6px;
          display: block; background: var(--b, var(--street));
          transform-origin: 0 100%; transform: rotateX(90deg) scaleX(var(--sy, 1));
          border-radius: 0 0 8px 8px;
        }
        .truck-button:after { --sy: var(--progress, 0); --b: var(--street-fill); }
        .truck-button .default, .truck-button .success { display: block; font-weight: 600; font-size: 16px; line-height: 28px; opacity: var(--o, 1); transition: opacity .3s; }
        .truck-button .success { --o: 0; position: absolute; top: 12px; left: 0; right: 0; }
        .truck-button .success svg { width: 12px; height: 10px; display: inline-block; vertical-align: top; fill: none; margin: 7px 0 0 12px; stroke: var(--tick); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 16px; stroke-dashoffset: var(--offset, 16px); transition: stroke-dashoffset .4s ease .45s; }
        .truck-button .truck { position: absolute; width: 72px; height: 28px; transform: rotateX(90deg) translate3d(var(--truck-x, 4px), calc(var(--truck-y-n, -26) * 1px), 12px); }
        .truck-button .truck:before, .truck-button .truck:after { content: ''; position: absolute; bottom: -6px; left: var(--l, 18px); width: 10px; height: 10px; border-radius: 50%; z-index: 2; box-shadow: inset 0 0 0 2px var(--wheel), inset 0 0 0 4px var(--wheel-inner); background: var(--wheel-dot); transform: translateY(calc(var(--truck-y) * -1px)) translateZ(0); }
        .truck-button .truck:after { --l: 54px; }
        .truck-button .truck .wheel, .truck-button .truck .wheel:before { position: absolute; bottom: var(--b, -6px); left: var(--l, 6px); width: 10px; height: 10px; border-radius: 50%; background: var(--wheel); transform: translateZ(0); }
        .truck-button .truck .wheel { transform: translateY(calc(var(--truck-y) * -1px)) translateZ(0); }
        .truck-button .truck .wheel:before { --l: 35px; --b: 0; content: ''; }
        .truck-button .truck .front, .truck-button .truck .back, .truck-button .truck .box { position: absolute; }
        .truck-button .truck .back { left: 0; bottom: 0; z-index: 1; width: 47px; height: 28px; border-radius: 1px 1px 0 0; background: linear-gradient(68deg, var(--back-inner) 0%, var(--back-inner) 22%, var(--back-inner-shadow) 22.1%, var(--back-inner-shadow) 100%); }
        .truck-button .truck .back:before, .truck-button .truck .back:after { content: ''; position: absolute; }
        .truck-button .truck .back:before { left: 11px; top: 0; right: 0; bottom: 0; z-index: 2; border-radius: 0 1px 0 0; background: var(--back); }
        .truck-button .truck .back:after { border-radius: 1px; width: 73px; height: 2px; left: -1px; bottom: -2px; background: var(--base); }
        .truck-button .truck .front { left: 47px; bottom: -1px; height: 22px; width: 24px; clip-path: polygon(55% 0, 72% 44%, 100% 58%, 100% 100%, 0 100%, 0 0); background: linear-gradient(84deg, var(--front-shadow) 0%, var(--front-shadow) 10%, var(--front) 12%, var(--front) 100%); }
        .truck-button .truck .front:before, .truck-button .truck .front:after { content: ''; position: absolute; }
        .truck-button .truck .front:before { width: 7px; height: 8px; left: 7px; top: 2px; clip-path: polygon(0 0, 60% 0%, 100% 100%, 0% 100%); background: linear-gradient(59deg, var(--window) 0%, var(--window) 57%, var(--window-shadow) 55%, var(--window-shadow) 100%); }
        .truck-button .truck .front:after { width: 3px; height: 2px; right: 0; bottom: 3px; background: var(--front-light); }
        .truck-button .truck .box { width: 13px; height: 13px; right: 56px; bottom: 0; z-index: 1; border-radius: 1px; overflow: hidden; transform: translate(calc(var(--box-x, -24) * 1px), calc(var(--box-y, -6) * 1px)) scale(var(--box-s, .5)); opacity: var(--box-o, 0); background: linear-gradient(68deg, var(--box) 0%, var(--box) 50%, var(--box-shadow) 50.2%, var(--box-shadow) 100%); background-size: 250% 100%; background-position-x: calc(var(--bx, 0) * 1%); }
        .truck-button .truck .box:before { content: ''; position: absolute; background: rgba(255,255,255,.2); left: 0; right: 0; top: 6px; height: 1px; }
        .truck-button .truck .box:after { content: width: 6px; left: 100%; top: 0; bottom: 0; background: var(--back); transform: translateX(calc(var(--hx, 0) * 1px)); }
        .truck-button.animation { --rx: -90deg; --br: 0; }
        .truck-button.animation .default { --o: 0; }
        .truck-button.animation.done { --rx: 0deg; --br: 15px; --br-d: .2s; }
        .truck-button.animation.done .success { --o: 1; --offset: 0; }
        .button-wrapper { display: flex; justify-content: center; width: 100%; margin-top: 8px; }

        /* Official Order Invoice Modal Styles */
        .invoice-modal-backdrop {
          z-index: 1200;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          overflow-y: auto;
          padding: 24px 12px;
          display: none;
        }
        .invoice-modal-backdrop.open {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .invoice-modal-dialog {
          background: #ffffff;
          border-radius: 16px;
          max-width: 720px;
          width: 100%;
          margin: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
          overflow-y: auto;
          max-height: 92vh;
          animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalScaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Post-Order Dispatch & PDF Download Hero Banner */
        .post-order-dispatch-banner {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          padding: 22px 24px;
          border-bottom: 2px solid #0284c7;
          position: relative;
        }
        .post-order-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .post-order-heading {
          font-size: 1.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }
        .post-order-sub {
          font-size: 0.86rem;
          color: #94a3b8;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }
        .post-order-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .post-order-cta-grid {
            grid-template-columns: 1fr;
          }
        }
        .btn-order-flow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          border: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }
        .btn-flow-pdf {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
        }
        .btn-flow-pdf:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
          background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
        }
        .btn-flow-pdf:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn-flow-wa {
          background: linear-gradient(135deg, #25D366 0%, #1ea952 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
        }
        .btn-flow-wa:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
          background: linear-gradient(135deg, #1ea952 0%, #15803d 100%);
        }
        .wa-redirect-notice {
          margin-top: 14px;
          background: rgba(37, 211, 102, 0.12);
          border: 1px solid rgba(37, 211, 102, 0.35);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .wa-redirect-content {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #a7f3d0;
          font-weight: 600;
        }
        .wa-redirect-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-wa-redirect-now {
          background: #25D366;
          color: #0f172a;
          border: none;
          font-weight: 800;
          font-size: 0.78rem;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-wa-redirect-cancel {
          background: transparent;
          color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
          font-size: 0.76rem;
          padding: 5px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-wa-redirect-cancel:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .invoice-modal-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0f172a;
          color: #ffffff;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 10px;
        }
        .invoice-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .invoice-action-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-invoice-action {
          padding: 7px 14px;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          border: none;
        }
        .btn-invoice-action.btn-pdf {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);
        }
        .btn-invoice-action.btn-pdf:hover:not(:disabled) {
          background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
        }
        .btn-invoice-action.btn-wa {
          background: #25D366;
          color: #ffffff;
        }
        .btn-invoice-action.btn-wa:hover {
          background: #1ea952;
        }
        .btn-invoice-action.btn-print {
          background: rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
        }
        .btn-invoice-action.btn-print:hover {
          background: rgba(255, 255, 255, 0.22);
        }
        .btn-invoice-action.btn-close {
          background: transparent;
          color: #94a3b8;
          font-size: 1.15rem;
          padding: 6px 10px;
        }
        .btn-invoice-action.btn-close:hover {
          color: #ffffff;
        }

        .invoice-modal-bottom-actions {
          background: #0f172a;
          padding: 16px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .invoice-modal-bottom-actions {
            grid-template-columns: 1fr;
          }
        }

        /* Post-Order Dispatch Hero Banner */
        .post-order-countdown-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(2, 132, 199, 0.12);
          border: 1.5px solid rgba(2, 132, 199, 0.35);
          color: #0284c7;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 24px;
          margin-bottom: 12px;
        }
        .post-order-countdown-pill strong {
          color: #0f172a;
          font-size: 0.95rem;
          font-family: monospace;
          background: #ffffff;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(2, 132, 199, 0.25);
        }

        /* Printable Invoice Container */
        .invoice-printable {
          padding: 30px 32px;
          background: #ffffff;
          color: #0f172a;
        }
        .inv-header-executive {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0284c7;
          padding-bottom: 18px;
          margin-bottom: 20px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .inv-brand-section {
          flex: 1;
          min-width: 280px;
        }
        .inv-gov-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-top: 4px;
        }
        .inv-creds-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          font-size: 0.72rem;
          color: #475569;
          margin-top: 6px;
          background: #f1f5f9;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          display: inline-flex;
        }
        .inv-doc-meta-section {
          text-align: right;
          min-width: 180px;
        }
        .inv-doc-title {
          font-size: 0.72rem;
          font-weight: 900;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .inv-status-pill-wrap {
          margin-top: 6px;
        }
        .inv-logo-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .inv-logo-icon {
          width: 30px;
          height: 30px;
          background: #0284c7;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        .inv-title {
          margin: 0;
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: 0.04em;
        }
        .inv-subtitle {
          margin: 3px 0 0 0;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0284c7;
        }
        .inv-address-line, .inv-contact-line {
          margin: 6px 0 0 0;
          font-size: 0.75rem;
          color: #64748b;
        }
        .inv-number-pill {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0284c7;
          font-family: monospace;
          margin: 3px 0;
        }
        .inv-meta-row {
          font-size: 0.76rem;
          color: #64748b;
          margin-top: 3px;
        }
        .inv-meta-row strong {
          color: #0f172a;
        }
        .status-confirmed {
          color: #10b981 !important;
          background: #ecfdf5;
          padding: 3px 10px;
          border-radius: 6px;
          display: inline-block;
          font-weight: 800;
          font-size: 0.76rem;
          border: 1px solid #a7f3d0;
        }
        .inv-parties-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 22px;
        }
        .inv-party-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
        }
        .inv-party-label {
          font-size: 0.67rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 5px;
        }
        .inv-party-name {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
        }
        .inv-party-detail {
          font-size: 0.76rem;
          color: #475569;
          margin-top: 3px;
          line-height: 1.45;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .inv-party-detail i {
          color: #0284c7;
          width: 14px;
        }
        .inv-table-wrapper {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .inv-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
        }
        .inv-table th {
          background: #f1f5f9;
          padding: 10px 14px;
          font-weight: 700;
          color: #334155;
          border-bottom: 1px solid #cbd5e1;
        }
        .inv-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #e2e8f0;
          color: #1e293b;
        }
        .inv-table tr:last-child td {
          border-bottom: none;
        }
        .inv-item-name {
          font-weight: 700;
          color: #0f172a;
        }
        .inv-item-spec {
          font-size: 0.72rem;
          color: #64748b;
          margin-top: 2px;
        }
        .inv-words-banner {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .words-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: #15803d;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .words-text {
          font-size: 0.82rem;
          font-weight: 700;
          color: #166534;
          font-style: italic;
        }
        .inv-summary-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .inv-compliance-badge {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 12px 14px;
        }
        .inv-stamp-box {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .inv-stamp-box i {
          font-size: 1.3rem;
          color: #16a34a;
          margin-top: 2px;
        }
        .inv-stamp-box strong {
          font-size: 0.76rem;
          color: #15803d;
          display: block;
          margin-bottom: 3px;
        }
        .inv-stamp-box p {
          margin: 0;
          font-size: 0.7rem;
          color: #166534;
          line-height: 1.4;
        }
        .inv-hash-reference {
          margin-top: 8px;
          font-size: 0.68rem;
          color: #64748b;
          font-family: monospace;
          background: rgba(255, 255, 255, 0.7);
          padding: 3px 8px;
          border-radius: 4px;
          display: inline-block;
        }
        .inv-totals-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
        }
        .inv-total-line {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 0.78rem;
          color: #475569;
        }
        .inv-total-line.grand-total-line {
          border-top: 2px solid #0284c7;
          margin-top: 6px;
          padding-top: 8px;
          font-size: 1rem;
          font-weight: 900;
          color: #0284c7;
        }
        .grand-amount {
          font-size: 1.1rem;
          color: #0284c7;
        }
        .inv-footer-note {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px dashed #cbd5e1;
          font-size: 0.7rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 14px;
        }
        .order-verified-banner {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
          color: #ffffff;
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 24px;
          box-shadow: 0 6px 22px rgba(6, 78, 59, 0.25);
          border: 1px solid #10b981;
          animation: fadeIn 0.3s ease;
        }
        .verified-banner-inner {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .verified-banner-icon {
          font-size: 1.8rem;
          color: #34d399;
          flex-shrink: 0;
        }
        .verified-banner-text {
          flex: 1;
        }
        .verified-banner-title {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #ecfdf5;
        }
        .verified-banner-desc {
          font-size: 0.78rem;
          color: #a7f3d0;
          margin-top: 3px;
          line-height: 1.4;
        }
        .verified-banner-close {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #ffffff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .verified-banner-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .inv-dual-verify-card {
          display: flex;
          align-items: stretch;
          gap: 10px;
          flex-wrap: wrap;
        }
        .inv-verify-subcard {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .inv-qr-card {
          width: 108px;
        }
        .inv-barcode-subcard {
          min-width: 220px;
          max-width: 270px;
          flex: 1;
        }
        .inv-barcode-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 220px;
          max-width: 280px;
        }
        .inv-barcode-header {
          font-size: 0.62rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .inv-qr-svg-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #ffffff;
          padding: 3px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          width: 88px;
          height: 88px;
        }
        .inv-qr-svg-wrap svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .inv-barcode-svg-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          background: #ffffff;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
        }
        .inv-barcode-svg-wrap svg {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .barcode-caption {
          font-size: 0.58rem;
          color: #64748b;
          margin-top: 4px;
          letter-spacing: 0.01em;
        }
        .inv-digital-sign {
          text-align: right;
          max-width: 320px;
        }
        .inv-cert-badge {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 4px;
          padding: 3px 8px;
          font-size: 0.65rem;
          font-weight: 800;
          color: #166534;
          margin-bottom: 5px;
          display: inline-block;
        }
        .sign-line {
          display: block;
          font-weight: 700;
          color: #0f172a;
        }
        .sign-company {
          font-size: 0.66rem;
          color: #64748b;
        }
        .sign-depot {
          display: block;
          font-size: 0.6rem;
          color: #64748b;
          margin-top: 2px;
        }
        .sign-legal {
          display: block;
          font-size: 0.58rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        /* Print Media Styles for PDF Export */
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-order-invoice, #printable-order-invoice * {
            visibility: visible;
          }
          #printable-order-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .inv-table th {
            background: #e2e8f0 !important;
            color: #000000 !important;
          }
        }

        @media (max-width: 600px) {
          .inv-parties-grid, .inv-summary-container {
            grid-template-columns: 1fr;
          }
          .invoice-printable {
            padding: 18px 14px;
          }
        }
      `}</style>
    </div>
  )
}
