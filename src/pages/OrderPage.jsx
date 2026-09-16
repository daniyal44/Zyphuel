import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { useSEO } from '../hooks/useSEO'
import { useFuelPrices } from '../context/FuelPriceContext'
import { FUEL_PRICES } from '../data/fuelPrices'
import RefuelingLifecycleTracker from '../components/RefuelingLifecycleTracker'

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

export default function OrderPage() {
  useSEO({
    title: 'Order Petrol & Diesel Online in Lahore | Zyphuel',
    description: 'Order diesel, petrol, LPG gas cylinders, and water delivery online with Zyphuel in Lahore. Express 45-minute doorstep dispatch with digital calibration meter.',
    keywords: [
      'order diesel Lahore', 'order petrol Lahore', 'diesel delivery Lahore', 'petrol delivery Lahore',
      'generator diesel order', 'order fuel online Pakistan', 'LPG gas cylinder order Lahore',
      'water refill delivery Lahore', 'fuel cash on delivery Lahore', 'Zyphuel order'
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
            "description": "On-demand doorstep fuel and utility delivery in Lahore with certified digital flow-meter calibration. Super petrol, diesel, LPG cylinders, and water refills.",
            "image": "https://zyphuel.netlify.app/images/tank.png",
            "brand": {
              "@type": "Brand",
              "name": "Zyphuel"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "PKR",
              "lowPrice": "100.00",
              "highPrice": "448.00",
              "offerCount": "5"
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
                "text": "Choose your required fuel category (Diesel, Petrol, High-Octane, LPG Cylinder, or Water Refill) on this order page, set your quantity, enter your delivery address in Lahore, and select your delivery speed. Our dispatcher routes the nearest certified bowser to your location."
              }
            },
            {
              "@type": "Question",
              "name": "What is the minimum quantity for doorstep diesel delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can order as little as 5 liters up to 2,000+ liters per order. Bulk orders of 50+ liters receive free delivery in covered zones in Lahore."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for domestic orders (up to 10 liters of fuel, 10 kg LPG, or 20 gallons of water). Bank transfers and corporate invoicing are available for commercial clients."
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
  const [deliveryPhase, setDeliveryPhase] = useState('idle') // 'idle', 'loading', 'transit', 'delivered'
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

  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [deliverySpeed, setDeliverySpeed] = useState('simple') // 'simple' or 'urgent'
  
  const { prices: livePrices, isLive, effectiveDate } = useFuelPrices()
  const [prices, setPrices] = useState({ ...livePrices })

  useEffect(() => {
    setPrices(livePrices)
  }, [livePrices])

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

  // Official Digital Invoice Modal
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)

  // Computed summary
  const fuelRate = prices[selectedFuelType]
  const fuelCost = orderFuel ? (fuelRate * fuelQty) : 0
  const gasRate = prices.lpg
  const gasCost = orderGas ? (gasRate * gasQty) : 0
  const waterRate = prices.water // Flat Rs. 100.00 per Gallon
  const waterCost = orderWater ? (waterRate * waterQty) : 0

  const baseCost = fuelCost + gasCost + waterCost

  // Delivery Charges:
  // Standard Delivery: Free for bulk fuel (>=50L), or Rs. 250 for small fuel orders (<50L)
  // Urgent Delivery: Adds Rs. 100 express priority dispatch fee (controlled, reasonable fee)
  const standardFee = (orderFuel && fuelQty < 50) ? 250 : 0
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
      
      if (parsed.orderFuel !== undefined) {
        setOrderFuel(parsed.orderFuel)
      } else if (parsed.fuelType) {
        if (parsed.fuelType === 'lpg') {
          setOrderFuel(false)
          setOrderGas(true)
          setGasQty(Number(parsed.quantity) || 5)
        } else if (parsed.fuelType === 'water') {
          setOrderFuel(false)
          setOrderWater(true)
          setWaterQty(Number(parsed.quantity) || 10)
        } else {
          setOrderFuel(true)
          setSelectedFuelType(parsed.fuelType)
          setFuelQty(Math.min(15, Math.max(5, Number(parsed.quantity) || 5)))
        }
      }

      if (parsed.selectedFuelType) setSelectedFuelType(parsed.selectedFuelType)
      if (parsed.fuelQty) setFuelQty(Math.min(15, Math.max(5, Number(parsed.fuelQty) || 5)))
      if (parsed.orderGas !== undefined) setOrderGas(parsed.orderGas)
      if (parsed.gasQty) setGasQty(Number(parsed.gasQty) || 5)
      if (parsed.orderWater !== undefined) setOrderWater(parsed.orderWater)
      if (parsed.waterQty) setWaterQty(Number(parsed.waterQty) || 10)
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
        const totalDurationSeconds = (order.durationMinutes || (order.deliverySpeed === 'urgent' ? 18 : 35)) * 60
        const remaining = totalDurationSeconds - elapsedSeconds

        if (order.status !== 'delivered' && remaining > 0) {
          setActiveOrder(order)
          setRemainingEtaSeconds(remaining)
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
      const totalDurationSeconds = (activeOrder.durationMinutes || (activeOrder.deliverySpeed === 'urgent' ? 18 : 35)) * 60
      const remaining = Math.max(0, totalDurationSeconds - elapsedSeconds)
      setRemainingEtaSeconds(remaining)

      const mins = Math.floor(remaining / 60)
      const secs = remaining % 60
      const formattedEta = mins > 0 ? `${mins}m ${secs < 10 ? '0' : ''}${secs}s` : `${secs}s`
      setCountdownText(formattedEta)

      if (remaining > 0) {
        setTrackerEta(`~${mins + 1} Mins Remaining (${activeOrder.deliverySpeed === 'urgent' ? 'Urgent 10-20 Min' : 'Standard 20-45 Min'})`)
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
    
    const durationMinutes = deliverySpeed === 'urgent' ? 18 : 35
    setTrackerEta(deliverySpeed === 'urgent' ? '15 Mins (Urgent Express)' : '35 Mins (Standard Dispatch)')

    const itemsList = []
    if (orderFuel) itemsList.push(`${fuelQty}L of ${FUEL_DISPLAY[selectedFuelType]} (@ Rs. ${fuelRate.toFixed(2)}/L = Rs. ${fuelCost.toLocaleString()})`)
    if (orderGas) itemsList.push(`${gasQty}Kg of LPG Gas (@ Rs. ${gasRate.toFixed(2)}/Kg = Rs. ${gasCost.toLocaleString()})`)
    if (orderWater) itemsList.push(`${waterQty} Gallons of Water (@ Rs. ${waterRate.toFixed(2)}/Gal = Rs. ${waterCost.toLocaleString()})`)
    const itemsDesc = itemsList.join(' + ')

    let dispatchTitle = 'Delivery Dispatched'
    if (orderFuel && !orderGas && !orderWater) dispatchTitle = `${FUEL_DISPLAY[selectedFuelType]} Dispatched`
    else if (!orderFuel && orderGas && !orderWater) dispatchTitle = 'LPG Dispatched'
    else if (!orderFuel && !orderGas && orderWater) dispatchTitle = 'Water Dispatched'

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
        desc: `Vehicle is preparing to carry ${itemsDesc} to ${address || 'your address'}. Speed: ${deliverySpeed === 'urgent' ? 'Urgent Express (10-20 Mins)' : 'Simple Standard (20-45 Mins)'}.` 
      },
      { 
        status: '', 
        title: 'Delivered & Calibrated', 
        desc: `Awaiting arrival at destination. 0.01L calibrated meter refueling and tamper-proof printed receipt.` 
      },
    ])
    setTrackerProgress(20)
    setTrackerOpen(true)
    setDeliveryPhase('loading')

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

    const inv = {
      orderId: id,
      date: formattedDate,
      customerName: orderName || name || 'Valued Customer',
      phone: phone || 'Not provided',
      email: email || 'Not provided',
      address: address || 'Lahore, Pakistan',
      deliverySpeed: deliverySpeed === 'urgent' ? '⚡ Urgent Priority Dispatch (10–20 Mins)' : 'Standard Dispatch (20–45 Mins)',
      paymentMethod: isCodEligible ? 'Cash on Delivery (COD)' : 'Advance Direct Bank Transfer',
      isUrgent: deliverySpeed === 'urgent',
      items: [
        orderFuel ? {
          title: `Euro-V ${FUEL_DISPLAY[selectedFuelType]}`,
          detail: '0.01L Calibrated Digital Flow-Meter Refueling',
          qty: `${fuelQty} Litres`,
          rate: `Rs. ${fuelRate.toFixed(2)}/L`,
          cost: fuelCost
        } : null,
        orderGas ? {
          title: 'LPG Gas Cylinder Refill',
          detail: 'Commercial & Domestic Grade Safe Bottling',
          qty: `${gasQty} Kg`,
          rate: `Rs. ${gasRate.toFixed(2)}/Kg`,
          cost: gasCost
        } : null,
        orderWater ? {
          title: 'Bulk Clean Water Supply',
          detail: 'Potable Multi-Stage Filtered Safe Water',
          qty: `${waterQty} Gallons`,
          rate: `Rs. ${waterRate.toFixed(2)}/Gal`,
          cost: waterCost
        } : null,
      ].filter(Boolean),
      subtotal: baseCost,
      deliveryFee: deliveryFee,
      total: total,
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
      notes ? `📝 *Special Instructions:* ${notes}` : null,
      `🚀 *Dispatch Speed:* ${deliverySpeed === 'urgent' ? '⚡ Urgent Priority Dispatch (10-20 mins) [+Rs. 100]' : 'Standard Dispatch (20-45 mins)'}`,
      `💳 *Payment Method:* ${isCodEligible ? 'Cash on Delivery (COD)' : 'Bank Transfer / Advance'}`,
      ``,
      `📦 *Items Ordered:*`,
      ...itemsList.map(item => `  • ${item}`),
      ``,
      `💵 *Subtotal:* Rs. ${baseCost.toLocaleString()}`,
      `🚚 *Delivery Charges:* ${deliveryFee > 0 ? `Rs. ${deliveryFee}${deliverySpeed === 'urgent' ? ' (incl. Rs. 100 Urgent Surcharge)' : ''}` : 'FREE (Standard 50L+ Offer)'}`,
      `💰 *TOTAL BILL:* Rs. ${total.toLocaleString()}`,
      `--------------------------------`,
      `📍 *Central Dispatch:* Lahore Hub #01, Pakistan`,
      `Please confirm fleet dispatch for my order.`
    ].filter(line => line !== null).join('\n')

    const waUrl = `https://wa.me/923230112464?text=${encodeURIComponent(waLines)}`
    setGeneratedWaUrl(waUrl)

    try {
      window.open(waUrl, '_blank')
    } catch (err) {
      console.warn('Could not auto-open WhatsApp:', err)
    }

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
      orderFuel,
      orderGas,
      gasQty,
      orderWater,
      waterQty,
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
        desc: `Bowser #04 carrying ${activeOrder.itemsSummary || 'fuel'} to ${activeOrder.address}. Speed: ${activeOrder.deliverySpeed === 'urgent' ? 'Urgent Express (10-20 Mins)' : 'Standard (20-45 Mins)'}.`
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
      orderFuel,
      selectedFuelType, 
      fuelQty, 
      orderGas,
      gasQty,
      orderWater,
      waterQty,
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

  // Invoice Print / PDF Export
  const handlePrintInvoice = () => {
    window.print()
  }

  // Invoice Standalone HTML File Download
  const handleDownloadInvoiceHTML = () => {
    if (!invoiceData) return
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Zyphuel Official Invoice #${invoiceData.orderId}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; padding: 24px; margin: 0; }
    .inv-card { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0284c7; padding-bottom: 16px; margin-bottom: 20px; }
    .brand { font-size: 24px; font-weight: 900; color: #0284c7; margin: 0; letter-spacing: 0.04em; }
    .sub { font-size: 12px; color: #64748b; margin: 2px 0 0 0; }
    .meta { text-align: right; }
    .id { font-size: 16px; font-weight: 800; color: #0f172a; font-family: monospace; }
    .date { font-size: 12px; color: #64748b; margin-top: 3px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; font-size: 12px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
    .box-title { font-weight: 800; color: #64748b; font-size: 10px; text-transform: uppercase; margin-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
    th { background: #f1f5f9; padding: 9px 12px; text-align: left; color: #334155; border-bottom: 1px solid #cbd5e1; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .right { text-align: right; }
    .totals { width: 260px; margin-left: auto; font-size: 12px; margin-bottom: 20px; }
    .t-row { display: flex; justify-content: space-between; padding: 4px 0; color: #475569; }
    .grand { border-top: 2px solid #0284c7; margin-top: 6px; padding-top: 8px; font-size: 15px; font-weight: 900; color: #0284c7; }
    .guarantee { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; font-size: 11px; color: #166534; line-height: 1.45; }
    .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #94a3b8; }
    @media print { body { background: #fff; padding: 0; } .inv-card { border: none; box-shadow: none; padding: 0; } }
  </style>
</head>
<body>
  <div class="inv-card">
    <div class="header">
      <div>
        <h1 class="brand">ZYPHUEL</h1>
        <p class="sub">Certified On-Demand Energy &amp; Doorstep Fuel Logistics</p>
        <p class="sub">Lahore Hub #01 &bull; Gulberg III, Lahore &bull; Helpline: +92 3230-112464</p>
      </div>
      <div class="meta">
        <div class="id">INVOICE #${invoiceData.orderId}</div>
        <div class="date">${invoiceData.date}</div>
        <div style="margin-top:4px; font-size:11px; color:#10b981; font-weight:700;">&#10003; DISPATCH CONFIRMED</div>
      </div>
    </div>
    <div class="grid">
      <div class="box">
        <div class="box-title">Billed To / Delivery Site</div>
        <div><strong>${invoiceData.customerName}</strong></div>
        <div>Phone: ${invoiceData.phone}</div>
        <div>Email: ${invoiceData.email}</div>
        <div>Address: ${invoiceData.address}</div>
      </div>
      <div class="box">
        <div class="box-title">Dispatch &amp; Payment Telemetry</div>
        <div>Speed: <strong>${invoiceData.deliverySpeed}</strong></div>
        <div>Payment: <strong>${invoiceData.paymentMethod}</strong></div>
        <div>Calibration: <strong>0.01L Accuracy (Positive Displacement)</strong></div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Category &amp; Item</th>
          <th style="text-align:center;">Qty</th>
          <th class="right">Unit Rate</th>
          <th class="right">Total (PKR)</th>
        </tr>
      </thead>
      <tbody>
        ${invoiceData.items.map(item => `
          <tr>
            <td><strong>${item.title}</strong><br><span style="font-size:10px; color:#64748b;">${item.detail}</span></td>
            <td style="text-align:center; font-weight:700;">${item.qty}</td>
            <td class="right">${item.rate}</td>
            <td class="right" style="font-weight:700;">Rs. ${item.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="totals">
      <div class="t-row"><span>Subtotal Items</span><strong>Rs. ${invoiceData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></div>
      <div class="t-row"><span>Delivery Charges</span><strong>${invoiceData.deliveryFee === 0 ? 'FREE (50L+ Offer)' : `Rs. ${invoiceData.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}</strong></div>
      ${invoiceData.isUrgent ? '<div class="t-row" style="color:#ea580c; font-size:11px;"><span>Urgent Priority Surcharge</span><span>Included (+Rs. 100)</span></div>' : ''}
      <div class="t-row grand"><span>Total Estimated</span><span>Rs. ${invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></div>
    </div>
    <div class="guarantee">
      <strong>&#10003; 100% Volumetric &amp; Quality Guarantee:</strong> All fuels sourced from licensed primary oil marketing depots. Calibrated digital flow meters prevent short-fueling. OGRA Euro-V compliant.
    </div>
    <div class="footer">Official Computerized Invoice &bull; Zyphuel Refueling Systems Pakistan</div>
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
                  <span className="price-up">Live <i className="fa-solid fa-caret-up"></i></span>
                </div>
                <div className="ticker-item">
                  <span className="ticker-bullet"></span>
                  Water Refill: <strong>Rs. {prices.water.toFixed(2)}</strong>/Gal
                  <span className="price-up">Live <i className="fa-solid fa-caret-up"></i></span>
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
              <p className="section-subtitle">Select fuel, LPG Gas, or Water. Calculate rates in real time, customize quantities, and track your delivery.</p>
              
              {/* Live OGRA Market Rates Indicator */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.22)',
                borderRadius: '30px',
                padding: '6px 14px',
                marginTop: '12px',
                fontSize: '0.84rem',
                color: 'var(--brand-primary, #0284c7)',
                fontWeight: 600,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}></span>
                <span>Live Market Rates Active:</span>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>
                  Petrol Rs. {prices.petrol.toFixed(2)}/L &bull; Diesel Rs. {prices.diesel.toFixed(2)}/L &bull; High-Octane Rs. {prices.highOctane.toFixed(2)}/L
                </span>
                {effectiveDate && (
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 500 }}>
                    (OGRA Notified: {effectiveDate})
                  </span>
                )}
              </div>
            </div>

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
                      { num: '01', label: 'Select Items', active: Boolean(orderFuel || orderGas || orderWater), icon: 'fa-cart-shopping' },
                      { num: '02', label: 'Quantities', active: Boolean(fuelQty > 0 || gasQty > 0 || waterQty > 0), icon: 'fa-sliders' },
                      { num: '03', label: 'Delivery Details', active: Boolean(address.trim().length > 3), icon: 'fa-location-dot' },
                      { num: '04', label: 'Review & Order', active: Boolean(name && phone), icon: 'fa-truck-fast' }
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
                        {i < 3 && (
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

                  {/* 1. Select Items (Category Toggles) */}
                  <div className="form-block-title">
                    <i className="fa-solid fa-cart-shopping"></i> 1. Select Delivery Items
                  </div>
                  {errors.items && <div className="validation-error-label" style={{ display: 'block', marginBottom: '15px' }}>{errors.items}</div>}
                  
                  <div className="category-selector-grid">
                    {/* Category 1: Fuel */}
                    <div className={`category-card${orderFuel ? ' active' : ''}`}>
                      <div className="category-header" onClick={() => {
                        if (orderFuel && !orderGas && !orderWater) {
                          showToast("At least one item category must be selected.", "error")
                          return
                        }
                        setOrderFuel(!orderFuel)
                      }}>
                        <div className="category-checkbox">
                          <i className={`fa-solid ${orderFuel ? 'fa-square-check' : 'fa-square'}`}></i>
                        </div>
                        <div className="category-title-area">
                          <span className="category-name"><i className="fa-solid fa-gas-pump icon-spacing"></i> Fuel Delivery</span>
                          <span className="category-desc">Petrol (Regular & High-Octane) or Diesel (Regular & Generator)</span>
                        </div>
                      </div>
                      
                      {orderFuel && (
                        <div className="category-body animated fadeIn">
                          <div className="fuel-selector-mini">
                            {['petrol', 'diesel', 'highOctane'].map((type) => (
                              <div
                                key={type}
                                className={`fuel-card-mini${selectedFuelType === type ? ' active' : ''}`}
                                style={{ position: 'relative' }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedFuelType(type)
                                }}
                              >
                                {selectedFuelType === type && (
                                  <span style={{ position: 'absolute', top: '6px', right: '6px', fontSize: '0.72rem', color: '#0284c7' }}>
                                    <i className="fa-solid fa-droplet"></i>
                                  </span>
                                )}
                                <div className="fuel-name-mini">{FUEL_DISPLAY[type]}</div>
                                <div className="fuel-price-mini">Rs. {prices[type].toFixed(2)}/L</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category 2: Gas */}
                    <div className={`category-card${orderGas ? ' active' : ''}`}>
                      <div className="category-header" onClick={() => {
                        if (orderGas && !orderFuel && !orderWater) {
                          showToast("At least one item category must be selected.", "error")
                          return
                        }
                        setOrderGas(!orderGas)
                      }}>
                        <div className="category-checkbox">
                          <i className={`fa-solid ${orderGas ? 'fa-square-check' : 'fa-square'}`}></i>
                        </div>
                        <div className="category-title-area">
                          <span className="category-name"><i className="fa-solid fa-fire icon-spacing"></i> Gas Delivery</span>
                          <span className="category-desc">Gas Cylinder & Refill / Exchange (Delivery Included)</span>
                        </div>
                      </div>
                      {orderGas && (
                        <div className="category-body animated fadeIn">
                          <div className="info-badge success">
                            <i className="fa-solid fa-truck-fast"></i> Delivery Charges Free/Included in Gas rate
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category 3: Water */}
                    <div className={`category-card${orderWater ? ' active' : ''}`}>
                      <div className="category-header" onClick={() => {
                        if (orderWater && !orderFuel && !orderGas) {
                          showToast("At least one item category must be selected.", "error")
                          return
                        }
                        setOrderWater(!orderWater)
                      }}>
                        <div className="category-checkbox">
                          <i className={`fa-solid ${orderWater ? 'fa-square-check' : 'fa-square'}`}></i>
                        </div>
                        <div className="category-title-area">
                          <span className="category-name"><i className="fa-solid fa-droplet icon-spacing"></i> Water Refill</span>
                          <span className="category-desc">Gallon refilling (Rs. 100/Gallon, Delivery Included)</span>
                        </div>
                      </div>
                      {orderWater && (
                        <div className="category-body animated fadeIn">
                          <div className="info-badge success">
                            <i className="fa-solid fa-glass-water"></i> Flat Rate: Rs. 100.00 / Gallon
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Configure Quantities (Custom Menu per Item) */}
                  {(orderFuel || orderGas || orderWater) && (
                    <>
                      <div className="form-block-title" style={{ marginTop: '30px' }}>
                        <i className="fa-solid fa-scale-balanced"></i> 2. Configure Quantities
                      </div>

                      {/* Fuel Quantity Section */}
                      {orderFuel && (
                        <div className="quantity-config-card animated fadeIn" style={{ marginBottom: '20px' }}>
                          <div className="quantity-config-header">
                            <span className="config-title"><i className="fa-solid fa-gas-pump"></i> Fuel Quantity ({FUEL_DISPLAY[selectedFuelType]})</span>
                            <span className="config-unit">Litres</span>
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
                                {fuelQty < 50 ? (
                                  <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 600 }}>
                                    <i className="fa-solid fa-circle-info"></i> Nominal Rs. 250 fee applies (&lt;50L)
                                  </span>
                                ) : (
                                  <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                                    <i className="fa-solid fa-circle-check"></i> Free Delivery Qualified
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="5" max="15" step="1" value={fuelQty}
                              onChange={e => syncFuelQty(e.target.value)}
                              aria-label="Fuel quantity slider" />
                            <div className="limits-row">
                              <span>Min: 5 L</span>
                              <span>Max: 15 L</span>
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
                                    {qty} L {qty === 5 ? '• Min' : qty === 15 ? '• Max' : ''}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LPG Gas Quantity Section */}
                      {orderGas && (
                        <div className="quantity-config-card animated fadeIn" style={{ marginBottom: '20px' }}>
                          <div className="quantity-config-header">
                            <span className="config-title"><i className="fa-solid fa-fire-burner"></i> LPG Gas Cylinder Refill</span>
                            <span className="config-unit">Kilograms / Cylinders</span>
                          </div>
                          
                          <div className="form-group">
                            <div className="stepper-wrap">
                              <div className="quantity-stepper">
                                <button type="button" className="stepper-btn" aria-label="Decrease gas quantity"
                                  onClick={() => syncGasQty(gasQty - 1)}>-</button>
                                <input type="number" className="stepper-input"
                                  value={gasQty} min="1" max="200" step="1"
                                  onChange={e => syncGasQty(e.target.value)}
                                  aria-label="Gas quantity in Kg" />
                                <button type="button" className="stepper-btn" aria-label="Increase gas quantity"
                                  onClick={() => syncGasQty(gasQty + 1)}>+</button>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Kg / Units</span>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="1" max="200" step="1" value={gasQty}
                              onChange={e => syncGasQty(e.target.value)}
                              aria-label="Gas quantity slider" />
                            <div className="limits-row">
                              <span>Min: 1 Kg</span>
                              <span>Max: 200 Kg</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Water Quantity Section */}
                      {orderWater && (
                        <div className="quantity-config-card animated fadeIn" style={{ marginBottom: '20px' }}>
                          <div className="quantity-config-header">
                            <span className="config-title"><i className="fa-solid fa-droplet"></i> Water Refill</span>
                            <span className="config-unit">Gallons</span>
                          </div>
                          
                          <div className="form-group">
                            <div className="stepper-wrap">
                              <div className="quantity-stepper">
                                <button type="button" className="stepper-btn" aria-label="Decrease water quantity"
                                  onClick={() => syncWaterQty(waterQty - 1)}>-</button>
                                <input type="number" className="stepper-input"
                                  value={waterQty} min="1" max="500" step="1"
                                  onChange={e => syncWaterQty(e.target.value)}
                                  aria-label="Water quantity in Gallons" />
                                <button type="button" className="stepper-btn" aria-label="Increase water quantity"
                                  onClick={() => syncWaterQty(waterQty + 1)}>+</button>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Gallons</span>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="1" max="500" step="1" value={waterQty}
                              onChange={e => syncWaterQty(e.target.value)}
                              aria-label="Water quantity slider" />
                            <div className="limits-row">
                              <span>Min: 1 Gallon</span>
                              <span>Max: 500 Gallons</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* 3. Delivery Details */}
                  <div className="form-block-title" style={{ marginTop: '30px' }}>
                    <i className="fa-solid fa-location-dot"></i> 3. Delivery Details
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
                        {deliverySpeed === 'urgent' ? '⚡ Urgent Dispatch Selected (+Rs. 100)' : '✓ Standard Dispatch Selected (20-45 Mins)'}
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
                            Delivery within 20-45 mins
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--brand-primary, #0284c7)', fontWeight: 700, marginTop: '4px' }}>
                            Standard Rate {orderFuel && fuelQty >= 50 ? '(FREE)' : (orderFuel ? '(Rs. 250)' : '(Included)')}
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
                            Delivery within 10-20 mins
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#ea580c', fontWeight: 700, marginTop: '4px' }}>
                            +Rs. 100 Express Priority Surcharge
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Contact Details */}
                  <div className="form-block-title">
                    <i className="fa-solid fa-user-shield"></i> 4. Contact Details
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

                  {/* 5. Payment Policy Selection */}
                  <div className="form-block-title" style={{ marginTop: '25px' }}>
                    <i className="fa-solid fa-money-check-dollar"></i> 5. Payment Policy
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
                            Cash on Delivery is enabled because your selected quantities are compact. Please keep exact change ready.
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
                            Orders exceeding 10 Litres of Fuel, 10 Kg of LPG Gas, or 20 Gallons of Water require advance bank transfer due to high volume safety operations.
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

                  {/* LPG Gas Breakdown */}
                  {orderGas && (
                    <div className="summary-section" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.4)', paddingBottom: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-fire-burner" style={{ color: '#f97316' }}></i> LPG Gas Cylinder
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Quantity</span>
                        <strong>{gasQty} Kg</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Unit Rate</span>
                        <strong>Rs. {gasRate.toFixed(2)}/Kg</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Gas Cost</span>
                        <strong>{fmt(gasCost)}</strong>
                      </div>
                    </div>
                  )}

                  {/* Water Breakdown */}
                  {orderWater && (
                    <div className="summary-section" style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.4)', paddingBottom: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-droplet" style={{ color: '#0ea5e9' }}></i> Water Refill
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Quantity</span>
                        <strong>{waterQty} Gallons</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Unit Rate</span>
                        <strong>Rs. {waterRate.toFixed(2)}/Gal</strong>
                      </div>
                      <div className="summary-row" style={{ marginTop: '2px', marginBottom: '2px' }}>
                        <span>Water Cost</span>
                        <strong>{fmt(waterCost)}</strong>
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

                {/* 3D Delivery Confirmation Vector Animation */}
                <RefuelingLifecycleTracker
                  deliveryPhase={deliveryPhase}
                  setDeliveryPhase={setDeliveryPhase}
                  selectedFuelType={selectedFuelType}
                  fuelQty={fuelQty}
                  address={address}
                  deliverySpeed={deliverySpeed}
                />
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
                      Simply choose your required fuel category (Diesel, Petrol, High-Octane, LPG Cylinder, or Water Refill) on this order page, set your quantity, enter your delivery address in Lahore, and select your preferred delivery speed. Our dispatcher immediately routes the nearest certified bowser to your location.
                    </p>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      2. What is the minimum quantity for doorstep diesel delivery?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      You can order as little as 5 liters up to 2,000+ liters per order. For orders below 50 liters, a nominal standard delivery fee applies. For bulk orders of 50+ liters, delivery is free within our service coverage zones in Lahore.
                    </p>
                  </div>

                  <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      3. Is Cash on Delivery (COD) supported?
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Yes! Cash on Delivery (COD) is supported for domestic orders (up to 10 liters of fuel, 10 kg LPG, or 20 gallons of water). For commercial bulk refueling and fleet orders, we provide bank transfer, online payment, and corporate invoicing terms.
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
                ⏱️ Estimated Arrival: {countdownText} ({activeOrder.deliverySpeed === 'urgent' ? '10-20 Min Urgent' : '20-45 Min Standard'})
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
                <i className="fa-solid fa-file-invoice-dollar" style={{ fontSize: '1.2rem' }}></i>
                View &amp; Download Invoice (رسید دیکھیں / ڈاؤنلوڈ کریں)
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
            {/* Modal Actions Header Bar (No-Print) */}
            <div className="invoice-modal-actions no-print">
              <div className="invoice-action-left">
                <span className="invoice-badge"><i className="fa-solid fa-certificate"></i> Official Calibrated Receipt</span>
              </div>
              <div className="invoice-action-buttons">
                <button
                  type="button"
                  className="btn-invoice-action btn-print"
                  onClick={handlePrintInvoice}
                  title="Print or Save as PDF"
                >
                  <i className="fa-solid fa-print"></i>
                  <span>Download / Print PDF</span>
                </button>
                <button
                  type="button"
                  className="btn-invoice-action btn-download"
                  onClick={handleDownloadInvoiceHTML}
                  title="Download HTML Receipt File"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>Download File</span>
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

            {/* Printable & Viewable Invoice Document */}
            <div className="invoice-printable" id="printable-order-invoice">
              {/* Invoice Header */}
              <div className="inv-header">
                <div className="inv-brand-block">
                  <div className="inv-logo-title">
                    <span className="inv-logo-icon"><i className="fa-solid fa-gas-pump"></i></span>
                    <h2 className="inv-title">ZYPHUEL</h2>
                  </div>
                  <p className="inv-subtitle">Certified On-Demand Energy &amp; Fuel Logistics</p>
                  <p className="inv-address-line">Lahore Hub #01 &bull; 75-Main Boulevard, Gulberg III, Lahore, Pakistan</p>
                  <p className="inv-contact-line">Helpline: +92 3230-112464 &bull; support@zyphuel.com</p>
                </div>

                <div className="inv-meta-block">
                  <div className="inv-number-pill">INVOICE #{invoiceData.orderId}</div>
                  <div className="inv-meta-row">
                    <span>Date &amp; Time:</span> <strong>{invoiceData.date}</strong>
                  </div>
                  <div className="inv-meta-row">
                    <span>Status:</span> <strong className="status-confirmed">&#10003; DISPATCH CONFIRMED</strong>
                  </div>
                  <div className="inv-meta-row">
                    <span>Dispatch Mode:</span> <strong>{invoiceData.isUrgent ? 'Priority Urgent (10-20m)' : 'Standard Dispatch'}</strong>
                  </div>
                </div>
              </div>

              {/* Billed To & Logistics Grid */}
              <div className="inv-parties-grid">
                <div className="inv-party-card">
                  <span className="inv-party-label">BILLED TO / DELIVERY SITE</span>
                  <div className="inv-party-name">{invoiceData.customerName}</div>
                  <div className="inv-party-detail"><i className="fa-solid fa-phone"></i> {invoiceData.phone}</div>
                  {invoiceData.email && invoiceData.email !== 'Not provided' && (
                    <div className="inv-party-detail"><i className="fa-solid fa-envelope"></i> {invoiceData.email}</div>
                  )}
                  <div className="inv-party-detail"><i className="fa-solid fa-location-dot"></i> {invoiceData.address}</div>
                </div>

                <div className="inv-party-card">
                  <span className="inv-party-label">DISPATCH &amp; CALIBRATION TELEMETRY</span>
                  <div className="inv-party-detail">
                    <span>Payment Mode:</span> <strong>{invoiceData.paymentMethod}</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>Delivery Speed:</span> <strong>{invoiceData.deliverySpeed}</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>Metering System:</span> <strong>Positive Displacement (0.01L Accuracy)</strong>
                  </div>
                  <div className="inv-party-detail">
                    <span>ATC Reference:</span> <strong>15&deg;C Automatic Temperature Compensation</strong>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="inv-table-wrapper">
                <table className="inv-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Item Description &amp; Standards</th>
                      <th style={{ textAlign: 'center', width: '15%' }}>Quantity</th>
                      <th style={{ textAlign: 'right', width: '20%' }}>Unit Rate</th>
                      <th style={{ textAlign: 'right', width: '20%' }}>Total (PKR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, idx) => (
                      <tr key={idx}>
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

              {/* Summary & Compliance Guarantee */}
              <div className="inv-summary-container">
                <div className="inv-compliance-badge">
                  <div className="inv-stamp-box">
                    <i className="fa-solid fa-shield-halved"></i>
                    <div>
                      <strong>OGRA COMPLIANT &bull; 100% CALIBRATED</strong>
                      <p>Sourced directly from licensed primary oil marketing depots. Zero short-fueling guarantee with tamper-evident optical flow-meter calibration.</p>
                    </div>
                  </div>
                </div>

                <div className="inv-totals-card">
                  <div className="inv-total-line">
                    <span>Subtotal Items</span>
                    <strong>Rs. {invoiceData.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </div>
                  <div className="inv-total-line">
                    <span>Delivery Charges</span>
                    <strong>
                      {invoiceData.deliveryFee === 0 ? (
                        <span style={{ color: '#10b981' }}>FREE (50L+ Bulk Offer)</span>
                      ) : (
                        `Rs. ${invoiceData.deliveryFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      )}
                    </strong>
                  </div>
                  {invoiceData.isUrgent && (
                    <div className="inv-total-line" style={{ color: '#ea580c', fontSize: '0.8rem' }}>
                      <span>Urgent Priority Surcharge</span>
                      <span>+Rs. 100.00 (Included)</span>
                    </div>
                  )}
                  <div className="inv-total-line grand-total-line">
                    <span>Grand Total Payable</span>
                    <span className="grand-amount">
                      Rs. {invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer Notice */}
              <div className="inv-footer-note">
                <div className="inv-note-text">
                  Thank you for trusting Zyphuel. Fleet bowser dispatch is actively routed to your address.
                  Helpline WhatsApp: <strong>+92 3230-112464</strong>.
                </div>
                <div className="inv-digital-sign">
                  <span className="sign-line">Computerized Verified Invoice</span>
                  <span className="sign-company">Zyphuel Refueling Systems PK</span>
                </div>
              </div>
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
          overflow: hidden;
          animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes modalScaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
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
        .btn-invoice-action.btn-print {
          background: #0284c7;
          color: #ffffff;
        }
        .btn-invoice-action.btn-print:hover {
          background: #0369a1;
        }
        .btn-invoice-action.btn-download {
          background: rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
        }
        .btn-invoice-action.btn-download:hover {
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

        /* Printable Invoice Container */
        .invoice-printable {
          padding: 30px 32px;
          background: #ffffff;
          color: #0f172a;
        }
        .inv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #0284c7;
          padding-bottom: 18px;
          margin-bottom: 20px;
          gap: 16px;
          flex-wrap: wrap;
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
          margin: 2px 0 0 0;
          font-size: 0.75rem;
          color: #64748b;
        }
        .inv-meta-block {
          text-align: right;
        }
        .inv-number-pill {
          font-size: 1.05rem;
          font-weight: 900;
          color: #0f172a;
          font-family: monospace;
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
          padding: 2px 8px;
          border-radius: 6px;
          display: inline-block;
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
          margin-bottom: 20px;
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
          gap: 10px;
        }
        .inv-note-text {
          max-width: 420px;
          line-height: 1.4;
        }
        .inv-digital-sign {
          text-align: right;
        }
        .sign-line {
          display: block;
          font-weight: 700;
          color: #0f172a;
        }
        .sign-company {
          font-size: 0.66rem;
          color: #94a3b8;
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
