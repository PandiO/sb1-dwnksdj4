import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastPosition = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left';
export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  position?: ToastPosition;
  duration?: number;
  type?: ToastType;
  onClose: () => void;
}

const positionClasses: Record<ToastPosition, string> = {
  'top': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
};

const typeConfig: Record<ToastType, { icon: React.ReactNode; bgColor: string; textColor: string }> = {
  success: {
    icon: <CheckCircle className="h-5 w-5" />,
    bgColor: 'bg-green-50',
    textColor: 'text-green-800'
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    bgColor: 'bg-red-50',
    textColor: 'text-red-800'
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800'
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800'
  }
};

export function Toast({
  message,
  position = 'top',
  duration = 3000,
  type = 'info',
  onClose
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
    }, duration - 300);

    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const { icon, bgColor, textColor } = typeConfig[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed ${positionClasses[position]} z-50 transform transition-all duration-300 ease-in-out ${
        isLeaving ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className={`flex items-center p-4 rounded-lg shadow-lg ${bgColor} min-w-[320px] max-w-md`}>
        <div className={`flex-shrink-0 ${textColor}`}>
          {icon}
        </div>
        <div className={`ml-3 ${textColor} flex-1 text-sm font-medium pr-8`}>
          {message}
        </div>
        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(onClose, 300);
          }}
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-offset-2 ${textColor} p-1.5 inline-flex h-8 w-8 hover:bg-opacity-25 hover:bg-black focus:outline-none`}
        >
          <span className="sr-only">Dismiss</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}