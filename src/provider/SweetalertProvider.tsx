"use client";

import Swal, { SweetAlertIcon } from "sweetalert2";
import React, { createContext, useContext } from "react";

type ConfirmOptions = {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

type SweetAlertContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  success: (text: string) => void;
  error: (text: string) => void;
};

const SweetAlertContext = createContext<SweetAlertContextType | null>(null);

export const SweetAlertProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const confirm = async (options: ConfirmOptions) => {
    const result = await Swal.fire({
      title: options.title || "Are you sure?",
      text: options.text || "",
      icon: options.icon || "warning",
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || "Yes",
      cancelButtonText: options.cancelButtonText || "Cancel",
      confirmButtonColor: "#d33",
    });

    return result.isConfirmed;
  };

  const success = (text: string) => {
    Swal.fire({
      icon: "success",
      title: text,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const error = (text: string) => {
    Swal.fire({
      icon: "error",
      title: text,
    });
  };

  return (
    <SweetAlertContext.Provider value={{ confirm, success, error }}>
      {children}
    </SweetAlertContext.Provider>
  );
};

export const useSweetAlert = () => {
  const context = useContext(SweetAlertContext);
  if (!context) {
    throw new Error("useSweetAlert must be used inside SweetAlertProvider");
  }
  return context;
};