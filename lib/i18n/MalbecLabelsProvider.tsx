"use client";

import * as React from "react";
import { LABELS_BY_LOCALE, labelsEn, type MalbecLabels, type MalbecLocale } from "./labels";

const MalbecLabelsContext = React.createContext<MalbecLabels>(labelsEn);

export interface MalbecLabelsProviderProps {
  /** Built-in catalog. Without a provider, components use `en`. @default "en" */
  locale?: MalbecLocale;
  /** Overrides on top of the locale's catalog, one label at a time. */
  labels?: Partial<MalbecLabels>;
  children: React.ReactNode;
}

/** Sets the language of every text malbec-ui renders on its own (aria-labels, placeholders). */
export function MalbecLabelsProvider({ locale = "en", labels, children }: MalbecLabelsProviderProps) {
  const value = React.useMemo(
    () => ({ ...LABELS_BY_LOCALE[locale], ...labels }),
    [locale, labels],
  );
  return <MalbecLabelsContext.Provider value={value}>{children}</MalbecLabelsContext.Provider>;
}

/** The labels of the nearest `MalbecLabelsProvider`, or English without one. */
// eslint-disable-next-line react-refresh/only-export-components -- public hook paired with its provider
export function useMalbecLabels(): MalbecLabels {
  return React.useContext(MalbecLabelsContext);
}
