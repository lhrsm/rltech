import React, { useEffect } from 'react';
import { 
  CheckCircleFill, 
  ExclamationCircleFill, 
  InfoCircleFill, 
  X 
} from 'react-bootstrap-icons';
import { clsx } from 'clsx';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircleFill className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />,
    error: <ExclamationCircleFill className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />,
    info: <InfoCircleFill className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />,
  };

  return (
    <div
      role="status"
      className={clsx(
        'pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg transition-all duration-150 ease-out bg-white',
        toast.type === 'success' && 'border-emerald-200 shadow-emerald-500/5',
        toast.type === 'error' && 'border-rose-200 shadow-rose-500/5',
        toast.type === 'info' && 'border-slate-200'
      )}
    >
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-slate-900">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
