/**
 * Articles published 2026-10-30.
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

export const NEW_ARTICLES_2026_10_30 = [
  {
    id: 13,
    slug: 'fuel-delivery-charges-lahore-explained',
    category: 'Pricing & Transparency',
    categoryClass: 'zyphuel',
    title: 'Fuel Delivery Charges in Lahore: What the Rs. 300 Base Fee Really Covers',
    summary:
      'A line-by-line look at what a doorstep fuel order costs in Lahore: the official OGRA rate, the Rs. 5.00 per litre retail margin, and the Rs. 300–Rs. 400 delivery band for 5 to 15 litres.',
    date: 'October 30, 2026',
    readTime: '6 min read',
    author: 'Zyphuel Energy Analysis Team',
    authorIcon: 'fa-solid fa-receipt',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=720&q=80',
    tags: ['DeliveryCharges', 'FuelPricing', 'LahoreDelivery', 'TransparentBilling', 'DoorstepFuel'],
    keyTakeaways: [
      'Every order has three lines: fuel at the official OGRA rate, a Rs. 5.00 per litre retail margin, and one delivery fee based only on volume.',
      'Delivery is a flat Rs. 300.00 from 5 to 10 litres, then Rs. 320.00, Rs. 340.00, Rs. 360.00, Rs. 380.00 and Rs. 400.00 for 11 to 15 litres.',
      'There is no express or urgent surcharge. One 45-minute delivery window applies to every order.',
      'The delivery fee does not change with distance inside the covered Lahore zones.',
      'The volume is metered on a calibrated 0.01 litre flow meter and itemised on a QR/barcoded PDF invoice.'
    ],
    sections: [
      {
        heading: 'The Three Lines on Every Invoice',
        subheading: 'Fuel, margin, delivery — and nothing else',
        paragraphs: [
          'Doorstep fuel pricing is easy to make confusing, so it helps to reduce an order to the three lines that actually appear on the invoice. The first line is the fuel itself, billed at the official OGRA notified ex-depot rate for the day. That rate is set nationally, not by Zyphuel, and it moves with the daily pricing mechanism rather than staying fixed for a fortnight.',
          'The second line is a controlled retail margin of Rs. 5.00 per litre. This is the same margin on Euro-V Super Petrol, High-Octane 97 and Euro-V Diesel. It exists because a mobile refuelling operation carries costs a forecourt does not: a calibrated dispenser, a trained operator, a sealed bowser and an invoicing system that produces a metered receipt at your address.',
          'The third line is the delivery fee. It depends only on how many litres you order, not on how far the bowser travels inside the covered zones. There is no fuel surcharge, no handling fee, no convenience fee and no separate payment-processing charge added at checkout.'
        ]
      },
      {
        heading: 'The Delivery Band, Volume by Volume',
        subheading: 'Why 11 litres costs more to deliver than 10',
        paragraphs: [
          'From 5 to 10 litres the fee is flat at Rs. 300.00. From 11 litres upwards it rises by Rs. 20.00 per litre, reaching Rs. 400.00 at the 15 litre maximum. The step exists because a high-capacity load needs more handling time, a heavier container configuration and a longer dispatch slot, not because the fuel itself is different.'
        ],
        table: {
          caption: 'Zyphuel doorstep delivery fee by order volume (PKR)',
          headers: ['Volume', 'Delivery fee', 'Notes'],
          rows: [
            ['5 L', 'Rs. 300.00', 'Minimum order'],
            ['6 L', 'Rs. 300.00', 'Flat band'],
            ['7 L', 'Rs. 300.00', 'Flat band'],
            ['8 L', 'Rs. 300.00', 'Flat band'],
            ['9 L', 'Rs. 300.00', 'Flat band'],
            ['10 L', 'Rs. 300.00', 'Top of the flat band'],
            ['11 L', 'Rs. 320.00', 'First scaled step'],
            ['12 L', 'Rs. 340.00', 'Scaled step'],
            ['13 L', 'Rs. 360.00', 'Scaled step'],
            ['14 L', 'Rs. 380.00', 'Scaled step'],
            ['15 L', 'Rs. 400.00', 'Maximum doorstep volume']
          ]
        }
      },
      {
        heading: 'Two Worked Examples',
        subheading: 'Using the rate you see on the order page',
        paragraphs: [
          'Take a 7 litre petrol order. If the day rate shown on the order page is R per litre, the fuel line is 7 multiplied by R, the margin line is 7 multiplied by 5.00, and the delivery line is Rs. 300.00. Everything is shown separately before you confirm, so the total is not a single unexplained number.',
          'Now take a 12 litre diesel order for a standby generator. The fuel line is 12 multiplied by R, the margin is 12 multiplied by 5.00, and the delivery line is Rs. 340.00. Because the volume is higher, the delivery line moves into the scaled band — but the per-litre fuel price does not change.',
          'One practical consequence: splitting a 15 litre requirement into two smaller orders is more expensive than one order, because you pay the delivery fee twice. The order page clamps anything below 5 litres up to 5 litres and caps anything above 15 litres at 15, so the volume and the fee can never drift apart.'
        ]
      },
      {
        heading: 'What the Fee Does Not Include',
        subheading: 'The charges that deliberately do not exist',
        paragraphs: [
          'There is no urgent or express tier. Every doorstep order is dispatched on the same 45-minute standard, which is why the order page has no priority selector and no priority surcharge line. Any page or message that offers a faster paid tier for this service is out of date.',
          'Jerrycans and storage drums are not sold, filled or delivered. Decanting petrol or diesel into unapproved containers is a safety and legal problem, and it also makes the metered quantity impossible to verify. Fuel goes into the vehicle tank, the generator tank or the machinery it was ordered for.',
          'Orders above 15 litres are not accepted through the consumer form. Factories, plazas, hospitals and construction yards with larger tanks are served through scheduled commercial supply, which is quoted separately because the delivery method and documentation are different.'
        ]
      },
      {
        heading: 'Is Doorstep Delivery Worth the Fee?',
        subheading: 'The costs a pump trip hides',
        paragraphs: [
          'A Rs. 300 delivery fee looks like pure extra cost until the alternative is priced honestly. A pump trip costs the fuel burned to get there and back, the time spent in the queue, and — on a busy forecourt — the risk of a short fill that you cannot easily prove after you have driven away.',
          'A doorstep order replaces that trip with a metered delivery at your address, a receipt that states the exact litres dispensed, and no queue. For a generator that has to be running during an outage, or a car that cannot spare a 40-minute detour, the comparison is usually decided by time rather than by the fee itself.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How much is fuel delivery in Lahore?',
        answer:
          'Rs. 300.00 for orders of 5 to 10 litres and Rs. 320.00 to Rs. 400.00 for orders of 11 to 15 litres. The fee depends only on volume, not on distance inside the covered Lahore zones.'
      },
      {
        question: 'Is there an urgent or express delivery option?',
        answer:
          'No. Urgent and express tiers were removed permanently. There is one delivery window of within 45 minutes and no priority surcharge of any kind.'
      },
      {
        question: 'Does the delivery fee change for DHA or Bahria Town?',
        answer:
          'No. Inside the covered zones the delivery fee is based on volume only. If an address falls outside the covered area, the dispatcher confirms whether a delivery can be made before the order is accepted, rather than adding an unannounced charge.'
      },
      {
        question: 'Why is the fuel price higher than the pump rate?',
        answer:
          'The fuel is billed at the official OGRA rate plus a Rs. 5.00 per litre retail margin. That margin covers the calibrated dispenser, the operator and the metered invoice, and it is the same on petrol, diesel and high-octane.'
      }
    ],
    content: [
      'Fuel delivery charges in Lahore come down to one flat band and one scaled band: Rs. 300.00 for 5 to 10 litres, then Rs. 320.00 to Rs. 400.00 for 11 to 15 litres, on top of the OGRA rate plus Rs. 5.00 per litre.',
      'Place a 5 to 15 litre order on zyphuel.netlify.app/order/ any day between 8:00 AM and 10:00 PM PKT and the breakdown is shown before you confirm.'
    ]
  },
  {
    id: 14,
    slug: 'generator-diesel-consumption-lahore-load-shedding-plan',
    category: 'Generator Refueling',
    categoryClass: 'zyphuel',
    title: 'How Much Diesel a Standby Generator Uses Per Hour — and How to Plan Refills in Lahore',
    summary:
      'A practical consumption table for 10 to 200 kVA diesel generators, how to size a refill around the 5–15 litre doorstep limit, and when scheduled commercial supply makes more sense.',
    date: 'October 30, 2026',
    readTime: '7 min read',
    author: 'Zyphuel Energy Analysis Team',
    authorIcon: 'fa-solid fa-power-off',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=720&q=80',
    tags: ['GeneratorDiesel', 'LoadShedding', 'FuelPlanning', 'Lahore', 'StandbyPower'],
    keyTakeaways: [
      'A diesel generator uses roughly 0.21 litres per kWh at full load, and proportionally less at part load.',
      'A commonly used planning figure at 75% load is about 0.126 litres per hour for every 1 kVA of rating.',
      'A 15 litre doorstep order covers roughly 2.4 hours on a 50 kVA set at 75% load, so longer outages need scheduled supply.',
      'Doorstep orders are accepted daily from 8:00 AM to 10:00 PM PKT; the WhatsApp helpline stays available 24/7 for emergencies.',
      'Every refill is metered on a calibrated 0.01 litre flow meter and itemised on an invoice you can keep with the site log.'
    ],
    sections: [
      {
        heading: 'The Rule of Thumb That Actually Works',
        subheading: 'Litres per hour from kVA, without a manufacturer datasheet',
        paragraphs: [
          'Diesel generator fuel consumption comes from one relationship: a modern diesel engine uses roughly 0.21 litres of fuel for every kilowatt-hour of electrical energy it produces at full load. That figure is a planning approximation, not a guarantee — every manufacturer publishes its own curve, and efficiency drops at very low load — but it is close enough to size a refill before the outage arrives.',
          'To convert a kVA rating into kilowatts, multiply by the power factor, which is commonly 0.8. A 50 kVA set is therefore about 40 kW at full load. Multiply by 0.21 and you get 8.4 litres per hour with everything running at maximum.',
          'Most standby installations never sit at 100% load. At 75% load the same 50 kVA set uses about 6.3 litres per hour. The formula in one line is: litres per hour ≈ kVA × 0.8 × load fraction × 0.21.'
        ]
      },
      {
        heading: 'Consumption by Generator Size',
        subheading: 'Planning figures at 75% load',
        paragraphs: [
          'The table below applies the formula at a 75% load factor. Treat the numbers as planning estimates and check them against your own set once you have logged a few refills — real consumption on an older engine or a lightly loaded set will differ.'
        ],
        table: {
          caption: 'Approximate diesel consumption at 75% load (planning figures)',
          headers: ['Generator rating', 'Approx. kW at 75% load', 'Approx. litres per hour', 'Runtime on 15 litres'],
          rows: [
            ['10 kVA', '6 kW', '1.3 L/h', 'About 11.9 hours'],
            ['25 kVA', '15 kW', '3.2 L/h', 'About 4.8 hours'],
            ['50 kVA', '30 kW', '6.3 L/h', 'About 2.4 hours'],
            ['100 kVA', '60 kW', '12.6 L/h', 'About 1.2 hours'],
            ['200 kVA', '120 kW', '25.2 L/h', 'About 36 minutes']
          ]
        }
      },
      {
        heading: 'Sizing a Refill Inside the 5–15 Litre Window',
        subheading: 'When a doorstep order is enough, and when it is not',
        paragraphs: [
          'A doorstep order covers 5 to 15 litres. On a small residential set — 10 to 25 kVA — that is a useful amount of runtime, and a single order can carry a household through a normal evening outage. On a 100 kVA commercial set it is barely an hour, which is why larger premises should not plan around the consumer form at all.',
          'If your site needs more than 15 litres per outage, the honest answer is scheduled commercial supply into the tank, not repeated doorstep orders stacked on top of each other. The delivery team can size a standing order around your actual consumption and refill before the tank runs low, instead of reacting after the generator has already stopped.'
        ]
      },
      {
        heading: 'Planning Around Lahore Outages',
        subheading: 'Use your own feeder history, not a generic schedule',
        paragraphs: [
          'Outage length varies by feeder, transformer and season, so a generic city-wide schedule is a poor planning input. Keep a simple log for two weeks: the start and end time of each outage, the load you were running, and the litres added at the next refill. That log converts the formula above into a number that is specific to your building.',
          'A workable pattern for most standby sites is to refill before the tank drops below a quarter, keep a written record of every metered delivery, and place the order during the 8:00 AM to 10:00 PM intake window rather than waiting for the generator to fail at midnight. If it does fail outside the window, the WhatsApp helpline on +92 3230-112464 is answered around the clock and the duty dispatcher will say plainly whether a delivery can be arranged.'
        ]
      },
      {
        heading: 'Why the Metered Invoice Matters for Generator Owners',
        subheading: 'Turning fuel spend into an auditable record',
        paragraphs: [
          'A generator is a cost centre, and fuel is usually its largest recurring line. Handwritten slips make that cost impossible to reconcile, especially when several sites share one budget. A metered invoice states the litres dispensed, the rate applied, the delivery charge and an invoice number with a QR/barcode, which is exactly what a building manager or accountant needs at month end.',
          'The 0.01 litre flow meter also removes the guesswork from tank top-ups. Instead of estimating by dipstick, you know how many litres went in, which is the number that makes the next refill predictable.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many litres per hour does a diesel generator use?',
        answer:
          'As a planning figure, about 0.21 litres per kWh at full load. At 75% load that works out to roughly 0.126 litres per hour for every 1 kVA of rating, so a 50 kVA set uses around 6.3 litres per hour.'
      },
      {
        question: 'How long will 15 litres last on a standby generator?',
        answer:
          'At 75% load, about 11.9 hours on a 10 kVA set, 4.8 hours on a 25 kVA set, 2.4 hours on a 50 kVA set and roughly 1.2 hours on a 100 kVA set. Actual runtime depends on the load and the engine.'
      },
      {
        question: 'Can I order more than 15 litres for a generator?',
        answer:
          'Not in a single doorstep order. The platform enforces a 5 litre minimum and a 15 litre maximum per delivery. Larger requirements are handled as scheduled commercial supply with a long-reach hose and monthly invoicing.'
      },
      {
        question: 'Can I get generator diesel at night in Lahore?',
        answer:
          'Online order intake runs daily from 8:00 AM to 10:00 PM PKT, and the checkout is disabled outside that window by design. For an emergency after 10:00 PM, message the 24/7 WhatsApp helpline on +92 3230-112464 and the dispatcher will confirm what is possible.'
      }
    ],
    content: [
      'Generator diesel planning starts with one number: litres per hour, which is roughly kVA × 0.8 × load fraction × 0.21. A 50 kVA set at 75% load sits near 6.3 litres per hour, so a 15 litre doorstep order covers about 2.4 hours.',
      'Order 5 to 15 litres of Euro-V diesel at zyphuel.netlify.app/order/ between 8:00 AM and 10:00 PM PKT, or contact the team for scheduled commercial tank supply above that volume.'
    ]
  }
]
