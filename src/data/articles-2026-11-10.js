/**
 * Articles published 2026-11-10.
 *
 * Kept in a separate module so the main articles.js file stays readable; it is
 * spread into the exported `articles` array at the end, which means the blog
 * list, prerender routes, sitemap and feed generator all pick them up without
 * any further wiring.
 *
 * Fact rules for this file: 5–15 L doorstep volume, Rs. 300 fee up to 10 L and
 * Rs. 320–400 for 11–15 L, OGRA rate + Rs. 5.00/L, one 45-minute window with no
 * express tier, order intake 8:00 AM – 10:00 PM PKT, 24/7 WhatsApp helpline.
 */

export const NEW_ARTICLES_2026_11_10 = [
  {
    id: 15,
    slug: 'petrol-delivery-app-lahore-how-it-works',
    category: 'How It Works',
    categoryClass: 'zyphuel',
    title: 'How Does a Petrol Delivery App Work? Step-by-Step Guide for Lahore Residents',
    summary:
      'A complete walkthrough of ordering fuel through the Zyphuel app and website: from selecting your fuel grade and pinning your GPS location to receiving a metered doorstep delivery within 45 minutes in Lahore.',
    date: 'November 10, 2026',
    readTime: '7 min read',
    author: 'Zyphuel Energy Analysis Team',
    authorIcon: 'fa-solid fa-mobile-screen-button',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=720&q=80',
    tags: ['PetrolDeliveryApp', 'FuelDeliveryPakistan', 'OrderPetrolOnline', 'ZyphuelApp', 'LahoreDelivery'],
    keyTakeaways: [
      'Orders are placed through the Zyphuel Android app or the web portal at zyphuel.netlify.app/order/ between 8:00 AM and 10:00 PM PKT daily.',
      'GPS auto-pinning detects your Lahore address to sub-sector accuracy — DHA, Gulberg, Johar Town, Bahria Town and all covered zones.',
      'You choose a fuel grade (Euro-V Petrol, High-Octane 97 or Euro-V Diesel), pick 5 to 15 litres, and see the full price breakdown before confirming.',
      'A grounded micro-refueler bowser dispatches within 45 minutes with a calibrated 0.01 litre digital flow meter.',
      'After dispensing, the exact metered volume, OGRA rate, margin and delivery fee appear on a QR/barcoded PDF invoice sent to your phone.'
    ],
    sections: [
      {
        heading: 'Step 1: Open the App or Web Portal',
        subheading: 'Two entry points, one ordering flow',
        paragraphs: [
          'Zyphuel accepts fuel orders through two channels: the official Android APK and the web-based order form at zyphuel.netlify.app/order/. Both channels feed into the same dispatch system, so the experience after checkout is identical regardless of which one you use.',
          'The Android app adds background features that the website cannot replicate — automated 2-hour OGRA price alerts pushed directly to your notification shade, biometric fingerprint checkout, and persistent GPS tracking that keeps your saved addresses up to date. If you order regularly, the app saves time on every repeat order.',
          'The order form opens daily at 8:00 AM PKT and closes strictly at 10:00 PM PKT. Outside that window the checkout button is disabled by design, not by a bug. For genuine emergencies after hours, the WhatsApp helpline on +92 3230-112464 is answered around the clock.'
        ]
      },
      {
        heading: 'Step 2: Pin Your Location and Select Fuel',
        subheading: 'GPS auto-detection across Lahore sectors',
        paragraphs: [
          'When you open the order form, the app requests location permission and auto-pins your address to the nearest covered sector in Lahore. Covered zones include Gulberg, DHA Phase 1 through 9, Johar Town, Model Town, Wapda Town, Cantonment, Bahria Town, Faisal Town, Garden Town, Valencia Town, Township, Green Town, Allama Iqbal Town, Samanabad, Shalimar, Mughalpura and the Canal Road corridor.',
          'After confirming your address, you select a fuel grade: Super Euro-V Petrol (92 Octane), High-Octane 97 or Euro-V Diesel. Each grade shows the current OGRA ex-depot rate for the day. You then pick the volume — anywhere from 5 litres (the minimum) to 15 litres (the maximum per doorstep order) using a slider or direct entry.'
        ]
      },
      {
        heading: 'Step 3: Review the Price Breakdown and Confirm',
        subheading: 'Three lines, no hidden charges',
        paragraphs: [
          'Before you tap confirm, the order page shows three separate lines: the fuel cost (litres multiplied by the OGRA rate), the retail margin (litres multiplied by Rs. 5.00), and the delivery fee. The delivery fee is Rs. 300.00 for 5 to 10 litres, and scales in Rs. 20.00 steps from Rs. 320.00 to Rs. 400.00 for 11 to 15 litres. There is no distance surcharge, no convenience fee and no express tier.',
          'Payment is Cash on Delivery for orders of 5 to 10 litres. After reviewing the total, you confirm the order and the dispatch system assigns the nearest available micro-refueler bowser. You receive a confirmation with an estimated arrival time — the standard is within 45 minutes from confirmation.',
          'If the OGRA rate changes between the time you open the form and the time you confirm, the order page reflects the updated rate. The price you see at confirmation is the price you pay.'
        ]
      },
      {
        heading: 'Step 4: Track the Bowser and Receive Your Fuel',
        subheading: 'Live GPS dispatch and metered dispensing',
        paragraphs: [
          'Once dispatched, the app shows the bowser moving towards your pinned location on a live map. The rider operates a HAZMAT-certified micro-refueler equipped with a grounding wire, a fire suppression kit and a 50-metre hose that reaches most parking spots and generator rooms without repositioning the vehicle.',
          'Fuel is dispensed directly into your vehicle tank or generator tank through a calibrated electronic positive-displacement flow meter that records volume to 0.01 litres. You watch the meter reading in real time on the operator tablet. When dispensing finishes, the system generates a QR/barcoded PDF invoice showing the exact litres dispensed, the per-litre rate, the margin, the delivery fee and the total — sent instantly to your phone.',
          'Decanting into jerrycans, plastic containers or storage drums is not offered. Every litre goes directly into the equipment it was ordered for, which is both a safety requirement and the only way the metered quantity can be verified.'
        ]
      },
      {
        heading: 'What Happens If Something Goes Wrong',
        subheading: 'Cancellations, wrong addresses and after-hours emergencies',
        paragraphs: [
          'If you need to cancel, do so before the bowser dispatches. Once the rider is en route, the order is treated as active. If the GPS-pinned address turns out to be unreachable, the dispatcher contacts you directly to confirm an alternative drop point within the same zone.',
          'For problems after delivery — a volume dispute, a missing invoice or a billing question — the WhatsApp helpline on +92 3230-112464 handles complaints with the metered delivery record as the reference. Because every dispensing event is logged with a timestamped flow-meter reading, resolving discrepancies takes minutes rather than days.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I order petrol online in Lahore?',
        answer:
          'Visit zyphuel.netlify.app/order/ or open the Zyphuel Android app between 8:00 AM and 10:00 PM PKT. Pin your location, select your fuel grade and volume (5 to 15 litres), review the price breakdown, and confirm. A bowser dispatches within 45 minutes.'
      },
      {
        question: 'Is there a fuel delivery app for Pakistan?',
        answer:
          'Yes. The Zyphuel Android app provides doorstep delivery of Euro-V Petrol, High-Octane 97 and Euro-V Diesel across Lahore with GPS tracking, 2-hour OGRA price alerts and metered dispensing. Download it from the official website at zyphuel.netlify.app/download/.'
      },
      {
        question: 'What is the minimum and maximum fuel I can order?',
        answer:
          'The minimum is 5 litres and the maximum is 15 litres per doorstep order. Orders below 5 litres are clamped to 5 litres and orders above 15 litres are capped at 15 litres. Larger requirements are handled through scheduled commercial supply.'
      },
      {
        question: 'Can I order fuel at night in Lahore?',
        answer:
          'Online order intake closes at 10:00 PM PKT and reopens at 8:00 AM PKT. For emergencies outside that window, contact the 24/7 WhatsApp helpline on +92 3230-112464 and the dispatcher will confirm whether a delivery can be arranged.'
      },
      {
        question: 'How is the fuel metered during delivery?',
        answer:
          'Every bowser carries a calibrated electronic positive-displacement flow meter that records volume to 0.01 litres. The reading is displayed in real time on the operator tablet and printed on the invoice, so the quantity is verifiable on the spot.'
      }
    ],
    content: [
      'Ordering fuel through a delivery app in Lahore is a five-step process: open the app or web portal, pin your GPS location, select fuel grade and volume (5 to 15 litres), review the transparent price breakdown, and confirm. A micro-refueler bowser dispatches within 45 minutes.',
      'Place an order at zyphuel.netlify.app/order/ between 8:00 AM and 10:00 PM PKT, or download the Zyphuel Android app for automated price alerts and biometric checkout.'
    ]
  },
  {
    id: 16,
    slug: 'winter-fuel-tips-pakistan-generator-diesel-2026',
    category: 'Seasonal Guides',
    categoryClass: 'zyphuel',
    title: 'Winter Fuel Tips 2026: Protecting Your Generator Diesel and Vehicle Petrol in Lahore\'s Cold Season',
    summary:
      'Practical guidance on preventing diesel gelling, maintaining generator fuel quality, and keeping your vehicle running smoothly through Lahore\'s November-to-February cold season — with doorstep delivery tips for winter preparedness.',
    date: 'November 10, 2026',
    readTime: '8 min read',
    author: 'Zyphuel Energy Analysis Team',
    authorIcon: 'fa-solid fa-temperature-low',
    image: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=720&q=80',
    tags: ['WinterFuelTips', 'DieselGelling', 'GeneratorWinterCare', 'LahoreColdSeason', 'FuelQuality2026'],
    keyTakeaways: [
      'Lahore temperatures drop below 5°C on clear December and January nights, which is enough to cause wax crystal formation in low-quality diesel that clogs fuel filters.',
      'Euro-V diesel has a cold filter plugging point (CFPP) well below Lahore minimums, but adulterated or stale diesel from uncertified sources does not.',
      'Generators that sit idle for weeks between outages accumulate condensation in the tank, which mixes with diesel and causes injector corrosion.',
      'Petrol is less sensitive to cold than diesel in Lahore conditions, but old fuel left in a motorcycle or car tank for weeks loses volatility and causes hard starts.',
      'Ordering fresh fuel through a metered delivery service before cold snaps avoids the risk of stale or adulterated fuel sitting in a tank through winter.'
    ],
    sections: [
      {
        heading: 'Why Winter Matters for Fuel in Lahore',
        subheading: 'The temperature range most people ignore',
        paragraphs: [
          'Lahore is not Quetta or Murree, and people do not think of it as a cold city. But between November and February, night-time temperatures on clear nights regularly fall below 5°C and occasionally touch 2°C in open areas like DHA Phase 6–9, Bahria Town and the canal-side sectors. That is not cold enough to freeze petrol, but it is enough to cause problems with diesel.',
          'Diesel fuel contains paraffin wax that remains dissolved at warm temperatures. When the fuel cools below its cloud point — typically 0°C to minus 5°C for properly refined Euro-V diesel — wax crystals begin to form. If the fuel cools further below its cold filter plugging point (CFPP), those crystals block the fuel filter and the engine will not start or will lose power under load.',
          'The issue is rarely the temperature alone. It is the combination of cold temperatures and poor fuel quality. Euro-V diesel refined to Pakistan specification has a CFPP well below anything Lahore experiences. The problem starts when the diesel in the tank is adulterated, old, or sourced from a pump that mixed winter and summer stock carelessly.'
        ]
      },
      {
        heading: 'Generator Diesel: Condensation Is the Real Winter Enemy',
        subheading: 'Why idle generators suffer more than running ones',
        paragraphs: [
          'A generator that runs daily burns through its fuel fast enough that condensation never accumulates. A generator that sits idle for two or three weeks between outages does not. As night temperatures drop, the air space above the fuel in the tank contracts, pulling in moist air through the vent. When the tank warms again the next day, moisture condenses on the inner walls and drips into the diesel.',
          'Water in diesel is worse than water in petrol. Diesel injectors operate at extremely high pressures, and even a small amount of water causes micro-pitting on the injector tips. Over a single winter season of neglect, water contamination can degrade injector spray patterns enough to raise fuel consumption by 10 to 15 percent and produce visible black exhaust smoke.',
          'The practical fix is straightforward: keep the tank as full as practical so the air space is small, run the generator under load for 15 to 20 minutes once a week even if there is no outage, and drain the sediment bowl at the bottom of the fuel filter housing once a month. If the generator has been sitting with a half-empty tank since September, order a fresh 15 litre top-up before the first cold snap rather than discovering the problem during a power cut at midnight.'
        ]
      },
      {
        heading: 'Vehicle Petrol: Stale Fuel and Hard Morning Starts',
        subheading: 'Why your motorcycle struggles on cold January mornings',
        paragraphs: [
          'Petrol does not gel the way diesel does, and Lahore never gets cold enough to affect its flow properties. The winter problem with petrol is volatility loss. Petrol contains light hydrocarbons that evaporate first — they are the reason a cold engine starts at all. When petrol sits in a tank for weeks without being used, those light fractions evaporate through the fuel cap vent, leaving behind a heavier mixture that is harder to ignite.',
          'Motorcycles and small cars that sit parked for long stretches — a second vehicle, a weekend-only car, or a bike used only for short commutes — are the most affected. The fix is to keep the tank full (less air space means less evaporation) and to use the vehicle at least once a week. If the vehicle has been parked with a quarter-tank for a month, topping up with fresh fuel before trying to start it in cold weather avoids the frustration of a no-start morning.',
          'High-Octane 97 fuel has a slightly different volatility profile than standard 92 Octane Euro-V petrol. In cold conditions, it can be marginally harder to ignite in carburetted engines — which still includes a large share of Lahore motorcycles. Unless your engine specifically requires 97 octane, standard Euro-V petrol is the better winter choice for two-wheelers.'
        ]
      },
      {
        heading: 'Doorstep Delivery as a Winter Preparedness Strategy',
        subheading: 'Avoiding pump queues on cold foggy mornings',
        paragraphs: [
          'Lahore fog season runs from late December through early February, and dense fog mornings are exactly when petrol station queues are longest — everyone is running low, visibility is poor, and pump attendants work slower. A doorstep delivery ordered the evening before, between 8:00 AM and 10:00 PM PKT, means the fuel is already in your tank before the fog rolls in.',
          'For generator owners, scheduling a weekly or fortnightly top-up through the order form at zyphuel.netlify.app/order/ keeps the tank full and the condensation space minimal. The delivery is metered on a calibrated 0.01 litre flow meter, and the invoice records the exact volume — which matters for building managers who need to reconcile fuel spend against generator run-hours through winter.'
        ]
      },
      {
        heading: 'A Simple Winter Fuel Checklist',
        subheading: 'Five things to do before December',
        paragraphs: [
          'First, top up your generator tank to reduce the air space where condensation forms. Second, run the generator under load for 15 to 20 minutes once a week, even without an outage. Third, drain the fuel filter sediment bowl and check for water. Fourth, fill your car or motorcycle to at least three-quarters to slow volatility loss. Fifth, use the fuel within two to three weeks — do not let it sit through the entire winter.',
          'If the fuel already in your tank is more than a month old and you have not driven or run the generator since October, the safest option is to burn through the old fuel first and then top up with fresh delivery rather than mixing old and new. Fresh Euro-V fuel from a metered doorstep delivery has a known provenance and a known date, which is more than most pump receipts provide.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does diesel gel in Lahore winter?',
        answer:
          'Properly refined Euro-V diesel has a cold filter plugging point well below Lahore minimum temperatures and does not gel. The risk comes from adulterated, stale or improperly stored diesel, which can form wax crystals below 5°C and clog fuel filters.'
      },
      {
        question: 'How do I stop condensation in my generator fuel tank?',
        answer:
          'Keep the tank as full as practical to minimize the air space, run the generator under load for 15 to 20 minutes once a week, and drain the sediment bowl on the fuel filter housing monthly.'
      },
      {
        question: 'Why does my motorcycle struggle to start on cold mornings?',
        answer:
          'Petrol loses its lighter, more volatile fractions when it sits in the tank for weeks. Those fractions are what make cold starting possible. Top up with fresh fuel and use the vehicle at least once a week to prevent hard starts.'
      },
      {
        question: 'Is High-Octane 97 better in winter?',
        answer:
          'Not for most vehicles in Lahore. High-Octane 97 has a slightly different volatility profile that can make cold starting marginally harder in carburetted engines. Unless your engine specifically requires 97 octane, standard Euro-V petrol is the safer winter choice.'
      },
      {
        question: 'Can I order fuel before a fog morning?',
        answer:
          'Yes. Place an order the evening before between 8:00 AM and 10:00 PM PKT at zyphuel.netlify.app/order/. The delivery arrives within 45 minutes, so your tank is full before the fog rolls in.'
      }
    ],
    content: [
      'Winter in Lahore brings diesel gelling risk from poor-quality fuel, condensation buildup in idle generator tanks, and hard starts from stale petrol. Keep tanks full, run generators weekly, and use fresh fuel ordered before the cold snap.',
      'Order 5 to 15 litres of certified Euro-V fuel at zyphuel.netlify.app/order/ between 8:00 AM and 10:00 PM PKT, or contact the 24/7 WhatsApp helpline on +92 3230-112464 for emergencies.'
    ]
  },
  {
    id: 17,
    slug: 'zyphuel-vs-petrol-station-cost-comparison-lahore',
    category: 'Pricing & Transparency',
    categoryClass: 'zyphuel',
    title: 'Doorstep Fuel vs Petrol Station: Real Cost Comparison for Lahore Drivers (2026)',
    summary:
      'An honest, line-by-line cost comparison between filling up at a Lahore petrol station and ordering doorstep delivery — including the hidden costs of queue time, short-fueling, idling fuel burn and round-trip distance that most people never calculate.',
    date: 'November 10, 2026',
    readTime: '8 min read',
    author: 'Zyphuel Energy Analysis Team',
    authorIcon: 'fa-solid fa-scale-balanced',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=720&q=80',
    tags: ['FuelDeliveryCost', 'PetrolStationComparison', 'DoorstepFuelLahore', 'HiddenFuelCosts', 'TransparentPricing2026'],
    keyTakeaways: [
      'The visible cost of a doorstep order is the OGRA rate plus Rs. 5.00 per litre margin plus a delivery fee of Rs. 300.00 to Rs. 400.00 depending on volume.',
      'The visible cost of a petrol station fill is the pump price — but it excludes the fuel burned driving there and back, the time spent queuing, the idling fuel consumption, and the risk of short-fueling.',
      'A round trip of 6 km to a pump in Lahore traffic burns roughly 0.4 to 0.6 litres of petrol, which at current rates costs Rs. 140 to Rs. 210 before you have bought a single litre.',
      'Short-fueling at busy forecourts is documented at 3 to 7 percent of dispensed volume — on a 10 litre fill, that is 0.3 to 0.7 litres you paid for but did not receive.',
      'For orders of 8 litres or more, the effective per-litre premium of doorstep delivery over a pump visit shrinks to under Rs. 30 per litre once hidden pump costs are included.'
    ],
    sections: [
      {
        heading: 'The Pump Price Is Not the Full Price',
        subheading: 'What a petrol station trip actually costs in Lahore',
        paragraphs: [
          'When a Lahore driver compares doorstep fuel delivery to a petrol station, they usually compare the per-litre rate on the order page against the pump board number. That comparison is incomplete because it treats the pump trip as free. It is not.',
          'Consider a typical weekday fill-up. You drive 3 km to the nearest pump on Ferozepur Road or Main Boulevard. In Lahore traffic, that is 10 to 15 minutes each way. Your car idles in the queue for another 5 to 10 minutes. The round trip is 6 km, and at an average consumption of 12 km per litre in stop-and-go Lahore traffic, you burn about 0.5 litres just getting to the pump and back. At Rs. 346 per litre, that is Rs. 173 in fuel you never see on the receipt.',
          'Now add the time cost. Thirty minutes of driving and queuing is time you cannot spend working, resting or being with your family. Whether you value that at zero or at your hourly earning rate is personal, but it is not zero for most working adults in Lahore.'
        ]
      },
      {
        heading: 'Short-Fueling: The Cost You Cannot See on the Meter',
        subheading: 'Why the pump says 10 litres but your tank says otherwise',
        paragraphs: [
          'Short-fueling — dispensing less fuel than the pump meter displays — is a documented problem at Pakistani petrol stations. Consumer protection surveys have measured shortfalls of 3 to 7 percent on busy forecourts, particularly during peak evening hours when attendants rush through fills. On a 10 litre order, that is 0.3 to 0.7 litres that the meter counted but did not actually enter your tank.',
          'The problem is almost impossible for a motorist to prove on the spot. You cannot dipstick a car tank at the pump, and by the time you notice your fuel gauge dropping faster than expected, you are already home. The pump receipt, if you even receive one, shows the metered number — not the actual volume delivered.',
          'A doorstep delivery eliminates this entirely because the dispensing happens in front of you through a calibrated 0.01 litre flow meter that you can watch in real time. The invoice records the metered volume, the rate and the total. If there is ever a discrepancy, the timestamped flow-meter log settles it within minutes.'
        ]
      },
      {
        heading: 'Line-by-Line: 10 Litres at the Pump vs Doorstep',
        subheading: 'Using a real OGRA rate to work the numbers',
        paragraphs: [
          'Take a 10 litre Euro-V petrol order at a daily OGRA rate of Rs. 346.00 per litre. At a petrol station, the pump charges 10 multiplied by Rs. 346.00, which is Rs. 3,460.00. Add the round-trip fuel cost of Rs. 173.00 (0.5 litres burned) and 30 minutes of your time. If 5 percent of the fill was short, you actually received 9.5 litres for your Rs. 3,460.00 — an effective rate of Rs. 364.21 per litre.',
          'Through doorstep delivery, the same 10 litres costs 10 multiplied by (Rs. 346.00 + Rs. 5.00) plus Rs. 300.00 delivery fee, totalling Rs. 3,810.00. You received exactly 10.00 litres, metered and invoiced. Your effective rate is Rs. 381.00 per litre. The difference is Rs. 16.79 per litre — not the Rs. 35.00 per litre it looks like at first glance.',
          'At 15 litres the gap narrows further because the delivery fee of Rs. 400.00 is spread across more litres while the round-trip fuel burn stays the same.'
        ],
        table: {
          caption: 'Cost comparison: 10 litres of Euro-V petrol at Rs. 346.00/L OGRA rate',
          headers: ['Cost line', 'Petrol station', 'Doorstep delivery'],
          rows: [
            ['Fuel (10 L × OGRA rate)', 'Rs. 3,460.00', 'Rs. 3,460.00'],
            ['Retail margin (10 L × Rs. 5.00)', '—', 'Rs. 50.00'],
            ['Delivery fee', '—', 'Rs. 300.00'],
            ['Round-trip fuel burn (~0.5 L)', 'Rs. 173.00', '—'],
            ['Time cost (30 min)', 'Not priced', 'Zero'],
            ['Short-fueling risk (5% avg)', '~0.5 L lost', 'Zero (metered)'],
            ['Total paid', 'Rs. 3,633.00', 'Rs. 3,810.00'],
            ['Litres actually received', '~9.5 L', '10.00 L'],
            ['Effective rate per litre', 'Rs. 382.42/L', 'Rs. 381.00/L']
          ]
        }
      },
      {
        heading: 'When the Pump Still Wins',
        subheading: 'Doorstep delivery is not always cheaper — and that is fine',
        paragraphs: [
          'If you live directly across the road from a well-run, certified petrol station where short-fueling is not a concern, your round-trip cost is close to zero and the pump is cheaper per litre for small fills. A 5 litre doorstep order carries an effective Rs. 65.00 per litre premium (Rs. 5.00 margin plus Rs. 300.00 fee spread over 5 litres), which is hard to justify unless the time saving matters more than the money.',
          'Doorstep delivery makes the clearest financial sense in three situations: when the nearest trusted pump is more than 2 km away, when you would queue for more than 10 minutes, or when you need a metered and invoiced record for a generator or fleet vehicle. In all three cases, the hidden costs of the pump trip erode the apparent price advantage faster than most people expect.'
        ]
      },
      {
        heading: 'The Transparency Difference',
        subheading: 'You cannot dispute what you cannot measure',
        paragraphs: [
          'A petrol station receipt — if you get one — shows the pump meter reading and the total charged. It does not prove how much fuel entered your tank. A metered doorstep delivery invoice shows the calibrated flow-meter reading, the OGRA rate, the margin, the delivery fee and a QR/barcode for verification. That record is auditable, which is why generator owners and fleet managers increasingly prefer it.',
          'For an individual car owner filling 10 litres once a week, the per-litre cost difference is modest either way. The decision usually comes down to whether the 30 minutes of driving and queuing is worth more than the delivery fee — and for most working adults in Lahore, it is.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Is fuel delivery more expensive than a petrol station?',
        answer:
          'The visible per-litre price is slightly higher (OGRA rate plus Rs. 5.00 margin plus a delivery fee), but once you include the fuel burned driving to the pump, time in the queue, and the risk of short-fueling, the effective cost per litre received is comparable for orders of 8 litres or more.'
      },
      {
        question: 'How much does short-fueling cost at Pakistani petrol stations?',
        answer:
          'Consumer protection surveys have measured shortfalls of 3 to 7 percent of dispensed volume at busy forecourts. On a 10 litre fill, that is 0.3 to 0.7 litres you paid for but did not receive.'
      },
      {
        question: 'What is the delivery fee for doorstep fuel in Lahore?',
        answer:
          'Rs. 300.00 for orders of 5 to 10 litres. For 11 to 15 litres, the fee scales in Rs. 20.00 steps: Rs. 320.00 for 11 L, Rs. 340.00 for 12 L, up to Rs. 400.00 for 15 L. There is no distance surcharge inside covered zones.'
      },
      {
        question: 'How do I know I received the exact litres I ordered?',
        answer:
          'Every delivery is dispensed through a calibrated electronic positive-displacement flow meter that records volume to 0.01 litres. The reading is visible in real time and printed on a QR/barcoded PDF invoice.'
      },
      {
        question: 'When does doorstep delivery not make sense?',
        answer:
          'If you live next to a trusted, certified petrol station and your round-trip takes less than 5 minutes with no queue, the pump is cheaper for small fills. The delivery fee spread over 5 litres adds Rs. 60.00 per litre, which is hard to justify without a time or convenience benefit.'
      }
    ],
    content: [
      'A petrol station fill looks cheaper until you add the round-trip fuel burn (Rs. 140–210), queue time (20–30 minutes) and short-fueling risk (3–7%). For 10 litres at Rs. 346/L, the effective pump rate is about Rs. 382/L versus Rs. 381/L for metered doorstep delivery.',
      'Compare for yourself at zyphuel.netlify.app/order/ between 8:00 AM and 10:00 PM PKT, or contact the 24/7 WhatsApp helpline on +92 3230-112464.'
    ]
  }
]
