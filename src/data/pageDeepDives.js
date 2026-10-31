/**
 * Page-specific depth for the three URLs that lag behind in Google's index:
 * /services/, /download/ and /order/.
 *
 * Everything here is rendered by <PageDeepDive /> into the prerendered HTML and
 * is also reused for the FAQPage schema in prerender.js, so a question can never
 * exist in structured data without being visible on the page.
 *
 * Only publish claims that are true for the running service. The numbers below
 * are the same ones the order form, invoice and AGENTS.md business rules use:
 * 5–15 L doorstep volume, Rs. 300 fee up to 10 L, Rs. 320–400 for 11–15 L,
 * Rs. 5.00/L retail margin over the official OGRA rate, one 45-minute window,
 * online intake 8:00 AM – 10:00 PM PKT.
 */

const LAHORE_ZONES = [
  'DHA Phase 1 – 9',
  'Gulberg I – III and MM Alam Road',
  'Johar Town and PIA Society',
  'Model Town and Garden Town',
  'Bahria Town Lahore',
  'Lahore Cantt, Cavalry Ground and Askari I – XI',
  'Faisal Town and Wapda Town',
  'Sundar and Quaid-e-Azam industrial estates'
]

const FEE_ROWS = [
  ['5 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['6 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['7 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['8 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['9 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['10 L', 'Rs. 300.00', 'Rs. 300.00'],
  ['11 L', 'Rs. 320.00', 'Rs. 320.00'],
  ['12 L', 'Rs. 340.00', 'Rs. 340.00'],
  ['13 L', 'Rs. 360.00', 'Rs. 360.00'],
  ['14 L', 'Rs. 380.00', 'Rs. 380.00'],
  ['15 L (max)', 'Rs. 400.00', 'Rs. 400.00']
]

const FEE_TABLE = {
  head: ['Volume', 'Delivery fee', 'Example total delivery charge'],
  rows: FEE_ROWS
}

const LAST_UPDATED = '31 October 2026'

export const SERVICES_DEEP_DIVE = {
  id: 'services-depth',
  eyebrow: 'Service scope',
  title: 'Fuel delivery services in Lahore: grades, volumes, fees and coverage',
  intro:
    'Zyphuel is a doorstep refuelling service, not a fuel station. A calibrated micro-bowser comes to your address in Lahore and dispenses a metered volume straight into your vehicle, generator or machinery. The sections below list exactly what is available, what it costs, and which parts of the city are covered — so you can check your own requirement before ordering.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      h3: 'Three fuel grades and the four targets we refuel',
      body: [
        'Every delivery uses fuel sourced from licensed oil marketing companies and sold at the official OGRA notified rate plus a Rs. 5.00 per litre retail margin — the same margin on petrol, diesel and high-octane. There is no hidden handling charge added at the doorstep.'
      ],
      table: {
        head: ['Fuel grade', 'Where it is used', 'Volume per order'],
        rows: [
          ['Euro-V Super Petrol', 'Cars, sedans and SUVs; motorbikes and scooters', '5 – 15 litres'],
          ['High-Octane 97', 'Cars that specify 97 octane or higher', '5 – 15 litres'],
          ['Euro-V Diesel', 'Standby generators, commercial machinery and diesel vehicles', '5 – 15 litres']
        ]
      },
      after:
        'The four supported refuelling targets are car/sedan/SUV, motorbike/scooter, standby generator and commercial machinery. Fuel is dispensed through a calibrated 0.01 L flow meter and itemised on a QR/barcoded PDF invoice.'
    },
    {
      h3: 'Delivery fee by volume',
      body: [
        'One nominal delivery fee applies per order. It is a flat Rs. 300.00 from 5 to 10 litres, then rises by Rs. 20.00 per litre from 11 to 15 litres to cover the extra load and handling. The fee is shown on the order page and repeated on the invoice before you confirm anything.'
      ],
      table: FEE_TABLE
    },
    {
      h3: 'Coverage across Lahore',
      body: [
        'Dispatch is organised from mobile refueller hubs positioned across the city, which is why a doorstep order is quoted at 45 minutes rather than a same-day slot. Covered zones include:'
      ],
      list: LAHORE_ZONES,
      after:
        'If your address sits outside these zones, send the pin on WhatsApp and the dispatcher will confirm whether a bowser can reach you before the order is accepted.'
    },
    {
      h3: 'Where doorstep delivery ends and corporate supply begins',
      body: [
        'Doorstep orders are capped at 15 litres. Anything larger — a generator tank top-up for a factory, a plaza, a hospital or a construction yard — is handled as scheduled corporate supply with a long-reach hose, batch quality documentation and monthly invoicing. Use the contact page for that instead of the consumer order form, so the dispatch team can size the delivery correctly.'
      ]
    },
    {
      h3: 'What Zyphuel deliberately does not offer',
      body: [
        'There is no urgent or express tier: every doorstep order is dispatched on the same 45-minute standard, and no priority surcharge exists. Jerrycans and safe-storage drums are not sold or filled, because decanting fuel into unapproved containers is a safety and legal risk. Doorstep volume above 15 litres is not accepted through the consumer form.'
      ]
    }
  ],
  faqs: [
    {
      q: 'How much does doorstep diesel delivery cost in Lahore?',
      a: 'You pay the official OGRA diesel rate plus a Rs. 5.00 per litre retail margin, plus a delivery fee of Rs. 300.00 for 5 to 10 litres or Rs. 320.00–Rs. 400.00 for 11 to 15 litres. The exact amount for your chosen volume is calculated on the order page before you confirm.'
    },
    {
      q: 'Can I get petrol delivered to my home in Lahore?',
      a: 'Yes. Euro-V Super Petrol and High-Octane 97 can be delivered to a home address, office or roadside location in Lahore in 5 to 15 litre quantities, within 45 minutes of an accepted order during the 8:00 AM – 10:00 PM intake window.'
    },
    {
      q: 'What is the minimum fuel order Zyphuel accepts?',
      a: '5 litres is the minimum and 15 litres is the maximum for a doorstep order. Volumes move in 1-litre steps, and the order page clamps anything below 5 litres up to 5 litres so the fee and volume always match.'
    },
    {
      q: 'Do you deliver fuel at night in Lahore?',
      a: 'Online order intake closes at 10:00 PM PKT and reopens at 8:00 AM. Outside that window the checkout button is disabled by design. For an emergency outside the window, message the 24/7 WhatsApp helpline on +92 3230-112464 and the duty dispatcher will confirm what can be arranged.'
    }
  ],
  related: [
    { to: '/order/', label: 'Order fuel online in Lahore' },
    { to: '/download/', label: 'Download the Zyphuel Android app' },
    { to: '/blog/petrol-pump-near-me-lahore-doorstep-alternative/', label: 'Petrol pump near me: the doorstep alternative' },
    { to: '/blog/diesel-delivery-lahore-price-per-litre-fleet-budget/', label: 'Diesel delivery price per litre and fleet budgets' }
  ]
}

export const DOWNLOAD_DEEP_DIVE = {
  id: 'download-depth',
  eyebrow: 'Install guide',
  title: 'Installing the Zyphuel APK: build details, requirements and setup',
  intro:
    'The Android app is distributed as a direct APK from this website — Google Play and the Apple App Store listings are not live yet, so any link claiming to be an official store page is not ours. This section lists the current build, what the app needs, and what to do if your phone blocks the install.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      h3: 'Current build details',
      body: [
        'These values come from the signed APK itself, so you can compare them with what your phone reports after installation.'
      ],
      table: {
        head: ['Field', 'Value'],
        rows: [
          ['Version name', '2.6.4.0.0.33'],
          ['Version code', '61'],
          ['File size', '35.3 MB (35,321,064 bytes)'],
          ['Minimum Android', '7.0 Nougat (minSdk 24)'],
          ['Target SDK', '36 (Android 15/16 ready)'],
          ['Package name', 'com.aistudio.zyphuel.appv2'],
          ['Release date', '24 October 2026']
        ]
      }
    },
    {
      h3: 'Install in five steps',
      body: ['The whole process takes about a minute on a normal connection.'],
      list: [
        'Download the APK from the button on this page and wait for the file to finish saving.',
        'Open the downloaded file from your notification shade or the Downloads folder.',
        'If Android asks, allow installs from this source for your browser or file manager. This is the standard Android permission for any app installed outside a store.',
        'Review the permissions the installer lists, then tap Install.',
        'Open the app, allow location access while using the app, and pin your delivery address.'
      ],
      after:
        'Location is used to place the order pin and to estimate dispatch time. The app does not need background location for ordering from the website.'
    },
    {
      h3: 'What is inside the app',
      list: [
        'Fuel selection for Euro-V Super Petrol, High-Octane 97 and Euro-V Diesel with the live per-litre rate.',
        'Volume selection from 5 to 15 litres with the delivery fee shown before checkout.',
        'Saved addresses and a pinned map location for the dispatch rider.',
        'Order history with the metered invoice for each delivery.',
        'Price alerts when the official rate changes, so a fleet can plan a refill around a movement.'
      ]
    },
    {
      h3: 'If the install is blocked',
      list: [
        'Play Protect warning: tap “Install anyway”. The app is signed by Zyphuel but is not distributed through Play, so Play Protect cannot verify the publisher automatically.',
        '“App not installed” on an update: uninstall the older copy first, then install the new APK. Order history stays on the server, not on the phone.',
        '“Unsafe file” on a corporate-managed device: your IT policy may block sideloading. Order through the website on that device instead.'
      ]
    }
  ],
  faqs: [
    {
      q: 'What Android version do I need for the Zyphuel app?',
      a: 'Android 7.0 Nougat or newer. The current build targets SDK 36, so it also runs normally on Android 15 and 16 devices. There is no separate tablet build — the same APK scales to larger screens.'
    },
    {
      q: 'How do I verify the Zyphuel APK is genuine?',
      a: 'Download it only from this domain, then compare the file size (35.3 MB) and the SHA-256 hash published on this page with the file on your phone. A mismatched hash means the file was altered in transit and should be deleted.'
    },
    {
      q: 'Does the app work outside Lahore?',
      a: 'The app installs anywhere, but dispatch is limited to the Lahore zones listed on the services page. An address outside those zones will be rejected at checkout rather than accepted and then cancelled.'
    },
    {
      q: 'Do I need the app to order fuel?',
      a: 'No. The website order page covers the same 5 to 15 litre doorstep flow, the same Rs. 300–Rs. 400 delivery fee and the same metered invoice, on Android, iPhone and desktop. The app adds saved addresses and price alerts.'
    }
  ],
  related: [
    { to: '/order/', label: 'Order fuel online without the app' },
    { to: '/services/', label: 'Services, fees and coverage' },
    { to: '/blog/download-zyphuel-apk-guide/', label: 'Download and install guide' },
    { to: '/contact/', label: 'Contact the dispatch team' }
  ]
}

