import { useToast } from '../context/ToastContext'

export default function ToastContainer() {
  const { toasts } = useToast()

  const getIcon = (type) => {
    if (type === 'welcome') return 'fa-handshake'
    if (type === 'error') return 'fa-triangle-exclamation'
    return 'fa-circle-check'
  }

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}${toast.show ? ' show' : ''}`}
        >
          <i className={`fa-solid ${getIcon(toast.type)}`}></i>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
