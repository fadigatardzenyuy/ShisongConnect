import React from "react";
import { ToastProvider, ToastViewport, Toast } from "./toast";
import { useToast } from "./use-toast";

export default function ToastProviderWrapper({ children }) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
} 