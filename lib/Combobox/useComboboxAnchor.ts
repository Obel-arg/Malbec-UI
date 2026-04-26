"use client";

import * as React from "react";

/** Optional external anchor ref for advanced layouts (see shadcn multi-select example). */
export function useComboboxAnchor<
  T extends HTMLElement = HTMLDivElement,
>(): React.RefObject<T | null> {
  return React.useRef<T | null>(null);
}
