'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = ToasterToast & {
  type: 'ADD_TOAST' | 'UPDATE_TOAST' | 'DISMISS_TOAST' | 'REMOVE_TOAST';
};

const reducer = (state: ToasterToast[], action: ActionType) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          description: action.description,
          action: action.action,
          variant: action.variant,
          duration: action.duration || 5000,
        },
      ].slice(-TOAST_LIMIT);

    case 'UPDATE_TOAST':
      return state.map((t) => (t.id === action.id ? { ...t, ...action } : t));

    case 'DISMISS_TOAST': {
      const toastIndex = state.findIndex((t) => t.id === action.id);
      if (toastIndex === -1) return state;

      return state.filter((_, i) => i !== toastIndex);
    }

    case 'REMOVE_TOAST':
      if (action.id === undefined) return [];
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
};

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'destructive' | 'success';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-md transition-all',
        {
          'border-gray-200 bg-white text-gray-900': variant === 'default',
          'border-red-500 bg-red-50 text-red-700': variant === 'destructive',
          'border-green-500 bg-green-50 text-green-700': variant === 'success',
        },
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = 'Toast';

const ToastTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('font-medium', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const ToastContext = React.createContext<{
  toasts: ToasterToast[];
  addToast: (toast: Omit<ToasterToast, 'id'>) => string;
  updateToast: (toast: ToasterToast) => void;
  dismissToast: (toastId: string) => void;
  removeToast: (toastId: string) => void;
}>({
  toasts: [],
  addToast: () => '',
  updateToast: () => {},
  dismissToast: () => {},
  removeToast: () => {},
});

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return {
    toast: context.addToast,
    dismiss: context.dismissToast,
    update: context.updateToast,
    toasts: context.toasts,
  };
};

export function ToastInProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = React.useReducer(reducer, []);

  const addToast = React.useCallback(
    (toast: Omit<ToasterToast, 'id'>) => {
      const id = genId();

      dispatch({
        type: 'ADD_TOAST',
        id,
        ...toast,
      });

      return id;
    },
    [dispatch]
  );

  const updateToast = React.useCallback(
    (toast: ToasterToast) => {
      dispatch({
        type: 'UPDATE_TOAST',
        ...toast,
      });
    },
    [dispatch]
  );

  const dismissToast = React.useCallback(
    (toastId: string) => {
      dispatch({
        type: 'DISMISS_TOAST',
        id: toastId,
      });
    },
    [dispatch]
  );

  const removeToast = React.useCallback(
    (toastId: string) => {
      dispatch({
        type: 'REMOVE_TOAST',
        id: toastId,
      });
    },
    [dispatch]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        updateToast,
        dismissToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function Toaster() {
  const { toasts } = useToast();

  return createPortal(
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant }) => (
        <Toast key={id} variant={variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>,
    document.body
  );
} 