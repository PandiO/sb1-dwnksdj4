import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastPosition, ToastType } from './Toast';

interface ToastContextType {
  showToast: (message: string, options?: {
    position?: ToastPosition;
    duration?: number;
    type?: ToastType;
  }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Array<{
    id: number;
    message: string;
    position: ToastPosition;
    duration: number;
    type: ToastType;
  }>>([]);

  const showToast = useCallback((message: string, options = {}) => {
    const {
      position = 'top',
      duration = 3000,
      type = 'info'
    } = options;

    setToasts(prev => [...prev, {
      id: Date.now(),
      message,
      position,
      duration,
      type
    }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          position={toast.position}
          duration={toast.duration}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}