import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import { useSEO } from '../hooks/useSEO'
import BrandAIIndex from '../components/BrandAIIndex'
import { useFuelPrices } from '../context/FuelPriceContext'

const FUEL_PRICES = {
  petrol: 316.15,
  diesel: 354.35,
  highOctane: 448.00,
  lpg: 241.43,
  water: 100.00, // Price is Rs 100 per gallon refill
}

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
    title: 'Order Fuel | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers',
    description: 'Place your mobile refueling order online. Choose from petrol, diesel, high octane, LPG gas cylinders, or water tanker refills. Fastest 24/7 delivery in Lahore matching international logistics standards.',
    keywords: [
      'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zyphuel', 'zphuel', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
      'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers', 'Pakistan number 1 best fuel delivery', 'best services in Pakistan',
      'mobile application for fuel suppliers', 'best mobile application for fuel suppliers', 'images', 'videos', 'links', 'articles', 'blogs', 'founder', 'ceo', 'business partners', 'order fuel online', 'LPG gas cylinder order', 'water refill delivery', 'Lahore cash on delivery',
      'easy refueling request', 'emergency fuel supply', 'on-demand fuel dispatch'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/order',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://zyphuel.netlify.app/order",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "object": {
        "@type": "Product",
        "name": "Zyphuel Mobile Refueling",
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
        "alternateName": ["Z", "zy", "zyp", "zyph", "zyphu", "zyphue", "zyphuel", "zphuel", "zafuel", "ziphuel", "zaful", "zeiphuel", "zephiel", "zaphotel", "z fuel", "zaphael", "zyphus", "keyfuels", "z fuels"],
        "url": "https://zyphuel.netlify.app",
        "sameAs": [
          "https://www.linkedin.com/company/zyphuel/?viewAsMember=true",
          "https://www.linkedin.com/in/muhammad-daniyal490",
          "https://share.google/Nb4XGKYq5aU0nzLr3",
          "https://github.com/daniyal44",
          "https://www.facebook.com/muhammad.daniyal.522942/"
        ],
        "award": [
          "Pakistan number 1 fuel brand",
          "Pakistan number 1 fuel agency",
          "Pakistan number 1 fuel suppliers",
          "Pakistan number 1 best fuel delivery",
          "best services in Pakistan",
          "mobile application for fuel suppliers"
        ]
      }
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
      return Number(location.state.qty)
    }
    return 50
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
  
  const { prices: livePrices } = useFuelPrices()
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
  const [trackerSteps, setTrackerSteps] = useState([
    { status: 'active', title: 'Order Confirmed', desc: 'Your payment method and location are validated.' },
    { status: '', title: 'Fuel Dispatched', desc: 'Tanker is routing to your address from the nearest hub.' },
    { status: '', title: 'Delivered & Calibrated', desc: 'Fuel tank filled and calibrated flow receipt generated.' },
  ])

  // Computed summary
  const fuelRate = prices[selectedFuelType]
  const fuelCost = orderFuel ? (fuelRate * fuelQty) : 0
  const gasRate = prices.lpg
  const gasCost = orderGas ? (gasRate * gasQty) : 0
  const waterRate = prices.water // Flat Rs. 100.00 per Gallon
  const waterCost = orderWater ? (waterRate * waterQty) : 0

  const baseCost = fuelCost + gasCost + waterCost

  // Delivery Charges:
  // "gas option refills cylinder min 5 kg include delivery charges"
  // "water option per gallon 100 rs charge refill"
  // Thus delivery charges only apply if Fuel is selected and fuelQty < 50
  const deliveryFee = (orderFuel && fuelQty < 50) ? 250 : 0
  const total = baseCost + deliveryFee

  // COD is enabled for small orders
  const isCodEligible = (!orderFuel || fuelQty <= 10) && (!orderGas || gasQty <= 10) && (!orderWater || waterQty <= 20)

  const fmt = (n) => `Rs. ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  // Price ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        petrol: Math.max(250, +(prev.petrol + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        diesel: Math.max(250, +(prev.diesel + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        highOctane: Math.max(280, +(prev.highOctane + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        lpg: Math.max(200, +(prev.lpg + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        water: 100.00, // Fixed water price
      }))
    }, 6000)
    return () => clearInterval(interval)
  }, [])

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
          setFuelQty(Number(parsed.quantity) || 50)
        }
      }

      if (parsed.selectedFuelType) setSelectedFuelType(parsed.selectedFuelType)
      if (parsed.fuelQty) setFuelQty(Number(parsed.fuelQty) || 50)
      if (parsed.orderGas !== undefined) setOrderGas(parsed.orderGas)
      if (parsed.gasQty) setGasQty(Number(parsed.gasQty) || 5)
      if (parsed.orderWater !== undefined) setOrderWater(parsed.orderWater)
      if (parsed.waterQty) setWaterQty(Number(parsed.waterQty) || 10)
      if (parsed.deliverySpeed) setDeliverySpeed(parsed.deliverySpeed)
    }
  }, []) // eslint-disable-line

  // Quantity sync helpers
  const syncFuelQty = (val) => {
    let v = parseInt(val) || 0
    if (v < 5) v = 5
    if (v > 2000) v = 2000
    setFuelQty(v)
  }

  const syncGasQty = (val) => {
    let v = parseInt(val) || 0
    if (v < 5) v = 5
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

  // Tracker simulation
  const startTracking = (orderName) => {
    const id = 'ZYP-' + Math.floor(100000 + Math.random() * 900000)
    setTrackerOrderId(`ORDER #${id}`)
    setTrackerEta(deliverySpeed === 'urgent' ? '15 Mins' : '45 Mins')

    const itemsList = []
    if (orderFuel) itemsList.push(`${fuelQty}L of ${FUEL_DISPLAY[selectedFuelType]}`)
    if (orderGas) itemsList.push(`${gasQty}Kg of LPG Gas`)
    if (orderWater) itemsList.push(`${waterQty} Gallons of Water`)
    const itemsDesc = itemsList.join(' + ')

    let dispatchTitle = 'Delivery Dispatched'
    if (orderFuel && !orderGas && !orderWater) dispatchTitle = `${FUEL_DISPLAY[selectedFuelType]} Dispatched`
    else if (!orderFuel && orderGas && !orderWater) dispatchTitle = 'LPG Dispatched'
    else if (!orderFuel && !orderGas && orderWater) dispatchTitle = 'Water Dispatched'

    setTrackerSteps([
      { status: 'active', title: 'Order Confirmed', desc: `Validation complete for ${orderName || 'Customer'}. Payment Method: ${isCodEligible ? 'Cash on Delivery (COD)' : 'Advance Payment'}.` },
      { status: '', title: dispatchTitle, desc: `Vehicle is carrying ${itemsDesc} to ${address || 'your address'}. Speed: ${deliverySpeed === 'urgent' ? 'Urgent' : 'Simple'}.` },
      { status: '', title: 'Delivered & Calibrated', desc: `Delivery completed successfully at ${address || 'your address'}. Safe journey!` },
    ])
    setTrackerProgress(0)
    setTrackerOpen(true)
    setDeliveryPhase('loading')
    let step = 1
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current)
    trackingIntervalRef.current = setInterval(() => {
      step++
      if (step === 2) {
        setTrackerSteps(prev => [
          { ...prev[0], status: 'completed' },
          { ...prev[1], status: 'active' },
          prev[2],
        ])
        setTrackerProgress(50)
        setTrackerEta(deliverySpeed === 'urgent' ? '8 Mins' : '24 Mins')
        setDeliveryPhase('transit')
        showToast('Your delivery has been dispatched!', 'success')
      }
      if (step === 3) {
        setTrackerSteps(prev => [
          prev[0],
          { ...prev[1], status: 'completed' },
          { ...prev[2], status: 'active' },
        ])
        setTrackerProgress(100)
        setTrackerEta('Arrived at your site!')
        setDeliveryPhase('delivered')
        showToast('Vehicle has arrived at your address!', 'success')
      }
      if (step === 4) {
        setTrackerSteps(prev => [prev[0], prev[1], { ...prev[2], status: 'completed' }])
        clearInterval(trackingIntervalRef.current)
      }
    }, 4000)
  }

  // Truck button submit
  const handleTruckClick = () => {
    if (isSubmittingRef.current) return
    if (!validateForm()) {
      showToast('Please check form inputs for errors.', 'error')
      return
    }
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
      startTracking(name)
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
                startTracking(name)
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
    }
  }

  const closeTracker = () => {
    setTrackerOpen(false)
    if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current)
  }

  const resetOrder = () => {
    closeTracker()
    setDeliveryPhase('idle')
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

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* Live Fuel Price Ticker */}
        <div className="price-ticker-wrap">
          <div className="price-ticker" id="fuel-price-ticker">
            {[1, 2].map(i => (
              <span key={i} style={{ display: 'contents' }}>
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
              </span>
            ))}
          </div>
        </div>

        {/* Order Form Section */}
        <section id="order" className="order-section section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h1 className="section-title">Order Refueling & Utility Services</h1>
              <p className="section-subtitle">Select fuel, LPG Gas, or Water. Calculate rates in real time, customize quantities, and track your delivery.</p>
            </div>

            <div className="order-container-grid">

              {/* Left: Order Form */}
              <div className="order-form-panel fade-in-up" id="main-order-panel">
                <form id="fuel-order-form" noValidate onSubmit={e => e.preventDefault()}>

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
                          <span className="category-desc">Petrol, Diesel, or High-Octane</span>
                        </div>
                      </div>
                      
                      {orderFuel && (
                        <div className="category-body animated fadeIn">
                          <div className="fuel-selector-mini">
                            {['petrol', 'diesel', 'highOctane'].map((type) => (
                              <div
                                key={type}
                                className={`fuel-card-mini${selectedFuelType === type ? ' active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedFuelType(type)
                                }}
                              >
                                <div className="fuel-name-mini">{FUEL_DISPLAY[type]}</div>
                                <div className="fuel-price-mini">Rs. {prices[type].toFixed(2)}/L</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category 2: LPG Gas */}
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
                          <span className="category-name"><i className="fa-solid fa-fire-burner icon-spacing"></i> LPG Gas Cylinder</span>
                          <span className="category-desc">Refill LPG cylinders (Min 5 Kg, Delivery Included)</span>
                        </div>
                      </div>
                      {orderGas && (
                        <div className="category-body animated fadeIn">
                          <div className="info-badge success">
                            <i className="fa-solid fa-truck-fast"></i> Delivery Charges Free/Included in LPG rate
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
                                  onClick={() => syncFuelQty(fuelQty - 10)}>-</button>
                                <input type="number" className="stepper-input"
                                  value={fuelQty} min="5" max="2000"
                                  onChange={e => syncFuelQty(e.target.value)}
                                  aria-label="Fuel quantity in Litres" />
                                <button type="button" className="stepper-btn" aria-label="Increase fuel quantity"
                                  onClick={() => syncFuelQty(fuelQty + 10)}>+</button>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Litres</span>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="5" max="2000" value={fuelQty}
                              onChange={e => syncFuelQty(e.target.value)}
                              aria-label="Fuel quantity slider" />
                            <div className="limits-row">
                              <span>Min: 5 L</span>
                              <span>Max: 2000 L</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LPG Gas Quantity Section */}
                      {orderGas && (
                        <div className="quantity-config-card animated fadeIn" style={{ marginBottom: '20px' }}>
                          <div className="quantity-config-header">
                            <span className="config-title"><i className="fa-solid fa-fire-burner"></i> LPG Gas Cylinder Refill</span>
                            <span className="config-unit">Kilograms</span>
                          </div>
                          
                          <div className="form-group">
                            <div className="stepper-wrap">
                              <div className="quantity-stepper">
                                <button type="button" className="stepper-btn" aria-label="Decrease gas quantity"
                                  onClick={() => syncGasQty(gasQty - 5)}>-</button>
                                <input type="number" className="stepper-input"
                                  value={gasQty} min="5" max="200"
                                  onChange={e => syncGasQty(e.target.value)}
                                  aria-label="Gas quantity in Kg" />
                                <button type="button" className="stepper-btn" aria-label="Increase gas quantity"
                                  onClick={() => syncGasQty(gasQty + 5)}>+</button>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Kg (Min: 5 Kg)</span>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="5" max="200" step="5" value={gasQty}
                              onChange={e => syncGasQty(e.target.value)}
                              aria-label="Gas quantity slider" />
                            <div className="limits-row">
                              <span>Min: 5 Kg</span>
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
                                  onClick={() => syncWaterQty(waterQty - 5)}>-</button>
                                <input type="number" className="stepper-input"
                                  value={waterQty} min="1" max="500"
                                  onChange={e => syncWaterQty(e.target.value)}
                                  aria-label="Water quantity in Gallons" />
                                <button type="button" className="stepper-btn" aria-label="Increase water quantity"
                                  onClick={() => syncWaterQty(waterQty + 5)}>+</button>
                              </div>
                              <span style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Gallons</span>
                            </div>
                            
                            <input type="range" className="slider-control"
                              min="1" max="500" value={waterQty}
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
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'inline-block' }}>
                      <i className="fa-solid fa-map-pin" style={{ color: 'var(--accent-color)' }}></i> Powered by Google Maps, Lahore delivery zone covered.
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="notes-input">Additional Address Instructions (Optional)</label>
                    <textarea className="form-control" id="notes-input"
                      placeholder="Gate code, landmark details, tank placement etc..."
                      value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                  </div>

                  {/* Delivery Speed */}
                  <div className="form-group" style={{ marginBottom: '25px' }}>
                    <label className="form-label">Delivery Speed Option</label>
                    <div className="schedule-options">
                      <div
                        className={`schedule-card${deliverySpeed === 'simple' ? ' active' : ''}`}
                        onClick={() => setDeliverySpeed('simple')}
                      >
                        <input type="radio" checked={deliverySpeed === 'simple'} onChange={() => setDeliverySpeed('simple')} />
                        <div className="schedule-info">
                          <span className="schedule-title">Simple Delivery</span>
                          <span className="schedule-desc">Delivery within 20-45 mins</span>
                        </div>
                      </div>
                      <div
                        className={`schedule-card${deliverySpeed === 'urgent' ? ' active' : ''}`}
                        onClick={() => setDeliverySpeed('urgent')}
                      >
                        <input type="radio" checked={deliverySpeed === 'urgent'} onChange={() => setDeliverySpeed('urgent')} />
                        <div className="schedule-info">
                          <span className="schedule-title">Urgent Delivery</span>
                          <span className="schedule-desc">Delivery within 10-20 mins</span>
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
                    <span>Delivery Charges</span>
                    <strong>{deliveryFee === 0 ? <span style={{ color: 'var(--success-mint)' }}>Free (Included)</span> : fmt(deliveryFee)}</strong>
                  </div>

                  <div className="summary-row total-row">
                    <span>Total Estimated</span>
                    <span className="total-amount" id="summary-total-cost">{fmt(total)}</span>
                  </div>
                </div>

                {/* 3D Delivery Confirmation Vector Animation */}
                <div className="delivery-map-widget">
                  <div className="delivery-map-header">
                    <span className="delivery-map-title">Refueling Lifecycle Tracker</span>
                    <span className={`map-status-pill ${deliveryPhase}`} style={{
                      backgroundColor: deliveryPhase === 'delivered' ? 'var(--success-mint-light)' :
                                      deliveryPhase === 'transit' ? 'rgba(14, 165, 233, 0.1)' :
                                      deliveryPhase === 'loading' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                      color: deliveryPhase === 'delivered' ? 'var(--success-mint)' :
                             deliveryPhase === 'transit' ? 'var(--accent-color)' :
                             deliveryPhase === 'loading' ? '#d97706' : 'var(--text-secondary)'
                    }}>
                      <i className={`fa-solid ${
                        deliveryPhase === 'delivered' ? 'fa-circle-check' :
                        deliveryPhase === 'transit' ? 'fa-truck-fast' :
                        deliveryPhase === 'loading' ? 'fa-spinner fa-spin' : 'fa-hourglass'
                      }`}></i> {
                        deliveryPhase === 'delivered' ? 'Completed' :
                        deliveryPhase === 'transit' ? 'In Transit' :
                        deliveryPhase === 'loading' ? 'Loading Depot' : 'Awaiting Order'
                      }
                    </span>
                  </div>
                  
                  <div className="canvas-map-wrapper" style={{ minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '15px', position: 'relative', overflow: 'hidden' }}>
                    <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        {/* 3D Platform Gradient */}
                        <linearGradient id="basePlatformGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>
                        {/* Road Gradient */}
                        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#94a3b8" />
                          <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                        {/* Active Laser Road */}
                        <linearGradient id="activeRoad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                        {/* 3D Depot Gradients */}
                        <linearGradient id="depotCyl" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0891b2" />
                          <stop offset="30%" stopColor="#06b6d4" />
                          <stop offset="70%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#0891b2" />
                        </linearGradient>
                        <linearGradient id="depotTop" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ecfeff" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                        {/* 3D Truck Gradients */}
                        <linearGradient id="truckMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#475569" />
                          <stop offset="50%" stopColor="#64748b" />
                          <stop offset="100%" stopColor="#334155" />
                        </linearGradient>
                        {/* 3D Car Gradients */}
                        <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6d28d9" />
                          <stop offset="40%" stopColor="#a78bfa" />
                          <stop offset="70%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#4c1d95" />
                        </linearGradient>
                        {/* Light Beam Glow */}
                        <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#fef08a" stopOpacity="0.0" />
                        </linearGradient>
                        {/* Concrete Depth Gradients */}
                        <linearGradient id="concreteLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#94a3b8" />
                          <stop offset="100%" stopColor="#64748b" />
                        </linearGradient>
                        <linearGradient id="concreteRight" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#64748b" />
                          <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* 3D CONCRETE DOCKING PAD PLATFORM */}
                      {/* Platform Top Surface */}
                      <polygon points="200,20 380,110 200,200 20,110" fill="url(#basePlatformGrad)" stroke="#cbd5e1" strokeWidth="1" />
                      {/* Left Wall (Depth) */}
                      <polygon points="20,110 200,200 200,212 20,122" fill="url(#concreteLeft)" />
                      {/* Right Wall (Depth) */}
                      <polygon points="200,200 380,110 380,122 200,212" fill="url(#concreteRight)" />

                      {/* Yellow & Black Stripes */}
                      <polygon points="20,110 50,125 50,131 20,116" fill="#eab308" />
                      <polygon points="50,125 80,140 80,146 50,131" fill="#1e293b" />
                      <polygon points="80,140 110,155 110,161 80,146" fill="#eab308" />
                      <polygon points="110,155 140,170 140,176 110,161" fill="#1e293b" />
                      <polygon points="140,170 170,185 170,191 140,176" fill="#eab308" />
                      <polygon points="170,185 200,200 200,206 170,191" fill="#1e293b" />

                      {/* 3D Curved Isometric Highway Path */}
                      <path d="M 70,105 C 130,135 180,175 320,150" fill="none" stroke="#64748b" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
                      <path d="M 70,105 C 130,135 180,175 320,150" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="6,6" opacity="0.5" />

                      {/* Active Route Flow Laser */}
                      {deliveryPhase !== 'idle' && (
                        <path d="M 70,105 C 130,135 180,175 320,150" fill="none" stroke="url(#activeRoad)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="14,10" filter="url(#glow)">
                          <animate attributeName="stroke-dashoffset" values="100;0" dur="2.5s" repeatCount="indefinite" />
                        </path>
                      )}

                      {/* STAGE 1: DEPOT */}
                      <g transform="translate(50, 50)">
                        <ellipse cx="20" cy="45" rx="22" ry="11" fill="#0f172a" opacity="0.22" />
                        <path d="M 0,22 A 20,10 0 0,0 40,22 L 40,45 A 20,10 0 0,1 0,45 Z" fill="url(#depotCyl)" />
                        <ellipse cx="20" cy="22" rx="20" ry="10" fill="url(#depotTop)" stroke="#22d3ee" strokeWidth="0.5" />
                        <line x1="20" y1="22" x2="20" y2="45" stroke="#0891b2" strokeWidth="1" opacity="0.6" />
                        <line x1="10" y1="26" x2="10" y2="44" stroke="#0891b2" strokeWidth="0.5" opacity="0.4" />
                        <line x1="30" y1="26" x2="30" y2="44" stroke="#0891b2" strokeWidth="0.5" opacity="0.4" />
                        <rect x="18" y="26" width="4" height="14" fill="#1e293b" rx="1" />
                        <rect x="19" y="27" width="2" height="12" fill="#22c55e" rx="0.5">
                          <animate attributeName="height" values="12;6;12" dur="6s" repeatCount="indefinite" />
                        </rect>
                        <polygon points="17,14 23,14 20,9" fill="#ef4444" />
                        {deliveryPhase === 'loading' && (
                          <g>
                            <circle cx="20" cy="5" r="4.5" fill="#f59e0b" filter="url(#glow)">
                              <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="5" r="1.5" fill="#ffffff" />
                          </g>
                        )}
                      </g>

                      {/* STAGE 2: TANKER TRUCK */}
                      <g style={{
                        transition: 'transform 2.5s cubic-bezier(0.25, 1, 0.5, 1)',
                        transform: deliveryPhase === 'delivered' ? 'translate(265, 105)' :
                                   deliveryPhase === 'transit' ? 'translate(150, 100)' :
                                   'translate(60, 60)'
                      }}>
                        <ellipse cx="22" cy="40" rx="25" ry="12" fill="#0f172a" opacity="0.25" />
                        <polygon points="30,18 43,10 56,18 43,26" fill="url(#truckMetal)" />
                        <polygon points="30,18 43,26 43,38 30,30" fill="#64748b" />
                        <polygon points="43,26 56,18 56,30 43,38" fill="#1e293b" />
                        <polygon points="44,24 54,19 54,25 44,30" fill="#38bdf8" fillOpacity="0.75" />
                        <polygon points="33,21 41,25 41,31 33,27" fill="#38bdf8" fillOpacity="0.75" />
                        <polygon points="41,20 43,19 43,23 41,24" fill="#0f172a" />
                        <ellipse cx="10" cy="17" rx="9" ry="11" fill="#0ea5e9" />
                        <polygon points="10,6 36,19 36,41 10,28" fill="url(#depotCyl)" />
                        <ellipse cx="36" cy="30" rx="9" ry="11" fill="url(#depotTop)" stroke="#22d3ee" strokeWidth="0.5" />
                        <text x="21" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="5.5" fill="#ffffff" transform="rotate(27, 21, 27)" letterSpacing="0.2">ZYPHUEL</text>
                        <line x1="8" y1="28" x2="4" y2="26" stroke="#475569" strokeWidth="1.5" />
                        {[15, 28, 44].map((cx, idx) => (
                          <g key={cx}>
                            <ellipse cx={cx} cy={39 + (idx === 1 ? 2 : 0)} rx="4.5" ry="6.5" fill="#0f172a" />
                            <ellipse cx={cx} cy={39 + (idx === 1 ? 2 : 0)} rx="1.8" ry="2.8" fill="#94a3b8" />
                          </g>
                        ))}
                        {deliveryPhase !== 'idle' && (
                          <polygon points="56,28 85,38 75,54 50,33" fill="url(#headlightBeam)" />
                        )}
                      </g>

                      {/* STAGE 3: SEDAN VEHICLE */}
                      <g transform="translate(290, 110)">
                        <ellipse cx="28" cy="42" rx="28" ry="13" fill="#0f172a" opacity="0.2" />
                        <polygon points="22,17 36,10 48,17 34,24" fill="url(#carBody)" />
                        <polygon points="10,25 35,37 60,25 35,13" fill="#6d28d9" opacity="0.9" />
                        <polygon points="10,25 35,37 35,43 10,31" fill="#4c1d95" />
                        <polygon points="35,37 60,25 60,31 35,43" fill="#1e1b4b" />
                        <polygon points="56,25 58,24 58,27 56,28" fill="#fef08a" />
                        <line x1="45" y1="31" x2="52" y2="28" stroke="#1e293b" strokeWidth="1" />
                        <polygon points="23,19 33,14 47,19 35,23" fill="#38bdf8" fillOpacity="0.6" />
                        <polygon points="27,18 31,16 41,20 37,21" fill="#ffffff" fillOpacity="0.45" />
                        {[20, 48].map((cx, idx) => (
                          <g key={cx}>
                            <circle cx={cx} cy={40 - (idx === 1 ? 5 : 0)} r="4.5" fill="#0f172a" />
                            <circle cx={cx} cy={40 - (idx === 1 ? 5 : 0)} r="2" fill="#cbd5e1" />
                          </g>
                        ))}
                        {deliveryPhase === 'delivered' && (
                          <g transform="translate(-16, -10)" filter="url(#glow)">
                            <path d="M -10,12 C 5,2 12,5 25,24" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M -10,12 C 5,2 12,5 25,24" fill="none" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" strokeDasharray="6,4">
                              <animate attributeName="stroke-dashoffset" values="30;0" dur="1.2s" repeatCount="indefinite" />
                            </path>
                          </g>
                        )}
                      </g>

                      {/* 3D COMPLETE SUCCESS BADGE */}
                      {deliveryPhase === 'delivered' && (
                        <g transform="translate(130, 40)" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
                          <polygon points="0,15 130,0 130,35 0,50" fill="#ffffff" stroke="var(--success-mint)" strokeWidth="2" filter="url(#glow)" />
                          <circle cx="22" cy="22" r="10" fill="var(--success-mint)" />
                          <path d="M 18,22 L 21,25 L 26,19" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="40" y="27" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="#065f46">DELIVERY COMPLETE</text>
                        </g>
                      )}

                      {/* Labels */}
                      <text x="70" y="125" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="var(--text-secondary)">1. Loaded</text>
                      <text x="180" y="195" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="var(--text-secondary)">2. En Route</text>
                      <text x="320" y="185" fontFamily="sans-serif" fontSize="9.5" fontWeight="bold" fill="var(--text-secondary)">3. Confirmed</text>
                    </svg>
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>Order Placed Successfully!</h3>
            <span className="tracker-order-id" id="tracking-order-id-label">{trackerOrderId}</span>
          </div>
          <div className="tracker-eta-box">
            Estimated Delivery ETA: <span className="tracker-eta-val" id="tracking-eta-timer">{trackerEta}</span>
          </div>
          <div className="tracker-timeline">
            <div className="tracker-progress-line" id="tracker-progress-bar" style={{ height: `${trackerProgress}%` }}></div>
            {trackerSteps.map((step, i) => (
              <div key={i} className={`tracker-step${step.status ? ' ' + step.status : ''}`} id={`tracker-step-${i + 1}`}>
                <div className="step-node">{i + 1}</div>
                <div className="step-info">
                  <span className="step-title">{step.title}</span>
                  <span className="step-desc">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button type="button" className="btn btn-ghost" id="close-tracker-btn" style={{ flex: 1 }} onClick={closeTracker}>Close Screen</button>
            <button type="button" className="btn btn-primary" id="track-order-reset-btn" style={{ flex: 1 }} onClick={resetOrder}>Order Again</button>
          </div>
        </div>
      </div>

      {/* Global AI & Search Engine Directory Index */}
      <BrandAIIndex />

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
      `}</style>
    </div>
  )
}