export const ORDER_DEEP_DIVE = {
  id: 'order-depth',
  eyebrow: 'Ordering guide',
  title: 'How to order fuel online in Lahore: steps, fees and payment',
  intro:
    'A doorstep order takes about a minute: choose the fuel, choose the volume, pin the address and confirm. This section explains each step, what the delivery fee will be for your volume, how payment works, and what happens between confirmation and the bowser arriving.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      h3: 'Six steps from order to delivery',
      list: [
        'Choose the fuel grade — Euro-V Super Petrol, High-Octane 97 or Euro-V Diesel.',
        'Choose the refuelling target: car/sedan/SUV, motorbike/scooter, standby generator or commercial machinery.',
        'Set the volume between 5 and 15 litres. The chips offer 5, 7, 10, 12 and 15 litres; any 1-litre step in between is also accepted.',
        'Pin your location on the map and add the address details the rider needs to find you.',
        'Check the breakdown: fuel at the OGRA rate plus Rs. 5.00 per litre, the delivery fee, and the total.',
        'Confirm the order. The dispatcher assigns the nearest micro-bowser and the WhatsApp confirmation carries your order reference.'
      ]
    },
    {
      h3: 'Delivery fee for each volume',
      body: ['The fee depends only on volume, not on distance inside the covered zones.'],
      table: FEE_TABLE
    },
    {
      h3: 'Payment options',
      list: [
        'Cash on delivery for 5 to 10 litre orders.',
        'On-the-spot digital transfer by QR: JazzCash, Easypaisa, NayaPay and Raast / bank transfer.',
        'Advance digital payment for 11 to 15 litre orders, confirmed before dispatch.',
        'Corporate accounts with bank transfer and monthly invoicing for scheduled generator and fleet supply.'
      ]
    },
    {
      h3: 'Ordering window and the 10:00 PM cut-off',
      body: [
        'Online ordering runs every day from 8:00 AM to 10:00 PM PKT. Between 10:00 PM and 8:00 AM the complete-order button is hidden on purpose, so an order cannot be accepted that nobody is awake to dispatch. The page shows a notice with the reopening time and the WhatsApp helpline instead.',
        'The helpline on +92 3230-112464 stays available 24/7 for emergencies. It is a human dispatcher, not an automated booking form, and it will tell you honestly whether a delivery can be arranged outside the window.'
      ]
    },
    {
      h3: 'What you receive after delivery',
      body: [
        'The flow meter reading is recorded at the moment of dispensing and printed on a QR/barcoded PDF invoice that lists the fuel grade, litres dispensed, per-litre rate, delivery fee and total. Keep that invoice: it is the record of the exact volume delivered, and the same reference is used if you need to raise anything with the support desk.'
      ]
    }
  ],
  faqs: [
    {
      q: 'Can I order fuel after 10:00 PM in Lahore?',
      a: 'The online order form closes at 10:00 PM PKT and reopens at 8:00 AM. The checkout button is disabled during that window by design. For an emergency, message the 24/7 WhatsApp helpline on +92 3230-112464 and the duty dispatcher will confirm whether a delivery can be arranged.'
    },
    {
      q: 'Is cash on delivery available for fuel orders?',
      a: 'Yes, for orders of 5 to 10 litres. Orders of 11 to 15 litres need advance digital payment before dispatch. Riders also carry a QR code for JazzCash, Easypaisa, NayaPay and Raast if you prefer to pay digitally at the doorstep.'
    },
    {
      q: 'How long does a Zyphuel delivery take?',
      a: 'Within 45 minutes of an accepted order, anywhere inside the covered Lahore zones. There is only one delivery window — there is no express tier and no priority surcharge, so the quoted time is the same for every order.'
    },
    {
      q: 'Can I change or cancel an order after confirming?',
      a: 'Send the order reference to the WhatsApp helpline as soon as possible. The dispatcher will tell you whether the bowser is still available to be amended; once fuel has been dispensed, the order cannot be reversed because the volume is already metered.'
    }
  ],
  related: [
    { to: '/services/', label: 'Services, fees and Lahore coverage' },
    { to: '/download/', label: 'Get the Android app for saved addresses' },
    { to: '/blog/can-you-buy-petrol-online-how-to-order-guide/', label: 'Can you buy petrol online? Step-by-step guide' },
    { to: '/blog/emergency-petrol-delivery-near-me-roadside-guide/', label: 'Emergency petrol delivery on the roadside' }
  ]
}
