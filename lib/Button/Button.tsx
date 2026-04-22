import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="button"
      className="malbec-font-sans ui:inline-flex ui:items-center ui:justify-center ui:rounded-md ui:bg-primary ui:px-4 ui:py-2 ui:text-label-semibold ui:text-primary-foreground ui:transition-opacity hover:ui:opacity-90 focus-visible:ui:outline focus-visible:ui:outline-2 focus-visible:ui:outline-offset-2 focus-visible:ui:outline-primary"
    >
      {children}
    </button>
  );
};
