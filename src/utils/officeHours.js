/**
 * Official Zyphuel Working Hours & Order Placement Validation
 * 
 * Schedule:
 * - Monday – Thursday: 8:00 AM – 8:00 PM (08:00 – 20:00 PKT)
 * - Friday:            8:00 AM – 1:00 PM (08:00 – 13:00 PKT)
 * - Saturday – Sunday: 10:00 AM – 6:00 PM (10:00 – 18:00 PKT)
 */

export const OFFICE_HOURS_SCHEDULE = [
  { 
    days: 'Monday – Thursday', 
    hours: '8:00 AM – 8:00 PM', 
    urduDays: 'پیر تا جمعرات', 
    urduHours: 'صبح 8:00 تا رات 8:00' 
  },
  { 
    days: 'Friday', 
    hours: '8:00 AM – 1:00 PM', 
    urduDays: 'جمعہ', 
    urduHours: 'صبح 8:00 تا دوپہر 1:00' 
  },
  { 
    days: 'Saturday – Sunday', 
    hours: '10:00 AM – 6:00 PM', 
    urduDays: 'ہفتہ تا اتوار', 
    urduHours: 'صبح 10:00 تا شام 6:00' 
  }
]

export function getNextOpening(day, hour, minute) {
  const timeInMinutes = hour * 60 + minute

  // Before opening today
  if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day) && timeInMinutes < 8 * 60) {
    return `Today (${day}) at 8:00 AM`
  }
  if (['Saturday', 'Sunday'].includes(day) && timeInMinutes < 10 * 60) {
    return `Today (${day}) at 10:00 AM`
  }

  // After closing today
  if (day === 'Monday') return 'Tomorrow (Tuesday) at 8:00 AM'
  if (day === 'Tuesday') return 'Tomorrow (Wednesday) at 8:00 AM'
  if (day === 'Wednesday') return 'Tomorrow (Thursday) at 8:00 AM'
  if (day === 'Thursday') return 'Tomorrow (Friday) at 8:00 AM'
  if (day === 'Friday') return 'Tomorrow (Saturday) at 10:00 AM'
  if (day === 'Saturday') return 'Tomorrow (Sunday) at 10:00 AM'
  if (day === 'Sunday') return 'Tomorrow (Monday) at 8:00 AM'

  return 'Tomorrow at 8:00 AM'
}

export function checkOfficeHours(date = new Date()) {
  try {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    })

    const parts = dtf.formatToParts(date).reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {})
    const day = parts.weekday // 'Monday', 'Tuesday', ...
    const hour = parseInt(parts.hour, 10)
    const minute = parseInt(parts.minute, 10)
    const timeInMinutes = hour * 60 + minute

    let isOfficeOpen = false
    let todaySchedule = ''
    let openTimeMinutes = 0
    let closeTimeMinutes = 0

    if (['Monday', 'Tuesday', 'Wednesday', 'Thursday'].includes(day)) {
      todaySchedule = '8:00 AM – 8:00 PM'
      openTimeMinutes = 8 * 60 // 480
      closeTimeMinutes = 20 * 60 // 1200
      isOfficeOpen = timeInMinutes >= openTimeMinutes && timeInMinutes < closeTimeMinutes
    } else if (day === 'Friday') {
      todaySchedule = '8:00 AM – 1:00 PM'
      openTimeMinutes = 8 * 60 // 480
      closeTimeMinutes = 13 * 60 // 780
      isOfficeOpen = timeInMinutes >= openTimeMinutes && timeInMinutes < closeTimeMinutes
    } else if (['Saturday', 'Sunday'].includes(day)) {
      todaySchedule = '10:00 AM – 6:00 PM'
      openTimeMinutes = 10 * 60 // 600
      closeTimeMinutes = 18 * 60 // 1080
      isOfficeOpen = timeInMinutes >= openTimeMinutes && timeInMinutes < closeTimeMinutes
    }

    const currentFormattedTime = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Karachi',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)

    const currentDateTimeStr = `${day}, ${currentFormattedTime} (PKT)`
    const nextOpening = getNextOpening(day, hour, minute)

    // Online doorstep orders are active and accepted continuously
    const isOpen = true

    return {
      isOpen: true,
      isOfficeOpen,
      day,
      hour,
      minute,
      timeInMinutes,
      currentTime: currentFormattedTime,
      currentDateTimeStr,
      todaySchedule,
      nextOpening,
      mismatchMessage: ''
    }
  } catch (err) {
    // Graceful fallback
    return {
      isOpen: true,
      day: '',
      hour: 12,
      minute: 0,
      timeInMinutes: 720,
      currentTime: '',
      currentDateTimeStr: '',
      todaySchedule: '8:00 AM – 8:00 PM',
      nextOpening: '',
      mismatchMessage: ''
    }
  }
}
