import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)
  const timersRef = useRef(new Map())

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
    const timers = timersRef.current.get(id)
    if (timers) {
      timers.forEach(clearTimeout)
      timersRef.current.delete(id)
    }
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++idRef.current
    setToasts(prev => [...prev, { id, message, type, show: false }])
    
    const timers = []
    // Trigger show after paint
    timers.push(setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, show: true } : t))
    }, 50))
    // Auto-dismiss after 4.5s
    timers.push(setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, show: false } : t))
      timers.push(setTimeout(() => {
        dismissToast(id)
      }, 400))
    }, 4500))

    timersRef.current.set(id, timers)
  }, [dismissToast])

  useEffect(() => {
    return () => {
      timersRef.current.forEach(timers => timers.forEach(clearTimeout))
      timersRef.current.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
